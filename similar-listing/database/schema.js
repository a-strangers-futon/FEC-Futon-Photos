const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const similarListingSchema = new Schema({
    url: String,
    listingID: Number,
    roomDescription: String,
    location: String,
    price: String,
    rating: Number,
    name: String
});

module.exports = { similarListingSchema };