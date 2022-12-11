const Urls = require('./schema');
const getUrls = async (next) => {
  try {
    const urls = await Urls.find();
    return urls;
  } catch (error) {
    next(error.message);
  }
}

const createUrl = async (payload, next) => {
  try {
    const newUrl = await Urls.create(payload);
    return newUrl;
  } catch (error) {
    next(error.message);
  }
}

const findUrl = async (shorten, next) => {
  try {
    const url = await Urls.findOne({
      shorten:shorten
    })
    return url.originalUrl;
  } catch (error) {
    next(error.message);
  }
}

module.exports = {
  getUrls,
  createUrl,
  findUrl
}