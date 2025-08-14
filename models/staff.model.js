import pool from '../config/db.js';

export const getAllStaff = async () => {
  const [rows] = await pool.query('SELECT * FROM staff');
  return rows;
};

export const getStaffById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM staff WHERE id = ?', [id]);
  return rows[0];
};

export const createStaff = async (data) => {
  const { name, dob, join_date, salary_fixed, active = true } = data;
  const [result] = await pool.query(
    'INSERT INTO staff (name, dob, join_date, salary_fixed, active) VALUES (?, ?, ?, ?, ?)',
    [name, dob, join_date, salary_fixed, active]
  );
  return { id: result.insertId, ...data };
};

export const updateStaff = async (id, data) => {
  const { name, dob, join_date, salary_fixed, active } = data;
  await pool.query(
    'UPDATE staff SET name=?, dob=?, join_date=?, salary_fixed=?, active=? WHERE id=?',
    [name, dob, join_date, salary_fixed, active, id]
  );
  return { id, ...data };
};

export const deleteStaff = async (id) => {
  await pool.query('DELETE FROM staff WHERE id = ?', [id]);
  return { message: 'Staff deleted successfully' };
};
