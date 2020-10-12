module.exports = {
    getAllPosts: async (req, res) => {
        const { search, userPosts } = req.query,
            id = req.session.userid;
        const db = req.app.get('db');
        const posts = await db.posts.get_posts();
        if (search === '' && userPosts === 'true') {
            return res.status(200).send(posts);
        } else if (!search && userPosts === 'false') {
            const otherUsersPosts = posts.filter(post =>  post.user_id !== id);
            res.status(200).send(otherUsersPosts);
        } else if (search && userPosts ==='true') {
            const searchedPosts = posts.filter(post => post.title.includes(search));
            res.status(200).send(searchedPosts);
        } else if (search && userPosts === 'false') {     
            const searchedPosts = posts.filter(post => post.title.includes(search) && post.user_id !== id);
            res.status(200).send(searchedPosts);
        }
    },
    getPost: async (req, res) => {
        const id = +req.params.id;
        const db = req.app.get('db');
        const post = await db.posts.get_post(id);
        res.status(200).send(post[0]);
    },
    addPost: (req, res) => {
        const id = req.session.userid,
              { title, img, content } = req.body,
              db = req.app.get('db');
        
        db.posts.add_post({title, img, content, id}).then(() => {
            res.sendStatus(200);
        }).catch(err => console.log(err));
    },
    deletePost: (req, res) => {
        const id  = +req.params.id,
            db = req.app.get('db');
        
        db.posts.delete_post([id]).then(() => {
            res.sendStatus(200);
        }).catch(err => console.log(err));
    }
}