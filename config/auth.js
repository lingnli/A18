//確保每個頁面都在登入狀態才可使用
module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("login_auth", "請先登入！");
    res.redirect("/user/login");
  }
};
