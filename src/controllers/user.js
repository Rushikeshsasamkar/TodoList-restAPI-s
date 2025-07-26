// controllers/user.js
import User from '../models/user.js';

export const registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const jwt = await user.authUser();
        await user.save();

        res.status(200).send({
            message: 'User registered successfully',
            token: jwt
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.authUser();

        res.status(200).send({
            user: {
                id: user._id,
                username: user.username
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message });
    }
};
