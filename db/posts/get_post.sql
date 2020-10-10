SELECT p.title, p.img, p.content, u.username, u.profile_pic FROM posts p
JOIN users u ON p.user_id = u.user_id
WHERE post_id = $1;