var express = require('express');
var router = express.Router();

const Message = require('../models/message');
const Contact = require('../models/contact');
const SequenceGenerator = require('./sequenceGenerator');

router.get('/', (req, res, next) => {
  Message.find()
    .populate('sender')
    .then((messages) => {
      res.status(200).json({
        message: 'Messages fetched successfully',
        messages: messages,
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
  const maxMessageId = sequenceGenerator.nextId('messages');

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });

  message
    .save()
    .then((createdMessage) => {
      return Message.findById(createdMessage._id).populate('sender');
    })
    .then((result) => {
      res.status(201).json({
        message: 'Message added successfully',
        messageObj: result,
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
  Message.findOne({ id: req.params.id })
    .then((message) => {
      if (!message) {
        return res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found' },
        });
      }

      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      return message.save();
    })
    .then((updatedMessage) => {
      return Message.findById(updatedMessage._id).populate('sender');
    })
    .then((result) => {
      res.status(204).json({
        message: 'Message updated successfully',
        messageObj: result,
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
  Message.findOne({ id: req.params.id })
    .then((message) => {
      if (!message) {
        return res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found' },
        });
      }

      Message.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: 'Message deleted successfully',
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: 'An error occurred',
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Message not found.',
        error: { message: 'Message not found' },
      });
    });
});

module.exports = router;
