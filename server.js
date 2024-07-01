// const express = require('express');
// const app = express();
// const geoip = require('geoip-lite');
// const PORT = process.env.PORT || 3000;

// app.get('/api/hello', async (req, res) => {
//     const visitorName = req.query.visitor_name;
//     const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    
//     //const location = 'Lagos';
//     const temperature = 11;

//     res.json({
//         client_ip: clientIp,
//         location: location,
//         greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const app = express();
const geoip = require('geoip-lite');
const PORT = process.env.PORT || 3000;

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Use geoip-lite to get location information based on client IP
    const geo = geoip.lookup(clientIp);

    let location;
    if (geo) {
        location = geo.city || geo.region || geo.country;
    } else {
        location = 'Unknown';
    }

    const temperature = 11; // Example temperature

    res.json({
        client_ip: clientIp,
        location: location,
        greeting: `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${location}`
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
