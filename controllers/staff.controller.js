import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff
} from '../models/staff.model.js';

export const listStaff = async (req, res) => {
  try {
    const staff = await getAllStaff();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const singleStaff = async (req, res) => {
  try {
    const staffMember = await getStaffById(req.params.id);
    if (!staffMember) return res.status(404).json({ error: 'Staff not found' });
    res.json(staffMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addStaff = async (req, res) => {
  try {
    const newStaff = await createStaff(req.body);
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editStaff = async (req, res) => {
  try {
    const updated = await updateStaff(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeStaff = async (req, res) => {
  try {
    const result = await deleteStaff(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
