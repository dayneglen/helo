SELECT p.title, u.username, u.profile_pic, p.content, p.img, u.user_id, p.post_id FROM posts p
JOIN users u ON p.user_id = u.user_id;