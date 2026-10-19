const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

// Sinov uchun endpoint
app.get('/api/teams', (req, res) => {
  res.json([{ id: 1, name: "Jamoa 1" }]);
});

app.listen(PORT, () => {
  console.log(`Server ishga tushdi: http://127.0.0.1:${PORT}`);
});