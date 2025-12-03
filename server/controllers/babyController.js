import Baby from '../models/Baby.js';

// Create or Update Baby Profile
export const createOrUpdateBabyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { babyName, dateOfBirth, gender, weight, height, skinType, allergyNote } = req.body;

    // Validate required fields
    if (!babyName || !dateOfBirth || !gender) {
      return res.status(400).json({ 
        success: false, 
        message: 'Baby name, date of birth, and gender are required.' 
      });
    }

    // Check if baby profile already exists for this user
    let baby = await Baby.findOne({ userId });

    if (baby) {
      // Update existing profile
      baby.babyName = babyName;
      baby.dateOfBirth = dateOfBirth;
      baby.gender = gender;
      baby.weight = weight;
      baby.height = height;
      baby.skinType = skinType || 'normal';
      baby.allergyNote = allergyNote;
      baby.updatedAt = new Date();
    } else {
      // Create new profile
      baby = new Baby({
        userId,
        babyName,
        dateOfBirth,
        gender,
        weight,
        height,
        skinType: skinType || 'normal',
        allergyNote
      });
    }

    await baby.save();

    res.status(200).json({
      success: true,
      message: 'Baby profile saved successfully!',
      data: {
        baby: baby.toJSON()
      }
    });
  } catch (error) {
    console.error('Create/Update baby profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving baby profile.' 
    });
  }
};

// Get Baby Profile for Current User
export const getBabyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const baby = await Baby.findOne({ userId });

    if (!baby) {
      return res.status(404).json({
        success: false,
        message: 'No baby profile found. Please create one.'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        baby: baby.toJSON()
      }
    });
  } catch (error) {
    console.error('Get baby profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching baby profile.' 
    });
  }
};
