import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

const PORT = 3000;
const COOKIE_SECRET = 'sOme4rAnDom$tringCangohere';
const app = express();

// Include the middleware we want to use
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

// Sessions use cookie, so include the cookie parser middleware before the express session middleware
app.use(cookieParser(COOKIE_SECRET))

/*
* We are setting the age of the cookie to 60*60*1000 milliseconds or 1 hour
*/
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    cookie: { maxAge: 3600000 }
}))


app.post('/', (req, res) => {
    // Set language preference on the session
    req.session.language = req.body.language;
    // Send link to greeting page
    res.send('<a href="/greeting">Click</a> to get your greeting');
})


app.get('/greeting', (req, res) => {
    // Find the preferred language from the cookie and
    // display the greeting in that language
    const greeting = req.session.language === 'spanish'
        ? 'Hola Mundo!'
        : 'Hello World!';
    res.send(greeting)
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
