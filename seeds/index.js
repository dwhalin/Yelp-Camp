

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {

    //useNewUrlParser: true,
    //
    //useUnifiedTopology: true

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6654baef658940cfbcc46786', 
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://unsplash.com/collections/483251/in-the-woods',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates autem neque assumenda eveniet ducimus odit nobis ipsa modi est accusamus?',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close
});