-- Create the users table if it does not already exist
CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255), -- Password for login stored as hash
    user_email VARCHAR(255),
    address VARCHAR(255),
    job_title VARCHAR(255),
    city_name VARCHAR(100),
    state_name VARCHAR(100),
    user_goal VARCHAR(50), -- User's financial goal ("debt", "savings", or "retirement")
    savings NUMERIC(12, 2), -- 12 digits, 2 decimals
    weekly_hours INTEGER
);

CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE,
    expense_name VARCHAR(255),
    expense_frequency VARCHAR(255),
    expense_amount NUMERIC(10, 2)
);

CREATE TABLE IF NOT EXISTS incomes (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE,
    income_name VARCHAR(255),
    income_frequency VARCHAR(255),
    income_amount NUMERIC(10, 2)
);

CREATE TABLE IF NOT EXISTS debts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE,
    debt_name VARCHAR(255),
    debt_frequency VARCHAR(255),
    debt_amount NUMERIC(10, 2)
);

-- Test user
INSERT INTO users (username, user_email, job_title, password)
VALUES ('test', 'johndoe@gmail.com', 'developer', '1234')
ON CONFLICT (username) DO NOTHING;
