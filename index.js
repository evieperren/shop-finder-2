require('dotenv').config()
const server = require('./src')

if(process.env.NODE_ENV === 'develop'){
  server.listen((process.env.DEV_PORT), ()=> {console.log(`listening on ${process.env.DEV_PORT}`)})

} else if (process.env.NODE_ENV === 'production') {
  server.listen((process.env.PROD_PORT), ()=> {console.log(`listening on ${process.env.PROD_PORT}`)})
  
} else {
  console.log(new Error('Sorry unable to connect to API'))
}