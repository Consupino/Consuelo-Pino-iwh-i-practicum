const express = require('express');
const axios = require('axios');
const app = express();


app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

require('dotenv').config();
const PRIVATE_APP_ACCESS = process.env.token;

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.
app.get('/plants', async(req, res) => {

    const plants = 'https://api.hubspot.com/crm/v3/objects/2-24060158?properties=plant_name,plant_color,plant_type'
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

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here

app.get('/update-cobj', async(req, res)=>{
    //http://localhost:3000/update-cobj?plantName=Delirio
    const plantName=req.query.plantName;

    const getPlant=`https://api.hubspot.com/crm/v3/objects/2-24060158/${plantName}?idProperty=plant_name&properties=plant_color`;
    const headers= {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(getPlant, {headers});
        const data=response.data;
        res.render('update', {plantName: data.properties.plant_name, plantColor: data.properties.plant_color});
    } catch (error) {
        console.error(error);
    }

});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

app.post('/update-cobj', async(req, res) => {
    const update={
        properties: {
            "plant_color": req.body.newVal
        }
    }

})

app.listen(3000, () => console.log('Listening on http://localhost:3000'));