const express = require("express");
const router = express.Router();

/**
 * @DESC Import the Controller file for user routes
 */
const userController = require("../controllers/userController");
const { userAuth, checkRole } = require("../auth/auth");

/**
 * @DESC Route to Register User
 */
router.post("/register-user", userController.register_user);

router.post("/register-admin", userController.register_admin);

router.post("/register-superadmin", userController.register_superadmin);

/**
 * @DESC Route To Login the Users
 */
router.post("/login-user", userController.login_user);

router.post("/login-admin", userController.login_admin);

router.post("/login-superadmin", userController.login_superadmin);

/**
 * @DESC Accessing the protected dashboard
 */
router.get("/dashboard", userAuth, userController.dashboard);

router.get(
  "/user-dashboard",
  userAuth,
  checkRole(["user"]),
  userController.user_dashboard
);

router.get(
  "/admin-dashboard",
  userAuth,
  checkRole(["admin"]),
  userController.admin_dashboard
);

router.get(
  "/superadmin-dashboard",
  userAuth,
  checkRole(["superadmin"]),
  userController.superadmin_dashboard
);

router.get(
  "/admin-and-superadmin-dashboard",
  userAuth,
  checkRole(["admin", "superadmin"]),
  userController.admin_and_superadmin_dashboard
);

module.exports = router;
