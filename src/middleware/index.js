function notFound(req,res,next){
  const error = new Error('Not Found -', req.originalUrl);
  res.status(404);
  next(error);
}

function errorHandler(error,req,res,next){
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    error: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'Somewhere' : error.stack,
  });
}

module.exports = {
  notFound,
  errorHandler
}