const router = require('express').Router()
const postController = require('../controllers/post.controller')


router.get('/', (req, res) => {
  return res.send("<h1>It Works</h1>")
})
router.get('/post', postController.all)
router.get('/post/:id', postController.detail)
router.post('/post', postController.store)

module.exports = router