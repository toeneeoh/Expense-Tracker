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
                cur.execute("DROP TABLE IF EXISTS users;")
                print("Table 'users' dropped successfully.")
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

def get_user_data(username) -> dict:
    conn = connect_db()
    if conn is None:
        print("Failed to connect to the database.")
        return None

    try:
        with conn.cursor() as cur:
            # Prepare and execute a query to select all columns for a specific user
            query = sql.SQL("SELECT * FROM users WHERE username = %s;")
            cur.execute(query, (username,))

            user_data = cur.fetchone()
            colnames = [desc[0] for desc in cur.description]

            if user_data:
                # Return a dictionary with column names as keys and user data as values
                return dict(zip(colnames, user_data))
            else:
                print("No user found with the specified username.")
                return None
    except Exception as e:
        print(f"Error retrieving user data: {e}")
        return None
    finally:
        conn.close()

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

def push_item(item, value, username="test"):
    """Inserts or updates a specified column (item) in the users table for the given user."""
    with connect_db() as conn:
        with conn.cursor() as cur:
            query = sql.SQL("""
                INSERT INTO users (username, {field}) 
                VALUES (%s, %s)
                ON CONFLICT (username) 
                DO UPDATE SET {field} = EXCLUDED.{field}
            """).format(field=sql.Identifier(item))
            
            # Execute the query with the username and value for the specified field
            cur.execute(query, (username, value))
            return f"Inserted/Updated {item} for user {username}"
