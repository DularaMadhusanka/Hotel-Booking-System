import User from "../models/User.js";

// GET /api/user - Get current user data
export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchedCities = req.user.recentSearchedCities;
    res.json({ success: true, role, recentSearchedCities });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/user/all - Get all users (admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/user/:id - Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// PUT /api/user/:id - Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, image, role } = req.body;
    
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, image, role },
      { new: true }
    );
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    res.json({ success: true, user, message: "User updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE /api/user/:id - Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// POST /api/user/store-recent-search - Store recent searched cities
export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchedCity } = req.body;
    const user = req.user;

    if (user.recentSearchedCities.length < 3) {
      user.recentSearchedCities.push(recentSearchedCity);
    } else {
      user.recentSearchedCities.shift();
      user.recentSearchedCities.push(recentSearchedCity);
    }
    
    await user.save();
    res.json({ success: true, message: "City added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};