// src/pages/api/test1.js

import axios from 'axios';

export default async function handler(req, res) {
  try {

    const response = await axios.get('http://localhost:8089/api/test1');
    const testing = response.data;
    res.status(200).json({testing});
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
