const teamController = require('./teamController');

let games = [];
let nextId = 1;

exports.getAll = (req, res) => {
  res.json(games);
};

exports.getOne = (req, res) => {
  const game = games.find((g) => g.id === Number(req.params.id));
  if (!game) return res.status(404).json({ message: "O'yin topilmadi" });
  res.json(game);
};

exports.create = (req, res) => {
  const { homeTeamId, awayTeamId, date, score } = req.body;

  if (!homeTeamId || !awayTeamId || !date) {
    return res
      .status(400)
      .json({ message: 'homeTeamId, awayTeamId va date kiritilishi shart' });
  }
  if (homeTeamId === awayTeamId) {
    return res.status(400).json({ message: "Jamoalar har xil bo'lishi kerak" });
  }
  if (!teamController.exists(homeTeamId) || !teamController.exists(awayTeamId)) {
    return res.status(404).json({ message: 'Jamoalardan biri topilmadi' });
  }

  const game = {
    id: nextId++,
    homeTeamId,
    awayTeamId,
    date,
    score: score || '0-0',
  };
  games.push(game);
  res.status(201).json(game);
};

exports.update = (req, res) => {
  const game = games.find((g) => g.id === Number(req.params.id));
  if (!game) return res.status(404).json({ message: "O'yin topilmadi" });

  const { date, score } = req.body;
  if (date !== undefined) game.date = date;
  if (score !== undefined) game.score = score;
  res.json(game);
};

exports.remove = (req, res) => {
  const index = games.findIndex((g) => g.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "O'yin topilmadi" });

  games.splice(index, 1);
  res.json({ message: "O'yin o'chirildi" });
};