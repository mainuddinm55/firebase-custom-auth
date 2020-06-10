const firebaseAdmin = require('firebase-admin')

const serviceAccount = require('./tutionmgt-firebase.json')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://tutionmgt.firebaseio.com"
})

app.get('/custom-token', (req, res, next) => {
    const uid = '12293495'
    firebaseAdmin.auth().createCustomToken(uid)
        .then(token => {
            console.log("Token: " + token)
            res.status(200).json({
                isSuccessful: true,
                token: token
            })
        })
        .catch(err => {
            console.log("Error: " + err)
            res.status(400).json({
                isSuccessful: false,
                error: err
            })
        })
})

app.listen(3000, () => {
    console.log('Server listining on port 3000')
})