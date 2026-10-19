const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');

// Oddiy xotirada saqlash (server o'chsa ma'lumot yo'qoladi)
const users = [];

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username va parol kiritilishi shart' });
  }
  if (password.length < 4) {
    return res.status(400).json({ message: "Parol kamida 4 ta belgi bo'lishi kerak" });
  }
  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ message: 'Bu username band' });
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, username, password: hashed });

  res.status(201).json({ message: "Ro'yxatdan muvaffaqiyatli o'tdingiz" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username va parol kiritilishi shart' });
  }

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Login yoki parol noto'g'ri" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ message: "Login yoki parol noto'g'ri" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: '1d',
  });

  res.json({ token, username: user.username });
};