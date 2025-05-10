const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');
const userController = require('../controllers/userController');
const {userValidationRules} = require('../middleware/validators/userValidators');



/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User object
 *       404:
 *         description: User not found
 */
router.get('/:id', userController.getUserById)


router.post('/', userValidationRules, (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    userController.createUser(req, res, next);
});



router.put('/:id', userValidationRules, (req, res, next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array()});
   userController.updateUser(req, res, next);
});


router.delete('/:id', userController.deleteUser);

module.exports = router;