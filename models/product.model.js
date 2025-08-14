import pool from '../config/db.js';

export const getAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
};

export const getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

export const createProduct = async (data) => {
  const { name, price, stock_quantity = 0, tax_percentage = 0 } = data;
  const [result] = await pool.query(
    'INSERT INTO products (name, price, stock_quantity, tax_percentage) VALUES (?, ?, ?, ?)',
    [name, price, stock_quantity, tax_percentage]
  );
  return { id: result.insertId, ...data };
};

export const updateProduct = async (id, data) => {
  const { name, price, stock_quantity, tax_percentage } = data;
  await pool.query(
    'UPDATE products SET name=?, price=?, stock_quantity=?, tax_percentage=? WHERE id=?',
    [name, price, stock_quantity, tax_percentage, id]
  );
  return { id, ...data };
};

export const deleteProduct = async (id) => {
  await pool.query('DELETE FROM products WHERE id = ?', [id]);
  return { message: 'Product deleted successfully' };
};
