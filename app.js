const express = require('express');
const app = express();
const port = 3003;
const middleware = require("./middleware")
const path = require('path')

const server = app.listen(port, () => console.log("server listening on port: " + port));

app.set("view engine", "pug");
app.set("veiws", "veiws");
app.use(express.static(path.join(__dirname, "public")))

//routes
const loginRoute = require('./routes/loginRoutes');

app.use("/login", loginRoute);


app.get("/", middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle: "Home"
    }
    res.status(200).render("home", payload);
});