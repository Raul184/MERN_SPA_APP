const express = require('express');
const {
  getMe,
  updateMe,
  deleteMe,
  getUser,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser
} = require('./../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  restrictTo,
  resetPassword,
  updatePassword,
  isLoggedIn,
  logout
} = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout)
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Routes to be protected

router.patch('/updateMyPassword',isLoggedIn, updatePassword);
router.get('/me', isLoggedIn,getMe);
router.patch('/updateMe', isLoggedIn,updateMe);
router.delete('/deleteMe', isLoggedIn,deleteMe);

router.use(restrictTo('admin'));

router.get('/', getAllUsers)
router.post('/', createUser);
router.get('/:id', getUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser);

module.exports = router;
