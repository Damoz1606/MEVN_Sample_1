const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome page",
  });
});

module.exports = router;
