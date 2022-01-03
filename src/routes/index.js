const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

require('dotenv').config();
const router = express.Router(); 
projectData = {};
const OWM_APIKEY = '&appid=' + process.env.OWM_APIKEY;
const OWM_URL = 'https://api.openweathermap.org/data/2.5/weather';
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.route('/weather')
    .get((req, res) => {
        const zip = req.query.zip;
        if(!zip) return res.send({error: 'zip code is missing'})
        request({
            method: 'GET',
            uri: OWM_URL+'zip=' + zip + OWM_APIKEY      
        }, (error, response, body) => {
            if(!error && response.statusCode === 200) {
                projectData['weather'] = JSON.parse(body);
                return res.send(body);
            } 
            else if (!error) {
                return res.send(body);
            }
        });
    });
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
module.exports = router;}