import pool from '../config/db.js';

export const listPayments = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM payments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const singlePayment = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM payments WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Payment not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addPayment = async (req, res) => {
  try {
    const { invoice_id, amount, method, payment_date = new Date() } = req.body;
    const [result] = await pool.query(
      'INSERT INTO payments (invoice_id, amount, method, payment_date) VALUES (?, ?, ?, ?)',
      [invoice_id, amount, method, payment_date]
    );
    res.status(201).json({ id: result.insertId, invoice_id, amount, method, payment_date });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editPayment = async (req, res) => {
  try {
    const { invoice_id, amount, method, payment_date } = req.body;
    await pool.query(
      'UPDATE payments SET invoice_id=?, amount=?, method=?, payment_date=? WHERE id=?',
      [invoice_id, amount, method, payment_date, req.params.id]
    );
    res.json({ id: req.params.id, invoice_id, amount, method, payment_date });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removePayment = async (req, res) => {
  try {
    await pool.query('DELETE FROM payments WHERE id = ?', [req.params.id]);
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
