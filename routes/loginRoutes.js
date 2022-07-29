const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");


app.set("view engine", "pug");
app.set("veiws", "veiws");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {

    res.status(200).render("login");
});

router.post("/", async (req, res, next) => {

    var payload = req.body;
    
    if (req.body.logUsername && req.body.logPassword) {
        var user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        .catch((err) => {
            console.log(err);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("login", payload);
        });

        if (user != null) {
            var result = await bcrypt.compare(req.body.logPassword, user.password)
            if (results === true){

            } 
            else {
                
            }
        }
    }

    res.status(200).render("login");
});

module.exports = router;