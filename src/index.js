const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const xss = require('xss-clean')
const db = require('./configs/db')
const router = require('./routers/index')
const { PORT, DB_NAME } = require('./helpers/env')

const main = () => {
  const app = express()
  app.use(cors())
  app.use(helmet())
  app.use(xss())
  app.use(bodyParser.json())
  app.use(router)

  db.connect(async(err) =>{
    if(err){
      console.log(err);
      return
    }else{
      db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err, result) => {
        if(err){
          console.log(err);
          return
        }
        db.query(`
          CREATE TABLE IF NOT EXISTS tbl_posts (
            id INT NOT NULL AUTO_INCREMENT,
            PRIMARY KEY(id),
            title       VARCHAR(255) NOT NULL,
            description TEXT NULL
          )
        `, (err, result) => {
          if(err){
            console.log(err);
            return
          }
          console.log('db connected');
        });
      })
    }
  })

  const APP_PORT = PORT || 3000
  app.listen(APP_PORT, () => {
    console.log(`Service running at port ${APP_PORT}`)
  })
}
module.exports = main