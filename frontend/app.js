const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const fs = require('fs');
const port = 4000;

// Set paths for views and partials
const viewsPath = path.join(__dirname, './views');
const partialsPath = path.join(__dirname, './views/partials');
const artCommunityDataPath = path.join(__dirname, './public/Data/art-community.json');


// Set Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Serve images from the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

hbs.registerHelper('eq', function(arg1, arg2) {
    return arg1 === arg2;
});


// Home route
app.get('/', (req, res) => {
    res.render('pages/landing-page', {
        title: 'HarmonyHub - Home',
        platformName: 'HarmonyHub',
        description: 'Explore communities and grow together!'
    });
});

app.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'About HarmonyHub',
        platformName: 'HarmonyHub',
        description: 'HarmonyHub is an online platform that connects people with like-minded communities, helping them grow and discover new opportunities.'
    });
});

app.get('/art-community', (req, res) => {
    const artCommunityData = JSON.parse(fs.readFileSync(artCommunityDataPath, 'utf8'));
    res.render('pages/art-community', { 
        title: 'Art Community',
        platformName: 'HarmonyHub',
        name: 'The world of Art',
        description: 'Connect with fellow creatives, explore new techniques, and express yourself through art.',
        genres: artCommunityData.genres
    });
});

app.get('/book-community', (req, res) => {
    res.render('pages/book-community', {
        title: 'Book Community',
        platformName: 'HarmonyHub',
        name: 'Discover a World of Books and Stories',
        description: 'Explore reviews, meet authors, join book clubs, and find your next great read.'
    });
});

app.get('/business-community', (req, res) => {
    res.render('pages/business-community', {
        title: 'Business Community',
        platformName: 'HarmonyHub',
        name: 'Empower Your Entrepreneurial Journey',
        description: 'Discover resources, connect with mentors, and grow your business.'
    });
});

app.get('/food-community', (req, res) => {
    res.render('pages/food-community', {
        title: 'Food Community',
        platformName: 'HarmonyHub',
        name: 'Discover the World of Culinary Creations',
        description: 'Explore delicious recipes, cooking tips, and more from top food creators.',
    });
});

app.get('/spiritual-community', (req, res) => {
    res.render('pages/spiritual-community', {
        title: 'Spiritual Community',
        platformName: 'HarmonyHub',
        name: 'Explore Spiritual Paths and Practices',
        description: 'Connect with like-minded individuals, find peace, and grow spiritually.'
    });
});

app.get('/signup', (req, res) => {
    res.render('pages/signup', {
        title: 'Signup',
        platformName: 'HarmonyHub'
    });
});

app.get('/login', (req, res) => {
    res.render('pages/login', {
        title: 'Login',
        platformName: 'HarmonyHub',
        description: 'Log in to your account and access the community!',
    });
});

app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', {
        title: 'Dashboard',
        platformName: 'HarmonyHub'
    });
})




// Add more routes (e.g., /community, /contact)
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
