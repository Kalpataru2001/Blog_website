const router = require('express').Router();
const {
  getPostById,
  getAllPosts,
  createPost,
  updatePostById,
  deletePostById,
  getPost,
  updatePostViews,
} = require('../controllers/posts');
const { getUserById } = require('../controllers/users');
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require('../middlewares/verifyToken');

router.param('postId', getPostById);
router.param('userId', getUserById);

// get all post
router.get('/', getAllPosts);

// get a post
router.get('/:postId', getPost);

// create post
router.post('/:userId', verifyToken, createPost);

// update post
router.put(
  '/:postId/:userId',
  verifyToken,
  verifyTokenAndAuthorization,
  updatePostById
);

// increment views count
router.put('/views-increment/:postId/:userId', verifyToken, updatePostViews);

// delete post
router.delete(
  '/:postId/:userId',
  verifyToken,
  verifyTokenAndAuthorization,
  deletePostById
);

module.exports = router;
