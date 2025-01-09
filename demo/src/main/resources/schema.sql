CREATE TABLE email_messages (
    id INT PRIMARY KEY,
    user_id INT,
    email NVARCHAR(255),
    status NVARCHAR(50),
    date_to_be_sent DATETIME,
    locked_at DATETIME
);
