import express from 'express';
import {
  listPayments,
  singlePayment,
  addPayment,
  editPayment,
  removePayment
} from '../controllers/payment.controller.js';

const router = express.Router();

router.get('/', listPayments);
router.get('/:id', singlePayment);
router.post('/', addPayment);
router.put('/:id', editPayment);
router.delete('/:id', removePayment);

export default router;
