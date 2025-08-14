import express from 'express';
import {
  listCustomers,
  singleCustomer,
  addCustomer,
  editCustomer,
  removeCustomer
} from '../controllers/customer.controller.js';

const router = express.Router();

router.get('/', listCustomers);
router.get('/:id', singleCustomer);
router.post('/', addCustomer);
router.put('/:id', editCustomer);
router.delete('/:id', removeCustomer);

export default router;
