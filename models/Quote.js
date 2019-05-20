const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quoteSchema = Schema({
    quote: String,
    author: String
});

module.exports = mongoose.model('Quote', quoteSchema);