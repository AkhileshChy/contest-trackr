import express from "express";
import Contest from "../models/contest.model.js";

const router = express.Router();

router.get('/contests', async (req, res) => {
    try {
        const contests = await Contest.find();
        res.json(contests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contests' });
    }
});

export default router;