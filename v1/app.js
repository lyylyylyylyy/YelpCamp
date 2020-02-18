var express = require("express");
var app = express();
var bodyparser = require("body-parser")
var mongoose = require("mongoose")
var Campground = require("./models/campground")
var Comment = require("./models/comment")
var passport = require("passport")
var LocalStrategy = require("passport-local")
var User = require("./models/user")
var seedDB = require("./seeds")
var methodOverride = require("method-override")
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
var flash = require("connect-flash");




// seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp")

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
/*
Campground.create(
     {
         name: "Salmon",
         image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
         description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
     }, function (err, campground) {
         if (err){
             console.log(err);
         } else {
             console.log("NEWLY CREATED CAMPGROUND: ");
             console.log(campground);
         }
     }
 )
*/


// Passport Configuration
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require("moment");

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((User.serializeUser()));
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);




const port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log("The YelpCamp Server Has Started!");
});


