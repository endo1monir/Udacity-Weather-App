/* Global Variables */
const baseurl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=0aee2a707a96c507eb8926ba5e91afd8';
let zipCode = '';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const getWeather = async(url = '', zcode = '', apik = '') => {
    const response = await fetch(url + zcode + apik);
    try {
        const data = await response.json();
        console.log(data.main.temp);
        return data;
    } catch (error) {
        console.log(error);
    }
}

const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {} catch (error) {}
}

const updateUIData = async() => {
    const uiresponse = await fetch('/getdata');
    try {
        const data = await uiresponse.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temperature;
        document.getElementById('content').innerHTML = data.user_response;
    } catch (error) {}
}

document.getElementById('generate').addEventListener('click', function() {
    let zipval = document.getElementById('zip').value;
    let resval = document.getElementById('feelings').value;
    getWeather(baseurl, zipval, apiKey)
        .then(function(data) {
            postData('/save', { temp: data.main.temp, date: newDate, userres: resval });
            updateUIData();
        })
});