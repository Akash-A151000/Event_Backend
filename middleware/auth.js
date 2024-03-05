const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    let token = await req.header('Authorization');
    if (!token) return res.status(403).json({ message: 'Access Denied' });

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = verifyToken;
