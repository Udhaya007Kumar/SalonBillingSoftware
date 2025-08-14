import express from 'express';
import {
  listStaff,
  singleStaff,
  addStaff,
  editStaff,
  removeStaff
} from '../controllers/staff.controller.js';

const router = express.Router();

router.get('/', listStaff);
router.get('/:id', singleStaff);
router.post('/', addStaff);
router.put('/:id', editStaff);
router.delete('/:id', removeStaff);

export default router;
