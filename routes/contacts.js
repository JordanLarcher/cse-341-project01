const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');
const contactController = require('../controllers/contactController');
const {contactValidationRules} = require('../middleware/validators/contactValidators');



/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', contactController.getAllContacts);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact object
 *       404:
 *         description: Contact not found
 */
router.get('/:id', contactController.getContactById)


router.post('/', contactValidationRules, (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    contactController.createContact(req, res, next);
});



router.put('/:id', contactValidationRules, (req, res, next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array()});
    contactController.updateContact(req, res, next);
});


router.delete('/:id', contactController.deleteContact);

module.exports = router;