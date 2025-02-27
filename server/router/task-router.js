const Router = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth-middleware");
const taskController = require("../controller/task-controller");

router.route("/create-task").post(authMiddleware, taskController.createTask);
router.route("/get-task").get(authMiddleware, taskController.getTask);
router.route("/get-task/:id").get(authMiddleware, taskController.getTaskByID);
router.route("/update-task/:id").put(authMiddleware, taskController.updateTask);
router
  .route("/delete-task/:id")
  .delete(authMiddleware, taskController.deleteTask);

module.exports = router;
