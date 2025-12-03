import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';

// User Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and password are required.' 
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long.' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists.' 
      });
    }

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      passwordHash: password, // Will be hashed by pre-save middleware
      phoneNumber,
      role: 'user'
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user data and token
    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber
        }
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating account. Please try again.' 
    });
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required.' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password.' 
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password.' 
      });
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user data and token
    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber,
          favorites: user.favorites
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error logging in. Please try again.' 
    });
  }
};

// Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    // User is already attached to req by authMiddleware
    res.status(200).json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user data.' 
    });
  }
};

// Toggle Favorite Product
export const toggleFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product ID is required.' 
      });
    }

    const user = await User.findById(userId);
    
    const favoriteIndex = user.favorites.indexOf(productId);
    
    if (favoriteIndex > -1) {
      // Remove from favorites
      user.favorites.splice(favoriteIndex, 1);
    } else {
      // Add to favorites
      user.favorites.push(productId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: favoriteIndex > -1 ? 'Removed from favorites' : 'Added to favorites',
      data: {
        favorites: user.favorites
      }
    });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating favorites.' 
    });
  }
};

// Get User Favorites
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId).populate('favorites');

    res.status(200).json({
      success: true,
      data: {
        favorites: user.favorites || []
      }
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching favorites.' 
    });
  }
};
