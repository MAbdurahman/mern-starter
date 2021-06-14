const mongoose = require('mongoose');

const connectDatabase = () => {
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then(con => {
			console.log(
				`MongoDB connected to host with mongoose at ${con.connection.host}`
			);
		});
};

module.exports = connectDatabase;