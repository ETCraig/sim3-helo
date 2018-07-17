INSERT INTO helo_users
(auth_id, profile_picture, first_name, last_name)
VALUES 
($1, $2, $3, $4)
returning * ;