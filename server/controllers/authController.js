const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { username, password, profilePicture } = req.body,
            db = req.app.get('db');

        const foundUser = await db.users.check_user({ username });
        if (foundUser[0]) {
            return res.status(400).send('Username already in use');
        }

        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);

        const newUser = await db.users.register_user({ username, hash, profilePicture });
        req.session.userid = newUser[0].user_id;
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: async (req, res) => {
        const { username, password } = req.body,
            db = req.app.get('db');

        const foundUser = await db.users.check_user({ username });
        if (!foundUser[0]) {
            return res.status(400).send('Username not found. Please register to continue')
        }

        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if (!authenticated) {
            return res.status(401).send('Password is incorrect');
        }

        delete foundUser[0].password;
        req.session.userid = foundUser[0].user_id;
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    findUser: async (req, res) => {
        const db = req.app.get('db');

        const foundUser = await db.users.find_me([req.session.userid]);
        res.status(200).send(foundUser[0])
    }
}