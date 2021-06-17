const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                error: 'Email is already registered!',
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
            error: 'Email is already registered!',
        });
    }
};

/*exports.signup =  (req, res) => {
        const { name, email, password } = req.body;
console.log(`req.body - `, req.body)
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is already register!'
            });
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '24h' });

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account Activation Link`,
            html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        };

        sgMail
            .send(emailData)
            .then(sent => {
                // console.log('SIGNUP EMAIL SENT', sent)
                return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                });
            })
            .catch(err => {
                // console.log('SIGNUP EMAIL SENT ERROR', err)
                return res.json({
                    message: err.message
                });
            });
    });

}*/