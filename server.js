const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const app = express();

const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, 'public')));
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {maxAge: 120000},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
