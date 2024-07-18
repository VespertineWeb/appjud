const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const clientsRouter = require('../routes/clients');
const advocatesRouter = require('../routes/advocates');

const app = express();
app.use(express.json());
app.use('/api/clients', clientsRouter);
app.use('/api/advocates', advocatesRouter);

describe('Integration Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /api/clients - success', async () => {
    const res = await request(app)
      .post('/api/clients')
      .send({
        name: 'John Doe',
        phone: '123456789',
        caseNumber: 'ABC123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('POST /api/clients - failure', async () => {
    const res = await request(app)
      .post('/api/clients')
      .send({
        name: 'John Doe',
      });
    expect(res.statusCode).toEqual(500);
  });

  it('POST /api/advocates - success', async () => {
    const res = await request(app)
      .post('/api/advocates')
      .send({
        name: 'Jane Smith',
        phone: '987654321',
        clients: [],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('POST /api/advocates - failure', async () => {
    const res = await request(app)
      .post('/api/advocates')
      .send({
        name: 'Jane Smith',
      });
    expect(res.statusCode).toEqual(500);
  });
});
