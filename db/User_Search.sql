SELECT * FROM (
    SELECT * FROM friendship
    RIGHT JOIN helo_users ON 
    friendship.friend_id = helo_users.id
    WHERE id != $1
) AS derivedTable