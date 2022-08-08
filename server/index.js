/* eslint-disable no-console */
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const config = require('./config');

const app = express();

app.use(cors());

app.get(config.endpoints.profile, async (req, res) => {
  console.log(req.query);

  const { data } = await axios.request({
    baseURL: config.baseURL,
    url: config.endpoints.profile,
    headers: { 'X-Finnhub-Token': config.token },
    params: req.query,
  });

  res.json(data);
});

app.get(config.endpoints.candle, async (req, res) => {
  console.log(req.query);

  const { data } = await axios.request({
    baseURL: config.baseURL,
    url: config.endpoints.candle,
    headers: { 'X-Finnhub-Token': config.token },
    params: req.query,
  });

  res.json(data);
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
