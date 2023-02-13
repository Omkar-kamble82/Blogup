const express = require('express')
const {
    getBlogs, 
    getBlog, 
    createBlog, 
    deleteBlog, 
    updateBlog
} = require('../controllers/blogController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)
router.get('/', getBlogs)
router.get('/:id', getBlog)
router.post('/', createBlog)
router.delete('/:id', deleteBlog)
router.patch('/:id', updateBlog)

module.exports = router