// main error handling function

const processNormal = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log("processNormal");
  console.log(err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const processNotFound = (err, req, res) => {
  err.status = "No Results Found";
  const locals = { title: "No Results" };

  res.render("notFound", { err, locals, req });
};

const processNoResultsSearch = (err, req, res) => {
  err.status = "No Results Found";
  const locals = { title: "No Results" };

  res.render("noResults", { err, locals, req });
};

const processDupUser = (err, req, res) => {
  err.status = "Username Already Exists";
  const locals = { title: "Dup Key Error" };

  res.render("dupUser", { err, locals, req });
};

const processDupEmail = (err, req, res) => {
  err.status = "Email Already Exists";
  const locals = { title: "Dup Key Error" };

  res.render("dupEmail", { err, locals, req });
};

const processFormValidationError = (err, req, res) => {
  err.status = "Form Validation Error";
  const locals = { title: "Form Error" };

  res.render("validationError", { err, locals, req });
};

module.exports = (err, req, res, next) => {
  if (err.statusCode === 444) {
    return processNoResultsSearch(err, req, res);
  }
  if (err.statusCode === 404) {
    return processNotFound(err, req, res);
  }
  if (err.code === 11000 && err.keyValue.username) {
    return processDupUser(err, req, res);
  }
  if (err.code === 11000 && err.keyValue.email) {
    return processDupEmail(err, req, res);
  }
  if (err.message.includes("User validation failed:")) {
    return processFormValidationError(err, req, res);
  }

  processNormal(err, req, res);
};
