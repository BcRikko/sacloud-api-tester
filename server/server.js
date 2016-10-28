const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const port = process.env.PORT || 3000
const router = express.Router()

router.use((req, res, next) => {
  console.log('Something is happening.')
  next()
})

router.post('/', require('./root'))
app.use('/', router)

app.listen(port)
console.log(`listen on port ${port}`)
