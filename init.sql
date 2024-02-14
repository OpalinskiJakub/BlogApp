CREATE TABLE IF NOT EXISTS users (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     username VARCHAR(255) UNIQUE,
    hashed_password BLOB,
    salt BLOB
    ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;