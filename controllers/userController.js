const { registerUser, loginUser, serializeUser } = require("../auth/auth");

exports.register_user = async (req, res) => {
  await registerUser(req.body, "user", res);
};

exports.register_admin = async (req, res) => {
  await registerUser(req.body, "admin", res);
};

exports.register_superadmin = async (req, res) => {
  await registerUser(req.body, "superadmin", res);
};

exports.login_user = async (req, res) => {
  await loginUser(req.body, "user", res);
};

exports.login_admin = async (req, res) => {
  await loginUser(req.body, "admin", res);
};

exports.login_superadmin = async (req, res) => {
  await loginUser(req.body, "superadmin", res);
};

exports.dashboard = (req, res) => {
    return res.json(`Welcome to Dashboard ${serializeUser(req.user)}`)
}

exports.user_dashboard = (req, res) => {
    return res.json('Hello User')
}

exports.admin_dashboard = (req, res) => {
    return res.json('Hello Admin')
}

exports.superadmin_dashboard = (req, res) => {
    return res.json('Hello SuperAdmin')
}

exports.admin_and_superadmin_dashboard = (req, res) => {
    return res.json('Hello Admin and SuperAdmin')
}
