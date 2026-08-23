"""Small database layer supporting SQLite locally and PostgreSQL in production."""

import os
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from flask import current_app, g

SQLITE_SCHEMA = """
CREATE TABLE IF NOT EXISTS demo_sessions (
  id TEXT PRIMARY KEY, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
  savings_goal NUMERIC NOT NULL DEFAULT 5000, current_savings NUMERIC NOT NULL DEFAULT 2850
);
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY, session_id TEXT NOT NULL REFERENCES demo_sessions(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK(type IN ('income', 'expense')), category TEXT NOT NULL,
  description TEXT NOT NULL, amount NUMERIC NOT NULL CHECK(amount > 0), occurred_on TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS transactions_session_idx ON transactions(session_id);
"""
POSTGRES_SCHEMA = SQLITE_SCHEMA.replace("TEXT PRIMARY KEY", "VARCHAR(64) PRIMARY KEY").replace("occurred_on TEXT", "occurred_on VARCHAR(32)")


def is_postgres():
    return current_app.config["DATABASE_URL"].startswith(("postgres://", "postgresql://"))


def get_db():
    if "db" in g:
        return g.db
    url = current_app.config["DATABASE_URL"]
    if is_postgres():
        import psycopg
        from psycopg.rows import dict_row
        g.db = psycopg.connect(url, row_factory=dict_row)
    else:
        path = url.removeprefix("sqlite:///")
        if path != ":memory:":
            path = os.path.abspath(path)
        g.db = sqlite3.connect(path)
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA foreign_keys = ON")
    return g.db


def close_db(_error=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


@contextmanager
def cursor():
    db, cur = get_db(), get_db().cursor()
    try:
        yield cur
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        cur.close()


def _query(query):
    return query.replace("?", "%s") if is_postgres() else query


def execute(query, params=()):
    with cursor() as cur:
        cur.execute(_query(query), params)
        return cur.rowcount


def fetchone(query, params=()):
    with cursor() as cur:
        cur.execute(_query(query), params)
        row = cur.fetchone()
        return dict(row) if row else None


def fetchall(query, params=()):
    with cursor() as cur:
        cur.execute(_query(query), params)
        return [dict(row) for row in cur.fetchall()]


def init_database():
    db = get_db()
    if is_postgres():
        with cursor() as cur:
            cur.execute(POSTGRES_SCHEMA)
    else:
        db.executescript(SQLITE_SCHEMA)
        db.commit()
    current_app.teardown_appcontext(close_db)


def utc_now():
    return datetime.now(timezone.utc).isoformat()
