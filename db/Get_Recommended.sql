SELECT * FROM (
    SELECT * FROM friendship 
    RIGHT JOIN helo_users ON 
    friendship.friedn_id = helo_users.friedn_id
    WHERE id != $1 AND friend_id IS NULL 
) as deliveredTable