const Router = require("express");
const router = Router();

const authController = require("../controller/auth-controller");
const validate = require("../middleware/validate-middleware");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const authMiddleware = require("../middleware/auth-middleware");

router.route("/register").post(validate(signupSchema), authController.Register);
router.route("/login").post(validate(loginSchema), authController.Login);
router.route("/user").get(authMiddleware, authController.user);

module.exports = router;
