import pool from '../config/db.js';

export const getAllCustomers = async () => {
  const [rows] = await pool.query('SELECT * FROM customers');
  return rows;
};

export const getCustomerById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM customers WHERE id = ?', [id]);
  return rows[0];
};

export const getCustomerByPhone = async (phone) => {
  const [rows] = await pool.query('SELECT * FROM customers WHERE phone = ?', [phone]);
  return rows[0];
};

export const createCustomer = async (data) => {
  const { name, phone, email = null, dob = null } = data;

  // Check if phone exists
  const existing = await getCustomerByPhone(phone);
  if (existing) {
    throw new Error('Customer with this phone number already exists');
  }

  const [result] = await pool.query(
    'INSERT INTO customers (name, phone, email, dob) VALUES (?, ?, ?, ?)',
    [name, phone, email, dob]
  );
  return { id: result.insertId, ...data };
};

export const updateCustomer = async (id, data) => {
  const { name, phone, email, dob } = data;

  // Check if phone exists for another customer
  const existing = await getCustomerByPhone(phone);
  if (existing && existing.id !== parseInt(id)) {
    throw new Error('Another customer with this phone number already exists');
  }

  await pool.query(
    'UPDATE customers SET name=?, phone=?, email=?, dob=? WHERE id=?',
    [name, phone, email, dob, id]
  );
  return { id, ...data };
};

export const deleteCustomer = async (id) => {
  await pool.query('DELETE FROM customers WHERE id = ?', [id]);
  return { message: 'Customer deleted successfully' };
};
