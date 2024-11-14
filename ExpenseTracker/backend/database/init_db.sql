-- Create the users table if it does not already exist
CREATE TABLE IF NOT EXISTS users (
    user VARCHAR(255) PRIMARY KEY,
    job VARCHAR(255)
);
