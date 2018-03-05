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
  res.send('This is the gasify test version of the app')
})







app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})


//notes
// need to customize ussd fields 
// Also need to refcctor code repetition
