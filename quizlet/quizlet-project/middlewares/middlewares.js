module.exports.requireAuth = (req, res, next) => {
  if (Object.keys(req.signedCookies).length === 0) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports.notRequireAuth = (req, res, next) => {
  if (Object.keys(req.signedCookies).length !== 0) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports.requireAdmin = (req, res, next) => {
  if (Object.keys(req.signedCookies).length === 0) {
    res.redirect("/login");
  } else if (req.signedCookies.role === "user") {
    next();
  } else if (req.signedCookies.role === "admin") {
    res.redirect("users");
  }
};
