const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

exports.updateUserById = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({
      status: true,
      message: 'Updated successfully',
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    try {
      const deleted = await Post.deleteMany({ userId: req.user._id });

      await User.findByIdAndDelete(req.user._id);
      res.status(200).json({
        status: true,
        message: 'Deleted user',
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.getUserById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    req.profile = user;
    next();
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.getUser = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};
