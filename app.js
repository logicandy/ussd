const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030



app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//set up africastalking

const options = {
    apiKey: '3e18263a55c0f01b35a22c4be97b670ac09a126450b4d6cf39406c72b4b2164f',  
    username: 'sandbox'
};
const AfricasTalking = require('africastalking')(options);

app.get('*', (req, res) => {
  res.send('This is the working version of the ussd app ')
})


app.post('/ussd', (req, res) => {
    let {sessionId, serviceCode, phoneNumber, text} = req.body
    if (text == '') {
      // This is the first request. Note how we start the response with CON
      let response = `CON What would you want to check
      1. My Account
      2. My phone number`
      res.send(response)
    } else if (text == '1') {
      // Business logic for first level response
      let response = `CON Choose account information you want to view
      1. Account number
      2. Account balance`
      res.send(response)
    } else if (text == '2') {
      // Business logic for first level response
      let response = `END Your phone number is ${phoneNumber}`
      res.send(response)
    } else if (text == '1*1') {
      // Business logic for first level response
      let accountNumber = 'ACC1001'
      // This is a terminal request. Note how we start the response with END
      let response = `END Your account number is ${accountNumber}`
      res.send(response)
    } else if (text == '1*2') {
      // This is a second level response where the user selected 1 in the first instance
      let balance = 'NGN 10,000'
      // This is a terminal request. Note how we start the response with END
      let response = `END Your balance is ${balance}`
      res.send(response)
    } else {
      res.status(400).send('Bad request!')
    }
  })

  app.post('/gasify', (req, res) => {
    let {sessionId, serviceCode, phoneNumber, text} = req.body

    //INITIALIZE RESPONSES

    // This is the first request. Note how we start the response with CON
    let SizeResponse = `CON Welcome to Gasify, Select your cylinder size:
    1. 12kg(price)
    2. 10kg(price)
    3. 6kg(price)
    4. 5kg(price)
    5. 3kg(price)
    6. other`

    let locationResponse = `CON Kindly select your location
    1. Gwarimpa
    2. Jabi
    3. Wuse
    4. Lifecamp
    5. other`
 
    //BUSINESS LOGIC+

    if (text == '') {
      res.send(sizeResponse)
    } else if (text == '1' || text == '2' || text == '3' ||text=='4'||text=='5') {
        res.send(locationResponse)
    } else if (text == '6') {
      // Business logic for first level response
      let response = `END We currently don't support any other sizes
      ,we'll let you know once we do. thanks!`
      res.send(response)
    } else if (text == '1*1') {
      let response = `END your order has been received, you will be contacted soon for confirmation`
      res.send(response)
    }  else {
      res.status(400).send('That option is not available')
    }
  })


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
