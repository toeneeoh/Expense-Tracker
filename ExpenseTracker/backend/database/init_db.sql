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
    savings_increase NUMERIC(12, 2), -- amount savings increased by last month only
    investments NUMERIC(12, 2), -- 12 digits, 2 decimals
    weekly_hours INTEGER,
    hourly_wage INTEGER,
    roommates_num INTEGER,
    dependents_num INTEGER,
    bedrooms_needed INTEGER,
    expense_other NUMERIC(12, 2),
    expense_groceries NUMERIC(12, 2),
    expense_takeout NUMERIC(12, 2),
    expense_dining NUMERIC(12, 2),
    expense_rent NUMERIC(12, 2),
    expense_subscriptions NUMERIC(12, 2),
    expense_entertainment NUMERIC(12, 2),
    income_job NUMERIC(12, 2),
    income_other NUMERIC(12, 2),
    rec1_title VARCHAR(100),
    rec2_title VARCHAR(100),
    rec3_title VARCHAR(100),
    rec1_desc VARCHAR(255),
    rec2_desc VARCHAR(255),
    rec3_desc VARCHAR(255),
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

-- Test users
INSERT INTO users (username, user_email, job_title, password, address, city_name, state_name, user_goal, savings, savings_increase, investments, weekly_hours, hourly_wage, roommates_num, dependents_num, bedrooms_needed, expense_other, expense_groceries, expense_takeout, expense_dining, expense_rent, expense_subscriptions, expense_entertainment, income_job, income_other)
VALUES ('test', 'johndoe@gmail.com', 'developer', '1234', '123 Somewhere Street', 'Fairfax', 'VA', 'debt', '74.34', '21.38', '0.00', '27', '13.50', '1', '0', '0', '68.12', '113.78', '378.76', '43.12', '1600.00', '89.46', '212.43', '1900.00', '200.00')
VALUES ('John Doe', 'johndoe@gmail.com', 'developer', '1234', '123 Somewhere Street', 'Fairfax', 'VA', 'debt', '74.34', '21.38', '0.00', '27', '13.50', '1', '0', '0', '68.12', '113.78', '378.76', '43.12', '1600.00', '89.46', '212.43', '1900.00', '200.00')
VALUES ('Jane Doe', 'janedoe@gmail.com', 'Lawyer', '1234', '456 Elsewhere Street', 'Arlington', 'VA', 'retirement', '9819.48', '918.46', '760.14', '40', '50.00', '0', '1', '2', '113.84', '378.15', '148.76', '245.12', '2900.00', '18.98', '512.43', '8000.00', '900.00')
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