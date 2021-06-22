const User = require('../models/userModel.js');
/*const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');*/

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
    console.log(`SENDGRID_API_KEY is  ${process.env.SENDGRID_API_KEY}`);
        const { name, email, password } = req.body;
console.log(`req.body - `, req.body)
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is already register!'
            });
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '24h' });
        console.log(`The token - ${token}`)
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
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account.`
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

/*exports.signup = (req, res) => {

const { name, email, password } = req.body;

console.log(`req.body - `, req.body)


User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is already registered!'
            });
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '24h' });

    let transporter = nodemailer.createTransport({ // you need create this variable. It contains the SMPT informations from your email server. I'm using my gmail account so I put the gmail ones.
    host: 'smtp.gmail.com', // host, in my case the gmail host.
    port: 465, // The port. Gmail has two ports, 587 and 465, I'm tried use the 587 one but I receive an error so I'm using the 465 one.
    secure: true, // Gmail require TSL/SSL security, that the reason I put true. If your email server does not require, leaves it as false.
    auth: {
        user: process.env.EMAIL_TO,
        pass: process.env.EMAIL_TO_PASSWORD // I've created this env variable at the .env file.
    } 
})

const emailData = {
    from: `Application <${process.env.EMAIL_FROM}>`, // You must put a name (the name will appear as the contact name) and (inside the '<>' <LIKE THIS>) the email from.
    to: email,
    subject: 'Email Confirmation',
    html: `
        <h1>Confirm your email</h1>
        <p>Please confirm your email adrress by clicking on the link below</p>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        <hr />
        <small>This email may contain sensitive information</p>
        <br/>
        <small>${process.env.CLIENT_URL}</small> `
}


// sending the email.
transporter.sendMail(emailData)
.then(message => {
    console.log('SIGNUP EMAIL SENT:', message);

    return res.json({
        message: `Email has been sent to ${email}. Follow the instruction to activate your account.`
    });
})
.catch(err => {
    console.log(`ERROR SENDING EMAIL: ${err}`);

    return res.json({
        message: err.message
    });
})

});

}    */   

    
 
 

