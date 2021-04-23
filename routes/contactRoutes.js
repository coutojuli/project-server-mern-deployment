const express = require('express');

const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

let Contact = require('../model/Contact');
const router = express.Router();

router.get('/', 
 auth, 
async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.send(contacts);
    } catch (err) {
        res.status(500).send('Server error');
    }
});


router.get('/:id',
 auth, 
async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
        return res.status(404).send('Contact not found');
        }
        res.send(Contact);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});

router.post(
    '/',
     auth,
    [
      check('firstname', 'First Name is required').not().isEmpty(),
      check('lastname', 'Last Name is required').not().isEmpty(),
      check('email', 'Email Id is not valid').isEmail(),
      check('phone', 'Phone Number should be Numeric').isNumeric(),
      check('message', 'Message should be longer than 2 characters').isLength({
        min: 2,
      }),
    ],
    async (req, res) => {   
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        const newContact = new Contact({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          phone: req.body.phone,
          message: req.body.message,
        });
  
        const result = await newContact.save();
  
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
        const contact = await Contact.findById(req.body.id);
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        const result = await Contact.findByIdAndDelete(req.body.id);
        res.send(result);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/', 
 auth, 
    [
    check('firstname', 'First Name is required').not().isEmpty(),
    check('lastname', 'Last Name is required').not().isEmpty(),
    check('email', 'Email Id is not valid').isEmail(),
    check('phone', 'Phone Number should be Numeric').isNumeric(),
    check('message', 'Message should be longer than 2 characters').isLength({
      min: 2,
    }),
  ], async (req, res) => {
    try {
        const contact = await Contact.findById(req.body.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }
        if (!contact) {
        return res.status(404).json({ msg: 'Contact not found' });
        }
        
        contact.firstname = req.body.firstname;
        contact.lastname = req.body.lastname;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.message = req.body.message;
        await contact.save();

        res.send(contact);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err);
    }
});

module.exports = router;