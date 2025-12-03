import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'babybliss-demo-secret-key-change-in-production';

// Middleware to verify JWT token
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided. Authorization required.' 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Fetch user from database
      const user = await User.findById(decoded.userId).select('-passwordHash');
      
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'User not found. Invalid token.' 
        });
      }
      
      // Attach user to request object
      req.user = user;
      next();
    } catch (jwtError) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired token.' 
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Authentication error.' 
    });
  }
};

// Middleware to check if user is admin
export const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required.' 
    });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin privileges required.' 
    });
  }
  
  next();
};

// Helper function to generate JWT
export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
};
