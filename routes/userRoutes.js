const express = require('express');
const {
  getMe,
  updateMe,
  deleteMe,
  getUser,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  uploadUserPhoto,
  resizeUserPhoto
} = require('./../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  restrictTo,
  resetPassword,
  updatePassword,
  logout,
  protect
} = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout)
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Routes to be protected
router.use(protect);
router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe , getUser);
router.patch('/updateMe',  uploadUserPhoto,resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));

router.get('/', getAllUsers)
router.post('/', createUser);
router.get('/:id', getUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser);

module.exports = router;
