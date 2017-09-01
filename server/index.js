// modules
const express = require('express')
const massive = require('massive')
const {json} = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
// const gapi = require('googleapis')

// imported files
const config = require('./config')
const controller = require('./controller')

// constants
const port = 3001

// express app
const app = module.exports = express()

app.use(express.static(`../public`))

// auth0
app.use(session({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new Auth0Strategy(config.auth0, function(accessToken, refreshToken, extraParams, profile, done) {

    return done(null, profile)
}))

passport.serializeUser(function(user,done) {
  done(null, user)
})

passport.deserializeUser(function(user,done) {
  done(null, user)
})



// gapi client

// #need to connect auth?

// const OAuth2 = gapi.auth.OAuth2
// const oauth2client = new OAuth2(
//     '217648744455-3c6jmj2rsuomrqrvaf68rjsht0ak5h2u.apps.googleusercontent.com',
//     'tfHmBRbIQoWyJloV-SKfMTsJ',
//     '/'
// )

// const url = oauth2client.generateAuthUrl('https://www.googleapis.com/auth/youtube')


// middleware
app.use(json())
app.use(cors())


// endpoints

app.get('/login', passport.authenticate('auth0'), function(req,res) {
    let path = req.query.path
  res.redirect(`/#!${path}`)
})

app.get('/auth/callback',
passport.authenticate('auth0', {
  failureRedirect: '/login'
}), (req,res) => res.redirect('http://localhost:3000'))

app.get('/api/youtube/video', controller.getVideosBySearch)
app.get('/api/youtube/suggested', controller.getSuggestedVideos)
app.get('/api/youtube/comments', controller.getVideoComments)
app.get('/api/youtube/channel', controller.getChannelInfo)

app.get('/api/youtube/videoPageDetails', controller.getVideoPageDetails)




// listen

app.listen(port, () => console.log(`listening on ${port}`))