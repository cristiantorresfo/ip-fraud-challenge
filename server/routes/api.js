import express from 'express';
import { getContext, addToBlacklist } from '../controllers/dataController.js';

const router = express.Router();

router.get('/context/:ip', getContext);
router.post('/blacklist/:ip', addToBlacklist);

export default router;
