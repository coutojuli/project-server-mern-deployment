const express = require('express');
const { findById } = require('../model/Checkout');
const Checkout = require('../model/Checkout');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');



router.get('/', auth, async (req, res) => {
    try {
        const checkoutDB = await Checkout.find();
        res.send(checkoutDB);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).send('checkout not found');
        }
        res.send(checkout);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post('/',
    auth,
    [        
        check('userName', 'userName is required').not().isEmpty(),
        check('cvc', 'cvc must be 3 characters').isLength({
            min: 3,
            max: 3
        }),
    ],
    async (req, res) => {
        try {
            console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const newCheckout = new Checkout({
                userName: req.body.userName,
                amount: req.body.amount,
                cc_no: req.body.cc_no,
                cvc: req.body.cvc,
                exp_date: req.body.exp_date
            });
            const result = await newCheckout.save();
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    });

router.delete('/', auth, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ msg: 'checkout not found' });
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
        check('userName', 'userName is required').not().isEmpty(),
        check('cvc', 'cvc must be 3 characters').isLength({
            min: 3,
            max: 3
        }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const checkout = await Checkout.findById(req.body.id);
            if (!checkout) {
                return res.status(404).json({ msg: 'checkout not found' });
            }

            checkout.userName = req.body.userName,
            checkout.amount =  req.body.amount,
            checkout.cc_no = req.body.cc_no,
            checkout.cvc = req.body.cvc,
            checkout.exp_date = req.body.exp_date
            await checkout.save();
            res.send(checkout);
        } catch (err) {
            res.status(500).send('Server error');
        }
    });

module.exports = router;
