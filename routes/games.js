const express = require('express');
const router = express.Router();
const game = require('../controllers/gameController');
const { verifyToken } = require('../middleware/auth');

router.get('/', game.getAll);
router.get('/:id', game.getOne);
router.post('/', verifyToken, game.create);
router.put('/:id', verifyToken, game.update);
router.delete('/:id', verifyToken, game.remove);

module.exports = router;