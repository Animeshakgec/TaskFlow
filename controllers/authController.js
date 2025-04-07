const { sequelize } = require('../models');
const authService = require('../services/authService');

//exports.register = async (req, res) => {
//   const transaction = await sequelize.transaction();
//   try {
//     const user = await authService.register(req.body, { transaction });
//     await transaction.commit();
//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     await transaction.rollback();
//     res.status(400).json({ error: error.message });
//   }
// };

exports.signup = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await authService.register(req.body, { transaction });

    // Generate tokens immediately after registration
    const accessToken = authService.generateAccessToken(user);
    const refreshToken = authService.generateRefreshToken(user);

    await transaction.commit();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: 'Signup successful',
      user,
      accessToken,
    });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await authService.login(email, password, { transaction });

    await transaction.commit();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ accessToken, user });
  } catch (error) {
    await transaction.rollback();
    res.status(401).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.jwt;
    const newAccessToken = await authService.refreshToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await authService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const { role, teamId } = req.query;
    const users = await authService.listUsers({ role, teamId });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await authService.updateUser(req.params.id, req.body, { transaction });
    await transaction.commit();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const result = await authService.deleteUser(req.params.id, { transaction });
    await transaction.commit();
    res.json(result);
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};
