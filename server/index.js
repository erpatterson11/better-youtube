// CONFIG
////////////////////////////////////////////////////

// modules
const express = require('express')
const massive = require('massive')
const {json} = require('body-parser')
const cors = require('cors')
const session = require('express-session')
// const passport = require('passport')
// const Auth0Strategy = require('passport-auth0')
const google = require('googleapis')
const youtube = google.youtube('v3')

// imported files
const config = require('./config')
const controller = require('./controller')

// constants
const port = 3010
const afterAuthRedirect = false ? "http://localhost:3000" : "https://youtubeclone.ericcpatterson.com"
const ytApiConf = config.youtube.web


//////////////////////////////////////////////
// EXPRESS
//////////////////////////////////////////////

const app = module.exports = express()

// app.use(express.static(`../public`))

// middleware
app.use(json())
app.use(cors())

//////////////////////////////////////////////
// SESSION
//////////////////////////////////////////////

app.use(session({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false
}))


//////////////////////////////////////////////
// YOUTUBE OAUTH2
//////////////////////////////////////////////

const OAuth2 = google.auth.OAuth2
const oauth2Client = new OAuth2(
  ytApiConf.client_id, 
  ytApiConf.client_secret,
  ytApiConf.redirect_uris
  )

const scopes = [
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/userinfo.profile"
]

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
})

app.get("/login", function(req,res) {
  res.redirect(url)
})

app.get("/oauthcallback", function(req, res) {
  const code = req.query.code
  oauth2Client.getToken(code, function(err, tokens) {
    if (!err) {
      oauth2Client.setCredentials(tokens)
      req.session.tokens = tokens
      res.redirect(afterAuthRedirect)
      return
    }
    res.status(500).send(err)
  })
})


//////////////////////////////////////////////
// ENDPOINTS
//////////////////////////////////////////////

app.get('/api/youtube/video', controller.getVideosBySearch)
app.get('/api/youtube/suggested', controller.getSuggestedVideos)
app.get('/api/youtube/comments', controller.getVideoComments)
app.get('/api/youtube/commentReplies', controller.getCommentReplies)
app.get('/api/youtube/channel/:id', controller.getChannelInfo)
app.get('/api/youtube/video/:id', controller.getVideoStatsById)

app.get('/api/youtube/videoPageDetails', controller.getVideoPageDetails)


//////////////////////////////////////////////
// AUTHENTICATION ENDPOINTS
//////////////////////////////////////////////

// const isAuthed = (req,res,next) => {
//   req.session.accessToken ? next() : res.status(403).send("You ain't logged in son!")
// }

// app.get('/api/channels', isAuthed, controller.getChannels)

//////////////////////////////////////////////
// LISTEN
//////////////////////////////////////////////

app.listen(port, () => console.log(`listening on ${port}`))