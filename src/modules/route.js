import express from 'express';
const router = express.Router();

router.get("/greet", (req, res) => {
    const user ={
        Greet : "Hellow.........."
    }
    return res.status(200).json(user);
});

export default router;
