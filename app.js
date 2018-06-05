var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
    {name: 'Salmon Creek', image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b014439df2c37fa5e8bc_340.jpg'},
    {name: 'Whistler Gorge', image: 'https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f8c37ba1efb0b1_340.jpg'},
    {name: 'Lake Nas', image: 'https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104497f8c37ba1efb0b1_340.jpg'}
];

// landing page
app.get('/', function(req, res){
    res.render('landing');
});

// shows all campgrounds
app.get('/campgrounds', function(req, res){
    res.render('campgrounds', {campgrounds:campgrounds});
});

// shows new campground form
app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});

app.post('/campgrounds', function(req, res){
    // get data from form and add to cmapgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

app.listen(3000, process.env.IP, function() {
    console.log('Listening on port 3000');
});