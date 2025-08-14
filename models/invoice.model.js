import pool from '../config/db.js';

export const getAllInvoices = async () => {
  const [rows] = await pool.query('SELECT * FROM invoices');
  return rows;
};

export const getInvoiceById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM invoices WHERE id = ?', [id]);
  return rows[0];
};

export const createInvoice = async (data) => {
  const { customer_id, total_amount, status = 'unpaid', invoice_date = new Date() } = data;
  const [result] = await pool.query(
    'INSERT INTO invoices (customer_id, total_amount, status, invoice_date) VALUES (?, ?, ?, ?)',
    [customer_id, total_amount, status, invoice_date]
  );
  return { id: result.insertId, ...data };
};

export const updateInvoice = async (id, data) => {
  const { customer_id, total_amount, status, invoice_date } = data;
  await pool.query(
    'UPDATE invoices SET customer_id=?, total_amount=?, status=?, invoice_date=? WHERE id=?',
    [customer_id, total_amount, status, invoice_date, id]
  );
  return { id, ...data };
};

export const deleteInvoice = async (id) => {
  await pool.query('DELETE FROM invoices WHERE id = ?', [id]);
  return { message: 'Invoice deleted successfully' };
};
