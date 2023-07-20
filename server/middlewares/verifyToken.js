const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    console.log(token);

    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'No token found!',
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: 'Token not valid!',
        });
      }

      console.log('Inside token:' + user._id);

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'You are not authenticated!',
    });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  console.log('Loggedin:' + req.user._id);
  console.log('Requested:' + req.profile._id);
  verifyToken(req, res, () => {
    if (req.profile._id.toString() === req.user._id.toString()) {
      next();
    } else {
      return res.status(403).json({
        status: false,
        error: 'Unauthorized, Access Denied!',
      });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
};
