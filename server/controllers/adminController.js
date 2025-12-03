import Product from '../models/Product.js';
import Bundle from '../models/Bundle.js';
import Tip from '../models/Tip.js';
import User from '../models/User.js';
import Order from '../models/Order.js';

// Get Dashboard Overview Stats
export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalOrders, totalBundles, totalTips] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Product.countDocuments(),
      Order.countDocuments(),
      Bundle.countDocuments({ isActive: true }),
      Tip.countDocuments({ isActive: true })
    ]);

    // Calculate total revenue (demo)
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalBundles,
          totalTips,
          totalRevenue
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching dashboard stats.' 
    });
  }
};

// ===== PRODUCT MANAGEMENT =====

export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        products
      }
    });
  } catch (error) {
    console.error('Get products admin error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching products.' 
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: {
        product
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating product.' 
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: {
        product
      }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating product.' 
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting product.' 
    });
  }
};

// ===== BUNDLE MANAGEMENT =====

export const getAllBundlesAdmin = async (req, res) => {
  try {
    const bundles = await Bundle.find()
      .populate('productIds')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        bundles
      }
    });
  } catch (error) {
    console.error('Get bundles admin error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching bundles.' 
    });
  }
};

export const createBundle = async (req, res) => {
  try {
    const bundleData = req.body;

    const bundle = new Bundle(bundleData);
    await bundle.save();

    res.status(201).json({
      success: true,
      message: 'Bundle created successfully!',
      data: {
        bundle
      }
    });
  } catch (error) {
    console.error('Create bundle error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating bundle.' 
    });
  }
};

export const updateBundle = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const bundle = await Bundle.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    ).populate('productIds');

    if (!bundle) {
      return res.status(404).json({
        success: false,
        message: 'Bundle not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bundle updated successfully!',
      data: {
        bundle
      }
    });
  } catch (error) {
    console.error('Update bundle error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating bundle.' 
    });
  }
};

export const deleteBundle = async (req, res) => {
  try {
    const { id } = req.params;

    const bundle = await Bundle.findByIdAndDelete(id);

    if (!bundle) {
      return res.status(404).json({
        success: false,
        message: 'Bundle not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bundle deleted successfully!'
    });
  } catch (error) {
    console.error('Delete bundle error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting bundle.' 
    });
  }
};

// ===== TIP MANAGEMENT =====

export const getAllTipsAdmin = async (req, res) => {
  try {
    const tips = await Tip.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        tips
      }
    });
  } catch (error) {
    console.error('Get tips admin error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching tips.' 
    });
  }
};

export const createTip = async (req, res) => {
  try {
    const tipData = req.body;

    const tip = new Tip(tipData);
    await tip.save();

    res.status(201).json({
      success: true,
      message: 'Tip created successfully!',
      data: {
        tip
      }
    });
  } catch (error) {
    console.error('Create tip error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating tip.' 
    });
  }
};

export const updateTip = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const tip = await Tip.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    );

    if (!tip) {
      return res.status(404).json({
        success: false,
        message: 'Tip not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tip updated successfully!',
      data: {
        tip
      }
    });
  } catch (error) {
    console.error('Update tip error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating tip.' 
    });
  }
};

export const deleteTip = async (req, res) => {
  try {
    const { id } = req.params;

    const tip = await Tip.findByIdAndDelete(id);

    if (!tip) {
      return res.status(404).json({
        success: false,
        message: 'Tip not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tip deleted successfully!'
    });
  } catch (error) {
    console.error('Delete tip error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting tip.' 
    });
  }
};

// ===== USER MANAGEMENT =====

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-passwordHash')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        users
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching users.' 
    });
  }
};

// ===== ORDER MANAGEMENT =====

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('items.productId')
      .sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      data: {
        orders
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching orders.' 
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status.'
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully!',
      data: {
        order
      }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating order status.' 
    });
  }
};
