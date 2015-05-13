var mongoose = require('mongoose');

var calculatorSchema = new mongoose.Schema({
    calculation: String
});

module.exports = mongoose.model('calculation', calculatorSchema);
