const router = require('express').Router();
const {
  updateUserById,
  deleteUserById,
  getUserById,
  getUser,
} = require('../controllers/users');
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require('../middlewares/verifyToken');

router.param('userId', getUserById);

// update user
router.put(
  '/:userId',
  verifyToken,
  verifyTokenAndAuthorization,
  updateUserById
);

// delete user
router.delete(
  '/:userId',
  verifyToken,
  verifyTokenAndAuthorization,
  deleteUserById
);

// get user
router.get('/:userId', getUser);

module.exports = router;
