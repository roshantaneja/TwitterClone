const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const User = require("../schemas/UserSchema");
const { compile } = require('pug');
const bcrypt = require("bcrypt");

app.set("view engine", "pug");
app.set("veiws", "veiws");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    res.status(200).render("register");
});

router.post("/", async(req, res, next) => {
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;
    //console.log(req.body);

    if (firstName && lastName && username && email && password) {
        var user = await User.findOne({
                $or: [
                    { username: username },
                    { email: email }
                ]
            })
            .catch((err) => {
                console.log(err);
                payload.errorMessage = "Something went wrong.";
                res.status(200).render("register", payload);
            });

        if (user == null) {
            //no user found
            console.log("no user found! continuing with registration for " + username + "!")

            var data = req.body;


            //hash password
            data.password = await bcrypt.hash(password, 10);

            //insert user
            User.create(data)
                .then((user) => {
                    console.log(user);
                })
        } else {
            //found user matching usernmae or email
            if (email == user.email) {
                console.log("Email already in use.")
                payload.errorMessage = "Email already in use.";
            } else {
                console.log("Username already in use.")
                payload.errorMessage = "Username already in use.";
            }
            res.status(200).render("register", payload);
        }
    } else {
        payload.errorMessage = "Make sure each field has a valid value!"
        res.status(200).render("register", payload);
    }


});

module.exports = router;