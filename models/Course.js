const mongoose = require("mongoose");

const Scema = mongoose.Schema;

const courseSchema = new Scema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String, 
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;