const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Get all users with rankings
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    
    // Update rankings
    const usersWithRanks = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }));

    // Update ranks in database
    for (let i = 0; i < usersWithRanks.length; i++) {
      await User.findByIdAndUpdate(usersWithRanks[i]._id, { rank: i + 1 });
    }

    res.json(usersWithRanks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new user
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'User name is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ name: name.trim() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name: name.trim() });
    const savedUser = await user.save();
    
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Claim points for a user
router.post('/:id/claim', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate random points between 1 and 10
    const pointsClaimed = Math.floor(Math.random() * 10) + 1;
    
    // Update user's total points
    user.totalPoints += pointsClaimed;
    await user.save();

    // Create claim history record
    const claimHistory = new ClaimHistory({
      userId: user._id,
      userName: user.name,
      pointsClaimed,
      totalPointsAfterClaim: user.totalPoints
    });
    await claimHistory.save();

    res.json({
      user,
      pointsClaimed,
      claimHistory
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get claim history
router.get('/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .sort({ claimedAt: -1 })
      .limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;