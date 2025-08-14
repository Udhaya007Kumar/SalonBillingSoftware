import express from 'express';
import cors from 'cors';
import pool from './config/db.js';

import customerRoutes from './routes/customer.routes.js';
import staffRoutes from './routes/staff.routes.js';
import serviceRoutes from './routes/service.routes.js';
import productRoutes from './routes/product.routes.js';
import invoiceRoutes from './routes/invoice.routes.js';
import membershipRoutes from './routes/membership.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import productAdjustmentRoutes from './routes/product_adjustment.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test DB connection route
app.get('/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.json({ message: '✅ DB Connected!', serverTime: rows[0].now });
  } catch (err) {
    console.error('❌ DB connection error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.use('/api/customers', customerRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/product-adjustments', productAdjustmentRoutes);
// Test API route
app.get('/', (req, res) => {
  res.send('Salon Backend API is running 🚀');
});



export default app;
