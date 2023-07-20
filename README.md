## Description

This holds a basic implementation of geoJsonFeatures API. 
Note : No authentication or persistance is being used in the API call. 
       The GET API only fetches the data from OSM url, checks for validity and returns response.
       All functionality lies under /src.

## Installation

After cloning the repository, please proceed the following way : 

```bash
$ cd osm-geojson-api
$ npm install
```

## Running the app

```bash

#build
$ npm run build

# development
$ npm run start

```

## Testing

After the build, the app would be available at `http://localhost:3000` & can be tested using curl commands
For example : 
`curl -X GET "http://localhost:3000/geoJsonFeatures?left=-122.4009&bottom=37.7701&right=-122.3943&top=37.7740"`

```bash
# unit tests
$ npm run test
```
