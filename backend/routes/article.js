const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controllers/article');

router.get('/', auth, stuffCtrl.getAllArticles );
router.post('/', auth, multer, stuffCtrl.addArticle );
router.get('/:id', auth, stuffCtrl.getOneArticle );
router.put('/:id', auth, multer, stuffCtrl.modifyArticle );
router.delete('/:id', auth, stuffCtrl.deleteArticle);
// router.post('/:id/like', auth, stuffCtrl.likeSauce);



module.exports = router;