const express = require('express');
const { findById } = require('../model/Home');
const Home = require('../model/Home');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const homeDB = await Home.find();
        res.send(homeDB);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const home = await Home.findById(req.params.id);
        if (!Home) {
            return res.status(404).send('car not found');
        }
        res.send(car);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post('/', auth,
    [
        check('description', 'description is required').not().isEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const newHome = new Home({
                title: req.body.title,
                description: req.body.description
            });
            const result = await newHome.save();
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    });

router.delete('/', auth, async (req, res) => {
    try {
        const home = await Home.findById(req.params.id);
        if (!home) {
            return res.status(404).json({ msg: 'home not found' });
        }
        const result = await Home.findByIdAndDelete({ _id: req.body.id });
        res.send(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/',
    auth,
    [
        check('title,', 'title is required').not().isEmpty(),
        check('description', 'description is required').not().isEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const home = await Home.findById(req.body.id);
            if (!home) {
                return res.status(404).json({ msg: 'home not found' });
            }

            home.title = req.body.title,
            home.description = req.body.description
            await home.save();
            res.send(home);
        } catch (err) {
            res.status(500).send('Server error');
        }
    });

module.exports = router;
