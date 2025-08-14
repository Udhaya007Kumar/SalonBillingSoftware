import express from 'express';
import {
  listProductAdjustments,
  singleProductAdjustment,
  addProductAdjustment,
  editProductAdjustment,
  removeProductAdjustment
} from '../controllers/product_adjustment.controller.js';

const router = express.Router();

router.get('/', listProductAdjustments);
router.get('/:id', singleProductAdjustment);
router.post('/', addProductAdjustment);
router.put('/:id', editProductAdjustment);
router.delete('/:id', removeProductAdjustment);

export default router;
