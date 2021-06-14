const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');


//**************** variables ****************//
const app = express();
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV;

//**************** configuration setup ****************//
dotenv.config();

//**************** middleware****************//
if (process.env.NODE_ENV === 'DEVELOPMENT') {
	app.use(morgan('dev'));
}
app.use(express.json());

//**************** routes****************//
app.get('/', (req, res) => {
	res.json ( {
		data: 'API is at Home!!'
	})
	// res.send('API is at Home');
});


//**************** app listening ****************//
const server = app.listen(PORT, () => {
	console.log(
		`The server is listening at - http://127.0.0.1:${PORT} in ${NODE_ENV} mode`.yellow
	);
});