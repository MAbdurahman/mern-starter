const mongoose = require('mongoose');
const colors = require('colors');

const connectDatabase = () => {
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then(con => {
			console.log(
				`MongoDB connected to ${con.connection.host} with mongoose`.italic.blue
			);
		});
};

module.exports = connectDatabase;