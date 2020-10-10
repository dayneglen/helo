module.exports = {
    getAllPosts: async (req, res) => {
        const { search, userPosts } = req.query,
            { id } = req.params;
        const db = req.app.get('db');
        console.log(userPosts)
        const posts = await db.posts.get_posts();
        if (search === '' && userPosts) {
            console.log('1st hit')
            return res.status(200).send(posts);
        } else if (!search && !userPosts) {
            const otherUsersPosts = posts.filter(post => {
                console.log('2 hit')
                return post.user_id !== id
            })
            res.status(200).send(otherUsersPosts);
        } else if (search && userPosts) {
            console.log('3 hit')
            const searchedPosts = posts.filter(post => post.title.includes(search));
            res.status(200).send(searchedPosts);
        } else if (search && !userPosts) {     
            console.log('4st hit')
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
        const id = +req.params.id,
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