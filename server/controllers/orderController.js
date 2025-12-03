import Order from '../models/Order.js';

// Create Order (Demo Checkout)
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    // Validate required fields
    if (!items || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Order must contain at least one item.' 
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid order total.' 
      });
    }

    // Create order
    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'demo-cod',
      status: 'pending'
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Demo order placed successfully!',
      data: {
        order
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating order.' 
    });
  }
};

// Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const orders = await Order.find({ userId })
      .sort({ orderDate: -1 })
      .populate('items.productId');

    res.status(200).json({
      success: true,
      data: {
        orders
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching orders.' 
    });
  }
};

// Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    const order = await Order.findOne({ _id: id, userId }).populate('items.productId');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        order
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching order.' 
    });
  }
};
