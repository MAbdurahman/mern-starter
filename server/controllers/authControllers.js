exports.signup = (req, res) => {
    console.log('req.body on signup endpoint - ', req.body);
    res.json({
        data: 'This is signup endpoint from authControllers.js'
    });
};