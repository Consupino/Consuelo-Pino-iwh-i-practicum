const express = require('express');
const axios = require('axios');
const app = express();


app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

require('dotenv').config();
const PRIVATE_APP_ACCESS = process.env.token;

app.get('/plants', async(req, res) => {

    const plants = 'https://api.hubspot.com/crm/v3/objects/2-24060158?properties=plant_name&properties=plant_color&properties=plant_type'
    const headers= {

        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    try {
        const resp = await axios.get(plants, { headers });
        const data = resp.data.results;
        res.render('plants', { title: 'Plants | HubSpot APIs', data });      
    } catch (error) {
        const response = await axios.get(plants, {headers});
        data = response.data;
        res.json(data);
    }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));