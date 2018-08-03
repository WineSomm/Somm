
const isLoggedIn = req => (req.session ? !!req.session.user : false);

const checkIfUserLoggedIn = (req, res, next) => {
  if (!isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};

const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

const createSession = (req, res) => {
  console.log('Session Created');
  return req.session.regenerate((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
};

module.exports = {
  checkIfUserLoggedIn: checkIfUserLoggedIn,
  createSession:createSession,
  logoutUser:logoutUser
};
