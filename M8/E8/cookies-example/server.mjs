import express from 'express';
import cookieParser from 'cookie-parser';

const PORT = 3000;
const COOKIE_SECRET = 'sOme4rAnDom$tringCangohere';
const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

// Install cookie-pasrser middleware
app.use(cookieParser(COOKIE_SECRET))

/**
 * Set the cookie based on the user's language preference
 * This is being done to demonstrate Express API's related to cookies.
 * Actual web apps should use locale to determine the language preference.
 */
app.post('/', (req, res) => {
    // Get user's language preference
    let language = req.body.language;

    // Set cookie
    res.cookie('LANGUAGE', language);
    // Send link to greeting page
    res.send('<a href="/greeting">Click</a> to get your greeting');
})

/**
 * Get the cookie about the user's language preference
 * This is being done to demonstrate Express API's related to cookies.
 * Actual web apps should use locale to determine the language preference.
 */
app.get('/greeting', (req, res) => {
    // Find the preferred language from the cookie and
    // display the greeting in that language
    const greeting = req.cookies.LANGUAGE === 'spanish'
        ? 'Hola Mundo!'
        : 'Hello World!';
    res.send(greeting);
});


/**
 * Send back info based on whether the request includes a 
 * signed cookie with name: favorite_icecream 
 * If the cookie isn't found on the request, add it to the response.
 */
app.get('/signedCookie', (req, res) => {
    let found = false;
    if (req.signedCookies.favorite_icecream !== undefined) {
        found = true;
    } else {
        // Add a signed cookie to the response
        res.cookie('favorite_icecream', 'mintchocolateChip', { signed: true });
    }
    const message = found ?
        `Your favorite icecream is ${req.signedCookies.favorite_icecream}`
        : `signedCookie was not found. We are setting it.`
    res.send(message)
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});