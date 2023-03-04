const db = require('../configs/db')
const models = {}

models.all = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM tbl_posts`, (err, result, fields) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}
models.detail = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM tbl_posts WHERE id=?`, [id], (err, result, fields) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}
models.store = ({title, description}) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO tbl_posts (title, description) VALUES (?,?)`, [title, description], (err, result, fields) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}

models.update = (id, body) => {
  return new Promise((resolve, reject) => {
    const statement = [body, id]
    const query = `UPDATE tbl_posts SET ? WHERE id = ?`
    db.query(query, statement, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}


module.exports = models