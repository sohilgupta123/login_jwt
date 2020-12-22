const express = require('express');
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const jwt = require('jsonwebtoken');
var cors = require('cors');

mongoose.connect("mongodb://localhost:27017/testdb", {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
    useCreateIndex: true,
});

mongoose.connection.on("error", err => {
    console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
});



const accessTokenSecret = 'samplesecret123@sohil';

var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get("/", authenticateJWT, function (req, res) {
    return res.json(req.user);
});

app.post('/login', (req, res) => {
    // Read username and password from request body
    const {
        username,
        password
    } = req.body;
    // Filter user from the users array by username and password
    User.find({
        username,
        password
    }, function (err, docs) {
        if (err) {
            res.status(401);
            return res.json('Username or password incorrect');
        } else if (docs.length <= 0) {
            res.status(401);
            return res.json('Username or password incorrect');
        } else {
            const accessToken = jwt.sign({
                username: username,
                name: docs[0].name,
            }, accessTokenSecret);
            res.status(200);
            return res.json({
                accessToken
            });
        }
    });
});

app.post('/signup', (req, res) => {
    // Read username and password from request body
    const {
        name,
        username,
        password
    } = req.body;
    user = User.create({
        name,
        username,
        password
    }, function (err, docs) {
        if (err) {
            res.status(401);
            return res.json('Username or password incorrect');
        } else {
            const accessToken = jwt.sign({
                username: username,
                name: name,
            }, accessTokenSecret);
            res.status(200);
            return res.json({
                accessToken
            });
        }
    });
});



app.listen(4000, () => {
    console.log('Authentication service started on port 4000');
});