import pool from '../config/db.js';

// Get all product adjustments
export const getAllProductAdjustments = async () => {
  const [rows] = await pool.query('SELECT * FROM product_adjustments');
  return rows;
};

// Get single product adjustment by ID
export const getProductAdjustmentById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM product_adjustments WHERE id = ?', [id]);
  return rows[0];
};

// Create a new product adjustment
export const createProductAdjustment = async (data) => {
  const { product_id, adjustment_quantity, reason, adjustment_date = new Date() } = data;
  const [result] = await pool.query(
    'INSERT INTO product_adjustments (product_id, adjustment_quantity, reason, adjustment_date) VALUES (?, ?, ?, ?)',
    [product_id, adjustment_quantity, reason, adjustment_date]
  );
  return { id: result.insertId, ...data };
};

// Update an existing product adjustment
export const updateProductAdjustment = async (id, data) => {
  const { product_id, adjustment_quantity, reason, adjustment_date } = data;
  await pool.query(
    'UPDATE product_adjustments SET product_id=?, adjustment_quantity=?, reason=?, adjustment_date=? WHERE id=?',
    [product_id, adjustment_quantity, reason, adjustment_date, id]
  );
  return { id, ...data };
};

// Delete a product adjustment
export const deleteProductAdjustment = async (id) => {
  await pool.query('DELETE FROM product_adjustments WHERE id = ?', [id]);
  return { message: 'Product adjustment deleted successfully' };
};
