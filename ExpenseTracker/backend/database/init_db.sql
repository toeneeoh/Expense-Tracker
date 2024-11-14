-- Create the users table if it does not already exist
CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(255) PRIMARY KEY,
    job VARCHAR(255)
);

-- Test user
INSERT INTO users (username, job)
VALUES ('test', 'developer')
ON CONFLICT (username) DO NOTHING;