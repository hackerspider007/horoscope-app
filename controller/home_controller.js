
const fetch = require('node-fetch');
require('dotenv').config();
const db= require('mongoose');

module.exports.home = function (req, res) {
    return res.render("home", {
      title: "HOROSCOPE APP",
    });
  };
  
  module.exports.horoscope_details = async function(req,res){
    // console.log("req.body-->",req.body);
    let dob = req.body.birth_details.split('-');
    let lat_long_data=req.body.latlong.split('-');
   
    let data = { "day": parseInt(dob[2]), "month": parseInt(dob[1]), "year": parseInt(dob[0]), "hour": parseInt(req.body.hour), "min": parseInt(req.body.minute), "lat": parseFloat(lat_long_data[0]), "lon": parseFloat(lat_long_data[1]), "tzone": parseFloat(5.30 )};
 
    const response1 = await fetch('https://json.astrologyapi.com/v1/birth_details', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
             "authorization": "Basic " + btoa(process.env.user_id+":"+process.env.API_key),
             'Content-Type': 'application/json' }
    });

    const response2 = await fetch('https://json.astrologyapi.com/v1/astro_details' , {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
           "authorization": "Basic " + btoa(process.env.user_id+":"+process.env.API_key),
           'Content-Type': 'application/json' }
    });

    const response3 = await fetch('https://json.astrologyapi.com/v1/basic_gem_suggestion' , {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
           "authorization": "Basic " + btoa(process.env.user_id+":"+process.env.API_key),
           'Content-Type': 'application/json' }
    });


    const birth_output = await response1.json();
    console.log("birth_details: ",birth_output);

    const astro_output =await response2.json();
    console.log("astro_details: ",astro_output);


// not able to acess this api https://json.astrologyapi.com/v1/basic_gem_suggestion
//getting error message saying
/* 
astro_details:  {
  status: false,
  msg: 'Your subscribed plan is not authorized to access this API. Kindly visit your dashboard.'
}
*/
    const basic_gem_suggestion_output =await response3.json();
    console.log("basic_gem_suggestion: ",basic_gem_suggestion_output);

    return res.render("user", {
      title: "HOROSCOPE DETAILS",
      birth_details: birth_output,
      astro_details: astro_output,
      basic_gem_suggestion: basic_gem_suggestion_output,
    });

  }
