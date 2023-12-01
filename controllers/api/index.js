const router = require("express").Router();

const desinationRoutes = require('./destinations');
const authRoutes = require('./auth');

router.use("/destinations", desinationRoutes);
router.use("/auth", authRoutes);

module.exports = router;