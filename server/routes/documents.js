var express = require('express');
var router = express.Router();

const Document = require('../models/document');
const SequenceGenerator = require('./sequenceGenerator');

// GET all documents
router.get('/', (req, res, next) => {
  Document.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Documents fetched successfully',
        documents: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error failed',
        error: error,
      });
    });
});

// POST add document
router.post('/', (req, res, next) => {
  const maxDocumentId = SequenceGenerator.nextId('documents');

  const document = new Document({
    id: maxDocumentId.toString(),
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    children: req.body.children,
  });

  document
    .save()
    .then((createdDocument) => {
      res.status(201).json({
        message: 'Document added successfully',
        document: createdDocument,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Creating document failed',
        error: error,
      });
    });
});

// PUT update document
router.put('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then((document) => {
      if (!document) {
        return res.status(404).json({
          message: 'Document not found',
        });
      }

      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;
      document.children = req.body.children;

      return document.save();
    })
    .then((updatedDocument) => {
      res.status(200).json({
        message: 'Document updated successfully',
        document: updatedDocument,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Updating document failed',
        error: error,
      });
    });
});

// DELETE document
router.delete('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then((document) => {
      if (!document) {
        return res.status(500).json({
          message: 'Document not found.',
          error: { document: 'Document not found' },
        });
      }

      Document.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: 'Document deleted successfully',
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
        message: 'Document not found.',
        error: { document: 'Document not found' },
      });
    });
});

module.exports = router;
