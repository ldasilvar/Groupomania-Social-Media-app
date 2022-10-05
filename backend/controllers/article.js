const Article = require('../models/article');
const fs = require('fs');

//Post request to add article
exports.addArticle = (req, res, next) => {
    req.body.article = JSON.parse(req.body.article);
    const url = req.protocol + '://' + req.get('host');
    const article = new Article({
      userId: req.body.article.userId,
      fullname: req.body.article.fullname,
      title: req.body.article.title,
      post: req.body.article.post,
      imageUrl:url + '/images/' + req.file.filename, 
      // likes: 0,
      // dislikes: 0,
      });
    article.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

//Get request when a user clicks on a single sauce 
exports.getOneArticle = (req, res, next) => {
    Article.findOne({_id: req.params.id})
    .then(
      (Article) => {
        res.status(200).json(Article);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  }

  //Put request for correct user to be able to modify only their owen sauce
  exports.modifyArticle = (req, res, next) => {
    let article = new Article({ _id: req.params.id });
    if (req.file) {
      req.body.article = JSON.parse(req.body.article);
      const url = req.protocol + '://' + req.get('host');
      article = {
        _id: req.params.id,
        userId: req.body.article.userId,
        fullname: req.body.article.fullname,
        title: req.body.article.title,
        post: req.body.article.post,
        imageUrl: url + '/images/' + req.file.filename,
        
      };			
    } else {
          article= {
            _id: req.params.id,
            userId: req.body.article.userId,
            fullname: req.body.article.fullname,
            title: req.body.article.title,
            post: req.body.article.post,
            imageUrl: req.body.imageUrl,
           
          };	
        }
          Article.updateOne({_id: req.params.id}, article).then(
              () => {
                res.status(201).json({
                message: 'Article updated successfully!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
        }
    
//Post request for when users like a sauce 
// exports.likeComment = (req, res, next) => {
//       const vote = req.body.like;
//           switch(vote){
//                 //If a user clicks like on a sauce, we add the user's id to the table and increment the likes
//                 case 1 :
//                     Article.updateOne({_id : req.params.id}, {$inc : {likes : +1 },
                      
//                     $push : { usersLiked : req.body.userId}
//                   })
//                       .then(() => res.status(201).json({message : "I like this sauce vote added"}))
//                       .catch(error => res.status(500).json({error}))       
//                 break;
      
//                 //If a user clicks on the dislike button on a sauce, we add the user's id to the table and increment the dislikes
//                 case -1 :
//                   Article.updateOne({_id : req.params.id}, {
//                     $push : { usersDisliked : req.body.userId}, $inc : {dislikes : +1 }
//                   })
//                       .then(() => res.status(201).json({message : "I don't like this sauce vote added"}))
//                       .catch(error => res.status(500).json({ error }))
//                 break;
      
//                 // If the user cancels his choice: the user is removed from the table and the likes or dislikes are decremented according to the table in which he was
//                 case 0 :  
//                   Article.findOne({_id : req.params.id})
//                       .then(article => {
//                           if (article.usersLiked.includes(req.body.userId)){
//                             Article.updateOne({_id : req.params.id}, {
//                               $pull : { usersLiked : req.body.userId}, $inc : {likes : -1 }
//                             })
//                               .then(() => res.status(201).json({message : "I like this sauce vote removed"}))
//                               .catch(error => res.status(500).json({error}))
//                           }
//                           else{
//                             Article.updateOne({_id : req.params.id}, {
//                               $pull : { usersDisliked : req.body.userId}, $inc : {dislikes : -1 }
//                             })
//                               .then(() => res.status(201).json({message : "I dislike this sauce vote removed"}))
//                               .catch(error => res.status(500).json({ error }))
//                           }
      
//                       }) 
//                       .catch(error => res.status(500).json({ error}))
//                 break;  
                  
//                 default : console.log(req.body)
//             }
          
//       }
  //Delete request for when users click to delete a sauce, it also deletes the sauce image locally
  exports.deleteArticle = (req, res, next) => {
    Article.findOne({_id: req.params.id}).then(
      (article) => {
        const filename = article.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
          article.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Deleted!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
        });
      }
    );
  }
  //Get request to display all sauces
  exports.getAllArticles = (req, res, next) => {
    Article.find().then(
      (articles) => {
        res.status(200).json(articles);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }
