const express = require('express');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./config/connection');
const utils = require('./utils/auth');
const cookieParser = require('cookie-parser');


db.on('error', (error) => console.error(error))

db.once('open', () => console.log("Connected to db"));

const PORT = process.env.PORT || 3001;
const app = express();


const hbs = exphbs.create({ utils });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(PORT, async () => {
    console.log(`Now listening on port: ${PORT}`);
});