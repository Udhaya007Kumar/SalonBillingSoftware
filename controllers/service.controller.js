import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../models/service.model.js';

export const listServices = async (req, res) => {
  try {
    const services = await getAllServices();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const singleService = async (req, res) => {
  try {
    const service = await getServiceById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addService = async (req, res) => {
  try {
    const newService = await createService(req.body);
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editService = async (req, res) => {
  try {
    const updated = await updateService(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeService = async (req, res) => {
  try {
    const result = await deleteService(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
