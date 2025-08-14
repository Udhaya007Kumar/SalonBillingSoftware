import express from 'express';
import {
  listMemberships,
  singleMembership,
  addMembership,
  editMembership,
  removeMembership
} from '../controllers/membership.controller.js';

const router = express.Router();

router.get('/', listMemberships);
router.get('/:id', singleMembership);
router.post('/', addMembership);
router.put('/:id', editMembership);
router.delete('/:id', removeMembership);

export default router;
