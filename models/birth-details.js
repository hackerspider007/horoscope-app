// requiring the mongoose library
const mongoose = require('mongoose');

const dobSchema = new mongoose.Schema({
    
       birth_detail: {
            type:Object,
            required:true
        },
        astro_details: {
            type:Object,
            required:true 
        },
        basic_gem_suggestion: {
            type:Object,
            required:true
        },

}); 


const birthDetail = mongoose.model('birth_detail',dobSchema);

module.exports = birthDetail;

