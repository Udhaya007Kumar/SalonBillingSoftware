import express from 'express';
import {
  listServices,
  singleService,
  addService,
  editService,
  removeService
} from '../controllers/service.controller.js';

const router = express.Router();

router.get('/', listServices);
router.get('/:id', singleService);
router.post('/', addService);
router.put('/:id', editService);
router.delete('/:id', removeService);

export default router;
