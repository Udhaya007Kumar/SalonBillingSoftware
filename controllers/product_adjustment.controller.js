import pool from '../config/db.js';

export const listProductAdjustments = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM product_adjustments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const singleProductAdjustment = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM product_adjustments WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Product adjustment not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addProductAdjustment = async (req, res) => {
  try {
    const { product_id, adjustment_quantity, reason, adjustment_date = new Date() } = req.body;
    const [result] = await pool.query(
      'INSERT INTO product_adjustments (product_id, adjustment_quantity, reason, adjustment_date) VALUES (?, ?, ?, ?)',
      [product_id, adjustment_quantity, reason, adjustment_date]
    );
    res.status(201).json({ id: result.insertId, product_id, adjustment_quantity, reason, adjustment_date });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editProductAdjustment = async (req, res) => {
  try {
    const { product_id, adjustment_quantity, reason, adjustment_date } = req.body;
    await pool.query(
      'UPDATE product_adjustments SET product_id=?, adjustment_quantity=?, reason=?, adjustment_date=? WHERE id=?',
      [product_id, adjustment_quantity, reason, adjustment_date, req.params.id]
    );
    res.json({ id: req.params.id, product_id, adjustment_quantity, reason, adjustment_date });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeProductAdjustment = async (req, res) => {
  try {
    await pool.query('DELETE FROM product_adjustments WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product adjustment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
