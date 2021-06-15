const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const connectDatabase = require('./config/database.js');

//**************** variables ****************//
const app = express();
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV;

//**************** configuration setup ****************//
dotenv.config();

//**************** connect to database ****************//
connectDatabase();

//**************** middleware****************//
if (process.env.NODE_ENV === 'DEVELOPMENT') {
	app.use(morgan('dev'));
	app.use(cors({ origin: `http://localhost:3000`}))
}

app.use(express.json());

//**************** routes****************//
app.use('/api', authRoutes);


//**************** app listening ****************//
const server = app.listen(PORT, () => {
	console.log(
		`The server is listening at - http://127.0.0.1:${PORT} in ${NODE_ENV} mode`.yellow
	);
});