module.exports = function (req, res, next) {
  // 401 Unauthorized : the user  want to accsess to a protected operation but he has an invalid token
  // 403 Forbidden : when the user has a valid token and still not  allowed to acess to ressource=> seulment admin  a le droit de l'utiliser

  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};
