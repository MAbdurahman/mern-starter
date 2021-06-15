const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema( 
	{
		name: {
			type: String,
			trim: true,
			match: [/^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/i, 'First and last name is required!'],
			required: 'Enter first and last name!'
		},
		phone: {
			type: String,
			trim: true,
			match: [ /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{4}$/i, 'Preferred phone pattern is:  123-456-7890!'],
			required: 'Phone number is required!'
		},
		email: {
			type: String,
			trim: true, 
			match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Enter a valid email address!'],
			unique: true,
			required: 'Email address is required!'
		},
		hashed_password: {
			type: String,
			trim: true,
			required: 'Password is required!'
		},
		salt: String,
        role: {
            type: String,
            default: 'subscriber'
        },
        resetPasswordLink: {
            data: String,
            default: ''
        }
    },
    { timestamps: true }
);


userSchema
    .virtual('password')
    .set(function(password) {
        // create a temporarity variable called _password
        this._password = password;
        // generate salt
        this.salt = this.makeSalt();
        // encryptPassword
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });
 
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
 
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
 
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};
 
module.exports = mongoose.model('User', userSchema);