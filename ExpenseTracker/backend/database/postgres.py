import os
import psycopg2
from psycopg2 import sql
from time import sleep

def connect_db(retries=5, delay=2):
    while retries > 0:
        try:
            conn = psycopg2.connect(database="ExpenseTracker",
                                    user="postgres",
                                    password="postgres",
                                    host="localhost",
                                    port="5432")
            conn.autocommit = True
            return conn
        except psycopg2.OperationalError as e:
            print(f"Database connection failed, retrying in {delay} seconds...")
            print(f"Error: {e}")
            sleep(delay)
            retries -= 1
    raise Exception("Failed to connect to the database after several attempts.")

def init_db():
    """Initialize the database with schema from init_db.sql."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    init_db_path = os.path.join(script_dir, "init_db.sql")
    
    with open(init_db_path, "r") as f:
        init_script = f.read()
    with connect_db() as conn:
        with conn.cursor() as cur:
            cur.execute(init_script)
            print("Database initialized successfully.")

def get_item(item, username="test"):
    """Fetches a specified column (item) from the users table for the given user."""
    with connect_db() as conn:
        with conn.cursor() as cur:
            query = sql.SQL("SELECT {field} FROM users WHERE username = %s").format(
                field=sql.Identifier(item)
            )
            cur.execute(query, (username,))
            result = cur.fetchone()
            return result[0] if result else None
