const express = require("express");
const Workout = require("../models/Workout");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * CREATE Workout
 */
router.post("/", auth, async (req, res) => {
    try {
        const workout = new Workout({
            ...req.body,
            userId: req.user.userId
        });

        await workout.save();
        res.status(201).json(workout);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET all workouts (user only)
 */
router.get("/", auth, async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user.userId });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * UPDATE workout
 */
router.put("/:id", auth, async (req, res) => {
    try {
        const updated = await Workout.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            req.body,
            { new: true }
        );

        res.json(updated);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * DELETE workout
 */
router.delete("/:id", auth, async (req, res) => {
    try {
        await Workout.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        res.json({ message: "Workout deleted" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;