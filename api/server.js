const express = require('express');
const cors = require('cors');
const { expressjwt: jwt } = require("express-jwt");
const jwks = require('jwks-rsa');
const axios = require('axios');

const app = express()
app.use(cors())

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://nextbeststory.us.auth0.com/.well-known/jwks.json'
}),
audience: 'testingauthapistuff',
issuer: 'https://nextbeststory.us.auth0.com/',
algorithms: ['RS256']
}).unless({path: ['/']})

app.use(jwtCheck)

const protected = [
  {
    test: 'test'
  }
]


app.get('/', (req, res) => {
  res.send('unprotected')
})

app.get('/protected', (req, res) => {
  res.send(protected)
})

app.listen(4000, () => console.log('Server on port 8000 '))