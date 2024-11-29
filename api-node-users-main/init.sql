CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name VARCHAR(100),
    password VARCHAR(100),
    profile VARCHAR(100)
);
