import pool from '../config/db.js';

export const listMemberships = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM memberships');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const singleMembership = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM memberships WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Membership not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addMembership = async (req, res) => {
  try {
    const { name, price, duration_days } = req.body;
    const [result] = await pool.query(
      'INSERT INTO memberships (name, price, duration_days) VALUES (?, ?, ?)',
      [name, price, duration_days]
    );
    res.status(201).json({ id: result.insertId, name, price, duration_days });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editMembership = async (req, res) => {
  try {
    const { name, price, duration_days } = req.body;
    await pool.query(
      'UPDATE memberships SET name=?, price=?, duration_days=? WHERE id=?',
      [name, price, duration_days, req.params.id]
    );
    res.json({ id: req.params.id, name, price, duration_days });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeMembership = async (req, res) => {
  try {
    await pool.query('DELETE FROM memberships WHERE id = ?', [req.params.id]);
    res.json({ message: 'Membership deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
