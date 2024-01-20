import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {auth} from 'express-oauth2-jwt-bearer'
require('dotenv').config()

const jwtCheck = auth({
	audience: process.env.AUDIENCE,
	issuerBaseURL: process.env.ISSUER_BASE_URL,
	tokenSigningAlg: process.env.TOKEN_SIGNING_ALG,
})

const app = express()
//app.use(jwtCheck)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.send('Hello World from unsecured endpoint!')
})

app.get('/secured', jwtCheck, (req, res) => {
	res.send('Hello World from secured endpoint!')
})

app.listen(3100, () => {
	console.log('Server is listening on port 3100')
})
