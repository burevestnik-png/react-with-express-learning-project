const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Minimal length is 6 symbols').isLength({min: 6})
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: "Invalid signing up data"
                })
            }

            const {email, password} = request.body;

            const possibleUser = await User.findOne({email});
            if (possibleUser) {
                return response.status(400).json({
                    message: "Such user already exists. Please sign in."
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                password: hashedPassword
            })

            await user.save();

            response.status(201).json({message: "User signed up"})
        } catch (e) {
            response.status(500).json({
                message: "Something went wrong. Please, retry later"
            })
        }
    });

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: "Invalid signing in data"
                })
            }

            const {email, password} = request.body;

            const user = await User.findOne({email })
            if (!user) {
                return response.status(401).json({message: "User wasn't been found"})
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return response.status(400).json({message: "Invalid password. Repeat it again, please"})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            );

            response.json({token, userId: user.id})
        } catch (e) {
            response.status(500).json({
                message: "Something went wrong. Please, retry later"
            })
        }
    });

module.exports = router;