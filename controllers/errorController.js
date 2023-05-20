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

module.exports = (err, req, res, next) => {
  if (err.statusCode === 444) {
    return processNoResultsSearch(err, req, res);
  }
  if (err.statusCode === 404) {
    return processNotFound(err, req, res);
  }

  //if(err.statusCode ===)
  processNormal(err, req, res);
};
