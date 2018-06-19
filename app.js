var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//         name: 'Nowhereville USA', 
//         image: 'https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f9c27ca7e8b6bd_340.jpg',
//         description: 'This is in the middle of nowhere, you stupid douchknuckle'
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log('Newly-created campground: ');
//             console.log(campground);
//         }
//     });

// =======================================
// *** ROUTES ***
// =======================================

// landing page
app.get('/', function(req, res){
    res.render('landing');
});

// *** INDEX Route - shows all campgrounds ***
app.get('/campgrounds', function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('index', {campgrounds:allCampgrounds});
        }
    });
});

// *** CREATE Route - add new campground to DB ***
app.post('/campgrounds', function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});

// *** NEW Route - shows new campground form to create new campground ***
app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});

// *** SHOW Route - shows more info about one campground ***
app.get('/campgrounds/:id', function(req, res){
    // find campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // render show template with that campground
            res.render('show', {campground: foundCampground});
        }
    });
});

app.listen(3000, process.env.IP, function() {
    console.log('Listening on port 3000');
});