const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const teamRoutes = require('./routes/teams');
const gameRoutes = require('./routes/games');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API ishlayapti' });
});

app.use('/api', authRoutes);          // /api/register, /api/login
app.use('/api/teams', teamRoutes);    // /api/teams
app.use('/api/games', gameRoutes);    // /api/games

app.use((req, res) => {
  res.status(404).json({ message: 'Topilmadi' });
});

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} manzilda ishlayapti`);
});