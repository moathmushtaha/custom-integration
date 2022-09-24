const router = require('express').Router();
const mondayRoutes = require('./monday');

router.use(mondayRoutes);

router.get('/', function (req, res) {
  res.json(getHealth());
});

router.get('/health', function (req, res) {
  res.json(getHealth());
  res.end();
});

function getHealth() {
  return 'hello world';
}

module.exports = router;
