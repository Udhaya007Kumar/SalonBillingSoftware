import pool from '../config/db.js';

export const getAllServices = async () => {
  const [rows] = await pool.query('SELECT * FROM services');
  return rows;
};

export const getServiceById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
  return rows[0];
};

export const createService = async (data) => {
  const { name, price, tax_percentage = 0 } = data;
  const [result] = await pool.query(
    'INSERT INTO services (name, price, tax_percentage) VALUES (?, ?, ?)',
    [name, price, tax_percentage]
  );
  return { id: result.insertId, ...data };
};

export const updateService = async (id, data) => {
  const { name, price, tax_percentage } = data;
  await pool.query(
    'UPDATE services SET name=?, price=?, tax_percentage=? WHERE id=?',
    [name, price, tax_percentage, id]
  );
  return { id, ...data };
};

export const deleteService = async (id) => {
  await pool.query('DELETE FROM services WHERE id = ?', [id]);
  return { message: 'Service deleted successfully' };
};
