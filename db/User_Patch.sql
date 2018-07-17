UPDATE helo_users
SET   first_name = $1,
      last_name = $2,
      gender = $3,
      hair_color = $4,
      eye_color = $5,
      hobby = $6,
      birthday = $7,
      birthday_month = $8,
      birth_year = $9
WHERE id = $10
returning *;