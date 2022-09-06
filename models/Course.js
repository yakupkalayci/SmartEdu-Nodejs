const mongoose = require("mongoose");
const slugify = require("slugify");

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
    },
    slug: {
        type: String,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

courseSchema.pre("save", function(next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    });
    next();
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;