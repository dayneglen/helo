INSERT INTO users (
    username,
    password,
    profile_pic
) VALUES (
    ${username},
    ${hash},
    ${profilePicture}
)
RETURNING user_id, username, profile_pic;