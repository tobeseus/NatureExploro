const mongoose = require('mongoose');
const Park = require('../models/park');
const cities = require('./cities');
const fetch = require('node-fetch')
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/nature-exploro');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log("Database connected");
})

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    // await Park.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 15) + 10;
        const random = Math.floor(Math.random() * 10);
        const img = await fetch('https://api.unsplash.com/search/photos?page=1&query=nature&client_id=Ye4s-1J8_IJW52cVVy1p6te2l_9bFCLbERClSaOZHgQ')
            .then((response) => response.json())
            .then((data) => {
                let image = data.results[random];
                console.log(image.urls.regular);
                return image.urls.regular;
            })
        const park = new Park({
            author: '63aa4cf7cbb0f8fddd421fe9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'just a random description place holder',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/djmmb03ds/image/upload/v1675673672/NatureExploro/ygavqg07rzs7k1ohk9hw.jpg',
                    filename: 'NatureExploro/ygavqg07rzs7k1ohk9hw',
                },
                {
                    url: 'https://res.cloudinary.com/djmmb03ds/image/upload/v1675673672/NatureExploro/ndftxggwmzxezrm798hw.jpg',
                    filename: 'NatureExploro/ndftxggwmzxezrm798hw',
                },
                {
                    url: 'https://res.cloudinary.com/djmmb03ds/image/upload/v1675673673/NatureExploro/tcvnmdthvpe2tbv8zw2g.jpg',
                    filename: 'NatureExploro/tcvnmdthvpe2tbv8zw2g',
                }
            ]
        })
        await park.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});