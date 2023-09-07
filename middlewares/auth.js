const jwt = require('jsonwebtoken');
const User = require('../models/users');


const auth = async (req, res, next) => {
    console.log(req.header);console.log(req.body);
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        // dasfasgasgsagfasg
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({
            _id: decoded.id,
        })

        if (!user) {
            throw new Error('Unable to login , invalid credentials');
        }

        req.user = user;
        req.token = token;
        next();

    }
    catch (error) { 
        res.status(401).send({ error: error.message});
    }
}

module.exports = auth;