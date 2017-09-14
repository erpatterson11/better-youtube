// modules
const express = require('express')
const massive = require('massive')
const {json} = require('body-parser')
const cors = require('cors')
const session = require('express-session')
// const passport = require('passport')
// const Auth0Strategy = require('passport-auth0')
const gapi = require('googleapis')


// imported files
const config = require('./config')
const ytApiConf = config.youtube.web
const controller = require('./controller')

// constants
const port = 3001
const devClientPort = 3000

// express app
const app = module.exports = express()

app.use(express.static(`../public`))

// auth0
app.use(session({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false
}))

const OAuth2 = gapi.auth.OAuth2
const oauth2Client = new OAuth2(
  ytApiConf.client_id, 
  ytApiConf.client_secret,
  ytApiConf.redirect_uris
  )

const scopes = "https://www.googleapis.com/auth/youtube.force-ssl"

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
})

app.get("/login", function(req,res) {
  console.log("url", url)
  res.redirect(url)
})

app.get("/oauthcallback", function(req, res) {
  const code = req.query.code
  oauth2Client.getToken(code, function(err, tokens) {
    console.log("tokens", tokens)
    if (!err) {
      oauth2Client.setCredentials(tokens)
      req.session.tokens = tokens
      res.redirect(`http://localhost:${devClientPort}`)
    }
  })


})





// app.use(passport.initialize())
// app.use(passport.session())
// app.use(passport.initialize())
// app.use(passport.session())
// passport.use(new Auth0Strategy(config.auth0, function(accessToken, refreshToken, extraParams, profile, done) {
//     profile.tokens = {
//       accessToken,
//       refreshToken
//     }



//     console.log("profile.tokens", profile.tokens.accessToken);
//     return done(null, profile)
// }))

// passport.serializeUser(function(user,done) {
//   done(null, user)
// })

// passport.deserializeUser(function(user,done) {
//   done(null, user)
// })


// middleware
app.use(json())
app.use(cors())


// endpoints

// app.get('/login', passport.authenticate('auth0'), function(req,res) {
//     let path = req.query.path
//   res.redirect(`/#!${path}`)
// })

// app.get('/auth/callback',
// passport.authenticate('auth0', {
//   failureRedirect: '/login'
// }), (req,res) => res.redirect(
// // 'http://localhost:3000'
// "/api/channels"
// ))

// Get user info from Auth0
app.get('/api/me', function(req,res) {
  res.send(req.user)
})



app.get('/api/youtube/video', controller.getVideosBySearch)
app.get('/api/youtube/suggested', controller.getSuggestedVideos)
app.get('/api/youtube/comments', controller.getVideoComments)
app.get('/api/youtube/channel/:id', controller.getChannelInfo)
app.get('/api/youtube/video/:id', controller.getVideoStatsById)

app.get('/api/youtube/videoPageDetails', controller.getVideoPageDetails)

app.get('/api/channels', controller.getChannels)


// listen

app.listen(port, () => console.log(`listening on ${port}`))