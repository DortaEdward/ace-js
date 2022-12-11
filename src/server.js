const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const middleware = require('./middleware');
require('dotenv').config();
const db = require('./db/');


const app = express();
const PORT = process.env.PORT || 5003;

const { getUrls, createUrl, findUrl } = require('./Url/service');
require('./db');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

app.get('/', async (req, res, next) => {
  const urls = await getUrls(next);
  res.render('index', {
    urls: urls
  })
});

app.get('/:shorten', async (req, res, next) => {
  const url = await findUrl(req.params.shorten, next);
  res.redirect(url);
})

app.post('/create', async (req, res, next) => {
  try {
    const createdUrl = await createUrl({
      originalUrl: req.body.originalUrl,
      shorten: req.body.shorten
    }, next);
    res.status(200);
  } catch (error) {
    res.send('Error')
  }
})

app.use(middleware.notFound);
app.use(middleware.errorHandler)

app.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
})