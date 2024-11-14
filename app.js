const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express ();
const PORT = 8000;
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'client')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

 app.post('/weather', async(req, res) => {
    const { city } = req.body;
    let request_uri = `http://api.weatherapi.com/v1/forecast.json?key=8b22d5d2128b4a4dbe915801241311&q=${city}&days=5`;    
    try {
      const response = await axios.get(request_uri);
      return res.status(200).json({status: true, data: response.data})
    }catch(error){
      return res.status(400).json({status: false})
    }
 });