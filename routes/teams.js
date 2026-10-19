const express = require('express');
const router = express.Router();
const team = require('../controllers/teamController');
const { verifyToken } = require('../middleware/auth');

router.get('/', team.getAll);
router.get('/:id', team.getOne);
router.post('/', verifyToken, team.create);
router.put('/:id', verifyToken, team.update);
router.delete('/:id', verifyToken, team.remove);

module.exports = router;