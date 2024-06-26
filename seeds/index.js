

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const dbUrl = process.env.DB_URL;

mongoose.connect('mongodb+srv://danieljwhalin:kd5N8l2G1NdzISCM@cluster0.wkm7dic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66676cbb2dab8672db51f7d9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates autem neque assumenda eveniet ducimus odit nobis ipsa modi est accusamus?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]

            },
            images: [
                {
                    url: 'https://res.cloudinary.com/do0d90hkx/image/upload/v1717519342/YelpCamp/hcxyg8mmvgxwjnlnkdam.avif',
                    filename: 'YelpCamp/hcxyg8mmvgxwjnlnkdam'
                },
                {
                    url: 'https://res.cloudinary.com/do0d90hkx/image/upload/v1717523500/YelpCamp/vuazxdtcskfk3nq1est4.avif',
                    filename: 'YelpCamp/qygnmnjc0hoqdrhkxfqd'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close
});