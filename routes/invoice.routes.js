import express from 'express';
import {
  listInvoices,
  singleInvoice,
  addInvoice,
  editInvoice,
  removeInvoice
} from '../controllers/invoice.controller.js';

const router = express.Router();

router.get('/', listInvoices);
router.get('/:id', singleInvoice);
router.post('/', addInvoice);
router.put('/:id', editInvoice);
router.delete('/:id', removeInvoice);

export default router;
