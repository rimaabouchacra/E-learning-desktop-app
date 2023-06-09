const express = require("express");
const router = express.Router();

const { 
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse,
    enroll, 
    listStudents,
    applyWithdrawal,
    approveWithdraw,
    rejectWithdraw
   

 } = require("../controllers/courseController");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/admin.middleware");

router.use(authMiddleware);

router.post("/", adminMiddleware, createCourse);
router.get("/:id",adminMiddleware, getCourse);
router.put("/:id",adminMiddleware, updateCourse);
router.delete("/:id",adminMiddleware, deleteCourse);
router.post("/:id/enroll", authMiddleware, enroll);
router.get("/:id/students",adminMiddleware, listStudents);
router.post("/:id/withdrawals", authMiddleware, applyWithdrawal);
router.patch("/:id/withdrawals/approve", adminMiddleware, approveWithdraw);
router.patch("/:id/withdrawals/reject", adminMiddleware, rejectWithdraw);


module.exports = router;



