CREATE TABLE IF NOT EXISTS friends(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    profile_picture TEXT,
    gender VARCHAR(20),
    hair_color VARCHAR(20),
    eye_color VARCHAR(20),
    hobby VARCHAR(20),
    birthday VARCHAR(20),
    birthday_month VARCHAR(20),
    birth_year VARCHAR(20)  
);

INSERT INTO helo_users(
    auth_id,
    first_name,
    last_name,
    profile_picture,
    gender,
    hair_color,
    eye_color,
    hobby,
    birthday,
    birthday_month,
    birth_year
)

CREATE TABLE IF NOT EXISTS friendship(
table_id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES helo_users(id),
friend_id INTEGER REFERENCES helo_users(id)
);

SELECT * FROM friendship
RIGHT JOIN helo_users
ON friendship.friend_id = helo_users.id
WHERE id != $1