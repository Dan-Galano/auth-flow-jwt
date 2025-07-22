import User from "../models/user.model.mjs";

export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    if (!user) {
      return res.status(500).json({ message: "Failed to create user." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  res.status(200).json(req.body);
};

export const logout = async (req, res) => {
  res.status(200).json({ message: "Log out!" });
};
