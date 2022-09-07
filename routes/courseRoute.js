const express = require("express");
const courseController = require("../controllers/courseController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);
router.route("/").post(roleMiddleware(["teacher", "admin"]), courseController.createCourse);

module.exports = router;