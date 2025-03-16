const express = require("express");
const { register, login } = require("../controllers/authController");

// const router = express.Router();
// router.post('/register', authController.register);
// router.post('/login', authController.login);
// router.get('/user/:id', authController.getUserById);
// router.get('/users', authController.listUsers); // Combined listing endpoint
// router.put('/user/:id', authController.updateUser);
// router.delete('/user/:id', authController.deleteUser);

const authController = require('../controllers/authController');
const { authenticateUser, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authenticateUser, authorizeRoles(['Admin']), authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticateUser, authController.logout);

router.get('/user/:id', authenticateUser, authController.getUserById);
router.get('/users', authenticateUser, authorizeRoles(['Admin']), authController.listUsers);

router.put('/user/:id', authenticateUser, authorizeRoles(['Admin', 'Developer']), authController.updateUser);
router.delete('/user/:id', authenticateUser, authorizeRoles(['Admin']), authController.deleteUser);
module.exports = router;
