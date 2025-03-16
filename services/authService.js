const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Team, sequelize } = require('../models');

class AuthService {
  // Register user
  async register(userData) {
    const { email, password, role } = userData;

    if (!['Admin', 'Developer', 'Viewer'].includes(role)) {
      throw new Error('Invalid role');
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...userData, password: hashedPassword });

    return user;
  }

//   // Login user
//   async login(email, password) {
//     const user = await User.findOne({ where: { email } });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       throw new Error('Invalid credentials');
//     }

//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     return { token, user };
//   }
async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { accessToken, refreshToken, user };
  }

  generateAccessToken(user) {
    return jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
  }

  generateRefreshToken(user) {
    return jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw new Error('Refresh token not provided');
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        throw new Error('Invalid refresh token');
      }

      const newAccessToken = this.generateAccessToken(user);
      return newAccessToken;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // Get user by ID
  async getUserById(userId) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    return user;
  }

  // List users (by role, team, or all)
  async listUsers({ role, teamId }) {
    const whereCondition = {};
    if (role) whereCondition.role = role;
    if (teamId) whereCondition.teamId = teamId;

    return await User.findAll({ where: whereCondition });
  }

  // Update user
  async updateUser(userId, updateData) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    await user.update(updateData);
    return user;
  }

  // Delete user
  async deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    await user.destroy();
    return { message: 'User deleted successfully' };
  }
}

module.exports = new AuthService();
