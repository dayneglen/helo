module.exports = {
    getAllPosts: async (req, res) => {
        const { search, userPosts } = req.body,
              { id } = req.params;
        const db = req.app.get('db');
        const posts = await db.posts.get_posts();

        if (!search && userPosts) {
            return res.status(200).send(posts);
        } else if (!search && !userPosts) {
            const otherUsersPosts = posts.filter(post => post.user_id !== id)
            res.status(200).send(otherUsersPosts);
        } else if (search && userPosts) {
            const searchedPosts = posts.fiter(post => post.title.includes(search));
            res.status(200).send(searchedPosts);
        } else if (search && !userPosts) {
            const searchedPosts = posts.filter(post => post.title.includes(search) && post.user_id !== id);
            res.status(200).send(searchedPosts);
        }
        
    }
}