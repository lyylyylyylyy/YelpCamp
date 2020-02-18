var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middlevare = require("../middleware/index");

//Index Show all the campgrounds
router.get("/", function (req, res) {
    if (req.query.search) {

        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}, function (err, allCampgrounds) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user, page: "campgrounds"});
            }
        })
    } else {
        // get all from DB
        Campground.find({}, function (err, allCampgrounds) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user, page: "campgrounds"});
            }
        })
    }
    // res.render("campgrounds",{campgrounds: campgrounds})
})


// create
router.post('/', middlevare.isLoggedIn, function (req, res) {
    // get data from and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name : name, image: image, description: description, author: author};

    // create a new and save in DB
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
})

// new -show form to create a new campground
router.get("/new", middlevare.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
})

// Show - show more info about one campground
router.get("/:id", function (req, res) {
    // find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground})
        }
    });
})

// Edit campground route
router.get("/:id/edit", middlevare.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// update campground route
router.put("/:id", middlevare.checkCampgroundOwnership, function (req, res) {
    // find and update the correct campground

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
    // redirect somewhere(show one)
})

// destroy campground route
router.delete("/:id", middlevare.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})


// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;
