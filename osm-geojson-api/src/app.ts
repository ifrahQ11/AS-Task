import express, { Application, Request, Response } from 'express';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import { OSM_API_URL, API_ERRORS, API_ERROR_MESSAGES } from "./const";

const app : Application = express();

const PORT = process.env.PORT || 3000;

app.get('/geoJsonFeatures', async (request: Request, response: Response) => {
  const { left, bottom, right, top } = request.query;

  if (!left || !bottom || !right || !top) {
    return response.status(400).json({ name: API_ERRORS.BoundingParametersMissing, error: API_ERROR_MESSAGES.BoundingParametersMissing });
  }

  try {
    const boundingBox = `${left},${bottom},${right},${top}`;

    const apiResponse = await axios.get(`${OSM_API_URL}?bbox=${boundingBox}`);

    const geoJsonData =  osmtogeojson(apiResponse.data);

    return response.status(200).json(geoJsonData);
  } catch (error) {
    return response.status(500).json({ name: API_ERRORS.UnableToRetreiveData, error: API_ERROR_MESSAGES.UnableToRetreiveData });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

export default app;