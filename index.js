require('dotenv').config()
const server = require('./src')

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'develop'){
  server.listen((process.env.PORT), ()=> {console.log(`listening on ${process.env.PORT}`)})
} else {
  console.log(new Error('Sorry unable to connect to API'))
}