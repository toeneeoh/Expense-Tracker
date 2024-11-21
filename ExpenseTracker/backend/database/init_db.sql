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
    investments NUMERIC(12, 2), -- 12 digits, 2 decimals
    weekly_hours INTEGER,
    roommates_num INTEGER,
    dependents_num INTEGER,
    bedrooms_needed INTEGER
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

CREATE TABLE IF NOT EXISTS monthly_total_incomes (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE,
    data_month VARCHAR(255),
    income_amount NUMERIC(10, 2)
);

CREATE TABLE IF NOT EXISTS monthly_total_expenses (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) REFERENCES users(username) ON DELETE CASCADE,
    data_month VARCHAR(255),
    expense_amount NUMERIC(10, 2)
);

-- Test user
INSERT INTO users (username, user_email, job_title, savings, password)
VALUES ('test', 'johndoe@gmail.com', 'developer', '74.34','1234')
ON CONFLICT (username) DO NOTHING;

-- Insert test expenses
INSERT INTO expenses (username, expense_name, expense_frequency, expense_amount)
VALUES 
    ('test', 'Dining', 'Monthly', 100.00),
    ('test', 'Rent', 'Monthly', 100.00),
    ('test', 'Utilities', 'Monthly', 100.00),
    ('test', 'Subscriptions', 'Monthly', 100.00),
    ('test', 'Entertainment', 'Monthly', 100.00);

-- Insert test incomes
INSERT INTO incomes (username, income_name, income_frequency, income_amount)
VALUES 
    ('test', 'Job', 'Monthly', 100.00),
    ('test', 'Other', 'Monthly', 100.00);

-- Insert test debts
INSERT INTO debts (username, debt_name, debt_frequency, debt_amount)
VALUES 
    ('test', 'Credit Card A', 'Monthly', 150.23),
    ('test', 'Credit Card B', 'Monthly', 45.82),
    ('test', 'Student Loans', 'Monthly', 15412.36);

-- Insert test monthly incomes
INSERT INTO monthly_total_incomes (username, data_month, income_amount)
VALUES 
    ('test', 'Aug2024', 1500.19),
    ('test', 'Sep2024', 1324.19),
    ('test', 'Oct2024', 1631.19);

    -- Insert test monthly expenses
INSERT INTO monthly_total_expenses (username, data_month, expense_amount)
VALUES 
    ('test', 'Aug2024', 1600.43),
    ('test', 'Sep2024', 1284.37),
    ('test', 'Oct2024', 1592.74);