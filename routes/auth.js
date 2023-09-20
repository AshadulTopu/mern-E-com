const router = require('express').Router();
const authRoute = require('../controllers/auth');


router.get('/register', authRoute.register);
router.post('/register', authRoute.register);







module.exports = router