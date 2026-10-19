const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'maxfiy_kalit';

function verifyToken(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(401).json({ message: 'Token topilmadi' });
  }
  const token = header.startsWith('Bearer ') ? header.slice(7) : header;
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token noto'g'ri yoki muddati o'tgan" });
  }
}

module.exports = { verifyToken, SECRET };