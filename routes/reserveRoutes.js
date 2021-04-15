const express = require('express');

const { check, validationResult } = require('express-validator');

 const auth = require('../middleware/auth');

let Reserve = require('../model/Reserve');
const router = express.Router();

router.get('/', 
 auth, 
async (req, res) => {
    try {
        const reserves = await Reserve.find();
        res.send(reserves);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/:id',
 auth, 
async (req, res) => {
    try {
        const reserve = await Reserve.findById(req.params.id);
        if (!reserve) {
        return res.status(404).send('Reserve not found');
        }
        res.send(Reserve);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});


router.post(
    '/',
     auth,
    [
        check('date', 'Date is required').not().isEmpty(),
    check('stime', 'Start time is required').not().isEmpty(),
    check('etime', 'End time is required').not().isEmpty(),
    check('tableno', 'Table Number is required').not().isEmpty(),
    ],
    async (req, res) => {   
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        const newReserve = new Reserve({
        //   user: req.user.id,
          date: req.body.date,
          stime: req.body.stime,
          etime: req.body.etime,
          tableno: req.body.tableno,
          message: req.body.message,
        });
  
        const result = await newReserve.save();
  
        res.send(result);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  );


router.delete('/', 
 auth, 
async (req, res) => {
    try {
        const reserve = await Reserve.findById(req.body.id);
        if (!reserve) {
            return res.status(404).json({ msg: 'Reserve not found' });
        }

        const result = await reserve.findByIdAndDelete(req.body.id);
        res.send(result);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/', 
 auth, 
    [
    check('date', 'Date is required').not().isEmpty(),
    check('stime', 'Start time is required').not().isEmpty(),
    check('etime', 'End time is required').not().isEmpty(),
    check('tableno', 'Table Number is required').not().isEmpty(),
  ], async (req, res) => {
    try {
        const reserve = await Reserve.findById(req.body.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }
        if (!reserve) {
        return res.status(404).json({ msg: 'Reserve not found' });
        }
        
        reserve.firstname = req.body.firstname;
        reserve.lastname = req.body.lastname;
        reserve.email = req.body.email;
        reserve.phone = req.body.phone;
        reserve.message = req.body.message;
        await reserve.save();

        res.send(reserve);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err);
    }
});

module.exports = router;