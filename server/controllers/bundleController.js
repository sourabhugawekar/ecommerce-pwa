import Bundle from '../models/Bundle.js';

// Get All Active Bundles (Public)
export const getAllBundles = async (req, res) => {
  try {
    const bundles = await Bundle.find({ isActive: true })
      .populate('productIds')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        bundles
      }
    });
  } catch (error) {
    console.error('Get bundles error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching bundles.' 
    });
  }
};

// Get Bundle by ID (Public)
export const getBundleById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const bundle = await Bundle.findById(id).populate('productIds');

    if (!bundle) {
      return res.status(404).json({
        success: false,
        message: 'Bundle not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        bundle
      }
    });
  } catch (error) {
    console.error('Get bundle error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching bundle.' 
    });
  }
};

// Get Bundles by Age Range (Public)
export const getBundlesByAge = async (req, res) => {
  try {
    const { ageRange } = req.params;
    
    const bundles = await Bundle.find({ 
      isActive: true, 
      $or: [{ ageRange }, { ageRange: 'all' }] 
    }).populate('productIds');

    res.status(200).json({
      success: true,
      data: {
        bundles
      }
    });
  } catch (error) {
    console.error('Get bundles by age error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching bundles.' 
    });
  }
};
