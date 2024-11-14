import os
import psycopg2
from time import sleep
from psycopg2 import sql

def connect_db(retries=5, delay=5):
    while retries > 0:
        try:
            conn = psycopg2.connect(database="expense_tracker",
                                    host="localhost",
                                    user="test",
                                    password="123",
                                    port="5432")
            conn.autocommit = True
            return conn
        except psycopg2.OperationalError as e:
            print(f"Database connection failed, retrying in {delay} seconds...")
            sleep(delay)
            retries -= 1
    raise Exception("Failed to connect to the database after several attempts.")

def create_new_database():
    with connect_db() as conn:
        with conn.cursor() as cursor:
            cursor.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier("expense_tracker")))

def init_db():
    create_new_database()

    """Initialize the database with schema from init_db.sql."""
    # Get the absolute path to init_db.sql in the script's directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    init_db_path = os.path.join(script_dir, "init_db.sql")
    
    # Read and execute the SQL script
    with open(init_db_path, "r") as f:
        init_script = f.read()
    with connect_db() as conn:
        with conn.cursor() as cur:
            cur.execute(init_script)
            print("Database initialized successfully.")

def get_job_title(user):
    sql = """
    SELECT job 
    FROM users
    WHERE user = %s
    """
    with connect_db() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (user,))
            xp = cur.fetchone()
            return xp[0] if xp else None

def update_job_title(user, job):
    sql = """
    INSERT INTO users (user, job) 
    VALUES (%s, %s) 
    ON CONFLICT (user) 
    DO UPDATE SET job = EXCLUDED.job
    """
    with connect_db() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (user, job))
            conn.commit()
