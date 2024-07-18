const mongoose = require('mongoose');
const Client = require('../models/Client');

describe('Client Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('create & save client successfully', async () => {
    const clientData = { name: 'John Doe', phone: '123456789', caseNumber: 'ABC123' };
    const validClient = new Client(clientData);
    const savedClient = await validClient.save();
    expect(savedClient._id).toBeDefined();
    expect(savedClient.name).toBe(clientData.name);
    expect(savedClient.phone).toBe(clientData.phone);
    expect(savedClient.caseNumber).toBe(clientData.caseNumber);
  });

  it('insert client successfully, but the field does not defined in schema should be undefined', async () => {
    const clientWithInvalidField = new Client({ name: 'John Doe', phone: '123456789', caseNumber: 'ABC123', nickname: 'Johnny' });
    const savedClientWithInvalidField = await clientWithInvalidField.save();
    expect(savedClientWithInvalidField._id).toBeDefined();
    expect(savedClientWithInvalidField.nickName).toBeUndefined();
  });

  it('create client without required field should fail', async () => {
    const clientWithoutRequiredField = new Client({ name: 'John Doe' });
    let err;
    try {
      const savedClientWithoutRequiredField = await clientWithoutRequiredField.save();
      error = savedClientWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.phone).toBeDefined();
  });
});
