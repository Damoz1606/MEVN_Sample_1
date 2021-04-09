const router = require("express").Router();
const Tutorial = require("../model/tutorial.model");

router.get("/", (req, res) => {
  res.json({
    message: "Tutorial page",
  });
});

router.get("/tutorial", async (req, res) => {
  try {
    const items = await Tutorial.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({
      message: "Error",
      error: err,
    });
  }
});

router.get("/tutorial/:id", async (req, res) => {
  try {
    const item = await Tutorial.findById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({
      message: "Error",
      error: err,
    });
  }
});

router.post("/tutorial", async (req, res) => {
  await Tutorial.create(req.body)
    .then((db) => {
      res.status(200).json({
        status: "saved",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error",
        error: err,
      });
    });
});

router.put("/tutorial/:id", async (req, res) => {
  await Tutorial.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((db) => {
      res.status(200).json({
        status: "updated",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error",
        error: err,
      });
    });
});

router.delete("/tutorial/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const result = await Tutorial.findByIdAndRemove({ _id });
    if (!result) {
      return res.status(400).json({
        message: "Error",
        error: "Id no encontrado",
      });
    }
    res.status(200).json({
      status: "deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: "Error",
      error: err,
    });
  }
});

router.delete("/tutorial", async (req, res) => {
  await Tutorial.deleteMany({})
    .then((db) => {
      res.status(200).json({
        status: "deleted",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error",
        error: err,
      });
    });
});

module.exports = router;
