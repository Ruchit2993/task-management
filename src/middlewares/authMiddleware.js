import jwt from 'jsonwebtoken';
import messages from '../config/messages.js';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader); // Debug log
  console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debug log

  if (!authHeader) {
    return res.status(401).json({ message: messages.ERROR.NO_TOKEN });
  }

  const token = authHeader.split(' ')[1]; // Expect Bearer token
  if (!token) {
    return res.status(401).json({ message: messages.ERROR.TOKEN_FORMAT });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Debug log
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin }; // Attach user data
    next();
  } catch (error) {
    console.log('Token Verification Error:', error.message); // Debug log
    return res.status(401).json({ message: messages.ERROR.INVALID_TOKEN });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: messages.ERROR.ADMIN_REQUIRED });
  }
  next();
};

export { verifyToken, isAdmin };