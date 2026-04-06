const express = require('express');
const router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

router.get('/', (req, res, next) => {
  Contact.find()
    .populate('group')
    .then((contacts) => {
      res.status(200).json({
        message: 'Contacts fetched successfully!',
        contacts: contacts,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred',
        error: error,
      });
    });
});

router.post('/', (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId('contacts');

  const group = req.body.group ? req.body.group.map((contact) => contact._id) : [];

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: group,
  });

  contact
    .save()
    .then((createdContact) => {
      return Contact.findById(createdContact._id).populate('group');
    })
    .then((result) => {
      res.status(201).json({
        message: 'Contact added successfully',
        contact: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred',
        error: error,
      });
    });
});

router.put('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      if (!contact) {
        return res.status(500).json({
          message: 'Contact not found.',
          error: { contact: 'Contact not found' },
        });
      }

      const group = req.body.group ? req.body.group.map((contact) => contact._id) : [];

      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = group;

      return contact.save();
    })
    .then((updatedContact) => {
      return Contact.findById(updatedContact._id).populate('group');
    })
    .then((result) => {
      res.status(204).json({
        message: 'Contact updated successfully',
        contact: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred',
        error: error,
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      if (!contact) {
        return res.status(500).json({
          message: 'Contact not found.',
          error: { contact: 'Contact not found' },
        });
      }

      return Contact.deleteOne({ id: req.params.id });
    })
    .then(() => {
      res.status(204).json({
        message: 'Contact deleted successfully',
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred',
        error: error,
      });
    });
});

module.exports = router;
