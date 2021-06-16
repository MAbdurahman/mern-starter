const User = require('../models/userModel.js');

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                error: 'Email is already register!',
            });
        }

        let newUser = new User({ name, email, password });

        await newUser.save((err, success) => {
            if (err) {
                console.log('Sign-up error', err);
                return res.status(400).json({
                    error: err,
                });
            }

            res.json({
                message: 'Sign-up success! Please sign-in!',
            });
        });

    } catch (error) {
        return res.status(400).json({
            error: 'Email is already register!',
        });
    }
};
