let teams = [];
let nextId = 1;

exports.getAll = (req, res) => {
  res.json(teams);
};

exports.getOne = (req, res) => {
  const team = teams.find((t) => t.id === Number(req.params.id));
  if (!team) return res.status(404).json({ message: 'Jamoa topilmadi' });
  res.json(team);
};

exports.create = (req, res) => {
  const { name, city } = req.body;
  if (!name) return res.status(400).json({ message: 'Jamoa nomi kiritilishi shart' });

  const team = { id: nextId++, name, city: city || '' };
  teams.push(team);
  res.status(201).json(team);
};

exports.update = (req, res) => {
  const team = teams.find((t) => t.id === Number(req.params.id));
  if (!team) return res.status(404).json({ message: 'Jamoa topilmadi' });

  const { name, city } = req.body;
  if (name !== undefined) team.name = name;
  if (city !== undefined) team.city = city;
  res.json(team);
};

exports.remove = (req, res) => {
  const index = teams.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Jamoa topilmadi' });

  teams.splice(index, 1);
  res.json({ message: "Jamoa o'chirildi" });
};

exports.exists = (id) => teams.some((t) => t.id === Number(id));