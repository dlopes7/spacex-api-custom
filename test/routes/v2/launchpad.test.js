
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                        Launchpads
//------------------------------------------------------------

test('It should return all launchpads', async () => {
  const response = await request(app.callback()).get('/v2/launchpads');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveLength(6);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('full_name');
    expect(item).toHaveProperty('status');
    expect(item).toHaveProperty('vehicles_launched');
    expect(item).toHaveProperty('details');
  });
});

test('It should return LC-39A info', async () => {
  const response = await request(app.callback()).get('/v2/launchpads/ksc_lc_39a');
  expect(response.statusCode).toBe(200);
  expect(response.text).toContain('ksc_lc_39a');
});

test('It should return no launchpad info', async () => {
  const response = await request(app.callback()).get('/v2/launchpads/ksc_lc_40a');
  expect(response.statusCode).toBe(204);
});
