import pool from '../config/db.js';

export const getAllPayments = async () => {
  const [rows] = await pool.query('SELECT * FROM payments');
  return rows;
};

export const getPaymentById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM payments WHERE id = ?', [id]);
  return rows[0];
};

export const createPayment = async (data) => {
  const { invoice_id, amount, method, payment_date = new Date() } = data;
  const [result] = await pool.query(
    'INSERT INTO payments (invoice_id, amount, method, payment_date) VALUES (?, ?, ?, ?)',
    [invoice_id, amount, method, payment_date]
  );
  return { id: result.insertId, ...data };
};

export const updatePayment = async (id, data) => {
  const { invoice_id, amount, method, payment_date } = data;
  await pool.query(
    'UPDATE payments SET invoice_id=?, amount=?, method=?, payment_date=? WHERE id=?',
    [invoice_id, amount, method, payment_date, id]
  );
  return { id, ...data };
};

export const deletePayment = async (id) => {
  await pool.query('DELETE FROM payments WHERE id = ?', [id]);
  return { message: 'Payment deleted successfully' };
};
