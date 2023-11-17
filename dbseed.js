CREATE TABLE users (
    id SERIAL UNIQUE NOT NULL,
    username TEXT,
    password TEXT,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    income TEXT,
    savings TEXT
)

CREATE TABLE credit_cards (
    id SERIAL UNIQUE NOT NULL,
    card_number TEXT,
    cvv TEXT,
    card_type TEXT,
    exp_month TEXT,
    exp_year TEXT,
    card_holder TEXT,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE transactions (
    id SERIAL UNIQUE NOT NULL,
    title TEXT,
    amount TEXT,
    month TEXT,
    day TEXT,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    card_id INT REFERENCES credit_cards(id) ON DELETE CASCADE,
    year TEXT,
    transaction_type TEXT
)