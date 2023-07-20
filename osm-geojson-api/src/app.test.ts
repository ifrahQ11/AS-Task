import  {describe, it, expect, jest} from "@jest/globals";

import request from 'supertest';

import app from './app';

import { API_ERRORS, API_ERROR_MESSAGES } from "./const";

describe('GET /geoJsonFeatures', () => {
  it('should return 400 if bounding box parameters are missing', async () => {
   const response = await request(app).get('/geoJsonFeatures')
    expect(response.status).toBe(400);
    expect(response.body).toEqual({name:API_ERRORS.BoundingParametersMissing, error: API_ERROR_MESSAGES.BoundingParametersMissing})
  });

  it('should return 200 with valid GeoJSON data for a given bounding box', async () => {
    const response = await request(app).get('/geoJsonFeatures').query({
      left: '-12.4009',
      bottom: '37.7701',
      right: '-12.3543',
      top: '37.8324',
    });
    expect(response.status).toBe(200);
  });

  it('should return 500 if there is an error while fetching OSM data', async () => {
    const response = await request(app).get('/geoJsonFeatures').query({
      left: '-122.5149',
      bottom: '37.7081',
      right: '-122.3543',
      top: '37.8324',
    });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ name: API_ERRORS.UnableToRetreiveData, error: API_ERROR_MESSAGES.UnableToRetreiveData });
  });
});
