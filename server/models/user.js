const Mongoose = require("mongoose");
const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = Mongoose.model("User", userSchema);