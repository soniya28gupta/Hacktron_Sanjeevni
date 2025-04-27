import express from 'express';
import { getMoodRecommendations } from '../controllers/recommendationController.js';

const router = express.Router();

router.post('/mood-recommendations', getMoodRecommendations);

export default router;
