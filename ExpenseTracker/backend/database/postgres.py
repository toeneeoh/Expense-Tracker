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

def drop_users_table():
    conn = connect_db()
    if conn is not None:
        try:
            with conn.cursor() as cur:
                cur.execute("DROP TABLE IF EXISTS users CASCADE;")
                cur.execute("DROP TABLE IF EXISTS expenses CASCADE;")
                cur.execute("DROP TABLE IF EXISTS incomes CASCADE;")
                cur.execute("DROP TABLE IF EXISTS debts CASCADE;")
                cur.execute("DROP TABLE IF EXISTS monthly_total_incomes CASCADE;")
                cur.execute("DROP TABLE IF EXISTS monthly_total_expenses CASCADE;")
                print("All tables dropped successfully.")
        except Exception as e:
            print(f"Error dropping table: {e}")
        finally:
            conn.close()
    else:
        print("Connection to the database failed.")

def init_db():
    drop_users_table()

    """Initialize the database with schema from init_db.sql."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    init_db_path = os.path.join(script_dir, "init_db.sql")
    
    with open(init_db_path, "r") as f:
        init_script = f.read()
    with connect_db() as conn:
        with conn.cursor() as cur:
            cur.execute(init_script)
            print("Database initialized successfully.")

def get_item(item, username="test", table="users"):
    """Fetches a specified column (item) from the specified table for the given user."""
    with connect_db() as conn:
        with conn.cursor() as cur:
            query = sql.SQL("SELECT {field} FROM {table} WHERE username = %s").format(
                field=sql.Identifier(item),
                table=sql.Identifier(table)
            )

            # Execute query
            cur.execute(query, (username,))
            result = cur.fetchone()
            return result[0] if result else None
    """Fetches specified column(s) or all columns (if item is 'all') from the specified table for the given user."""
    with connect_db() as conn:
        with conn.cursor() as cur:
            if item.lower() == "all":
                # Query to fetch all columns
                query = sql.SQL("SELECT * FROM {table} WHERE username = %s").format(
                    table=sql.Identifier(table)
                )
                cur.execute(query, (username,))
                result = cur.fetchall()  # Fetch all rows
                colnames = [desc[0] for desc in cur.description]  # Get column names
                return dict(zip(colnames, result)) if result else None
            else:
                # Query to fetch a specific column
                query = sql.SQL("SELECT {field} FROM {table} WHERE username = %s").format(
                    field=sql.Identifier(item),
                    table=sql.Identifier(table)
                )
                cur.execute(query, (username,))
                result = cur.fetchone()
                return result[0] if result else None

def get_item(item="all", username="test", table="users"):
    """
    Fetches specified column(s) or all columns (if item is 'all') from the specified table for the given user.
    """
    with connect_db() as conn:
        with conn.cursor() as cur:
            if item.lower() == "all":
                # Query to fetch all columns
                query = sql.SQL("SELECT * FROM {table} WHERE username = %s").format(
                    table=sql.Identifier(table)
                )
                cur.execute(query, (username,))
                result = cur.fetchall()  # Fetch all rows
                colnames = [desc[0] for desc in cur.description]  # Get column names
                return [dict(zip(colnames, row)) for row in result] if result else None
            else:
                # Query to fetch a specific column
                query = sql.SQL("SELECT {field} FROM {table} WHERE username = %s").format(
                    field=sql.Identifier(item),
                    table=sql.Identifier(table)
                )
                cur.execute(query, (username,))
                result = cur.fetchone()  # Fetch one row for a specific column
                return result[0] if result else None


def get_item(item="all", username="test", table="users"):
    """Fetches specified column(s) or all columns (if item is 'all') from the specified table for the given user."""
    with connect_db() as conn:
        with conn.cursor() as cur:
            if item.lower() == "all":
                # Query to fetch all columns
                query = sql.SQL("SELECT * FROM {table} WHERE username = %s").format(
                    table=sql.Identifier(table)
                )
                cur.execute(query, (username,))
                result = cur.fetchone()
                colnames = [desc[0] for desc in cur.description]  # Get column names
                return dict(zip(colnames, result)) if result else None
            else:
                # Query to fetch a specific column
                query = sql.SQL("SELECT {field} FROM {table} WHERE username = %s").format(
                    field=sql.Identifier(item),
                    table=sql.Identifier(table)
                )
                cur.execute(query, (username,))
                result = cur.fetchone()
                return result[0] if result else None


def push_item(item, value, username="test", table="users"):
    """Inserts or updates a specified column (item) in the specified table for the given user."""
    with connect_db() as conn:
        with conn.cursor() as cur:
            query = sql.SQL("""
                INSERT INTO {table} (username, {field}) 
                VALUES (%s, %s)
                ON CONFLICT (username) 
                DO UPDATE SET {field} = EXCLUDED.{field}
            """).format(
                field=sql.Identifier(item),
                table=sql.Identifier(table)
            )
            
            # Execute query
            cur.execute(query, (username, value))
            return f"Inserted/Updated {item} in table {table} for user {username}"

def insert_row(data: dict, table: str):
    """Inserts a new row into the specified table."""
    with connect_db() as conn:
        with conn.cursor() as cur:
            # Dynamically construct the query
            columns = sql.SQL(', ').join(map(sql.Identifier, data.keys()))
            placeholders = sql.SQL(', ').join(sql.Placeholder() * len(data))
            query = sql.SQL("""
                INSERT INTO {table} ({columns})
                VALUES ({values})
                RETURNING id
            """).format(
                table=sql.Identifier(table),
                columns=columns,
                values=placeholders
            )

            # Execute the query with the provided data
            cur.execute(query, tuple(data.values()))
            new_id = cur.fetchone()[0]  # Fetch the newly inserted row's ID
            return f"Inserted new row into {table} with ID: {new_id}"
