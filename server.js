
const express = require('express');
const app = express();
const axios = require('axios');
const geoip = require('geoip-lite');
const PORT = process.env.PORT || 3000;

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    
    const geo = geoip.lookup(clientIp);

    let location;
    if (geo) {
        location = geo.city || geo.region || geo.country;
    } else {
        location = 'Unknown';
    }

    try {
        
        const weatherAPIKey = '3a8e8759133c4d62b0c102151240107';
        const weatherAPIURL = `http://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${location}&aqi=no`;
        
        const response = await axios.get(weatherAPIURL);
        const temperature = response.data.current.temp_c;

        res.json({
            client_ip: clientIp,
            location: location,
            greeting: `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${location}`
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
