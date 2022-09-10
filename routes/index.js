//this is the entry point to all the rooutes in this project
const express = require("express");
const fetch = require("node-fetch");

const db = require("../config/mongoose");

const birth_detail = require("../models/birth-details");

const router = express.Router();

router.use(express.static("assets"));

// parsing data which is coing from server
router.use("/", express.urlencoded({ extended: true }));

//Setting up controller(i.e posts) which would be used for users home action of home_controller
const homeController = require("../controller/home_controller");

//rendering home action from home_controller
router.get("/", homeController.home);

// Upon submitting the form in home.ejs we should get the data here and
//based on that data we need to fetch the date of birth, gem suggestion and
//astro details after that we need to redirect to user.js and display the relevant result there.

// router.use("/users", require("./user"));
router.post("/user", homeController.horoscope_details);
console.log("router has loaded");

module.exports = router;
