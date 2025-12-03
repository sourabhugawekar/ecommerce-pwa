import Tip from '../models/Tip.js';

// Get All Active Tips (Public)
export const getAllTips = async (req, res) => {
  try {
    const { ageRange, category } = req.query;
    
    const filter = { isActive: true };
    
    if (ageRange) {
      filter.$or = [{ ageRange }, { ageRange: 'all' }];
    }
    
    if (category) {
      filter.category = category;
    }

    const tips = await Tip.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        tips
      }
    });
  } catch (error) {
    console.error('Get tips error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching tips.' 
    });
  }
};

// Get Random Tip (Public)
export const getRandomTip = async (req, res) => {
  try {
    const { ageRange } = req.query;
    
    const filter = { isActive: true };
    
    if (ageRange) {
      filter.$or = [{ ageRange }, { ageRange: 'all' }];
    }

    const tips = await Tip.find(filter);
    
    if (tips.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No tips found.'
      });
    }

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    res.status(200).json({
      success: true,
      data: {
        tip: randomTip
      }
    });
  } catch (error) {
    console.error('Get random tip error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching tip.' 
    });
  }
};
