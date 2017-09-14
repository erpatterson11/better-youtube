'use strict'

////////////////////////////////////////////////////////////////////////////////////
// #REF: https://github.com/google/google-api-nodejs-client/#create-a-service-client
////////////////////////////////////////////////////////////////////////////////////


// node modules
const google = require('googleapis')

// modules
const config = require('./config')

// constants
const OAuth2 = google.auth.OAuth2
const CLIENT_ID = config.youtube.web.client_id
const CLIENT_SECRET = config.youtube.web.client_secret
const REDIRECT_URL = config.youtube.web.redirect_uris

const scopes = [
    'https://www.googleapis.com/auth/youtube'
]

// variables
let refreshToken



// YouTube API Service
const OAuth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
)


const url = OAuth2Client.generateAuthUrl({
    access_type: "offline",
    scopes: scopes
})

OAuth2Client.getToken(code, function(err, tokens) {
    if (!err) {
        OAuth2Client.setCredentials(tokens)
    }
})
