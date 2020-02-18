var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var  data = [
    {
        name: "Salmon",
        image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Cloud",
        image: "https://images.pexels.com/photos/730426/pexels-photo-730426.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Bilibili",
        image: "https://images.pexels.com/photos/2887786/pexels-photo-2887786.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB () {
    // Remove all campgrounds
    Campground.remove({}, function (err) {
         if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        // add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground")
                    // add a few comments
                    Comment.create(
                        {
                            text: "This place is great, but i hope there was internet",
                            author: "Sam"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a comment")
                            }
                        })
                }
            })
        })
    });
}

module.exports = seedDB;
