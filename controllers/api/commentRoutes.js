const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res)=>{
    try{
    const commentData= await Comment.findAll({});
        res.json(commentData);
       
} catch (err){
    console.log(err);
    res.status(500).json(err);
}
});

router.get('/:id', async(req,res)=>{
    try{
        const commentData= await Comment.findAll({
            where: {
                id: req.params.id
            }
        })
        res.json(commentData);
    } 
        catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/', withAuth, async(req,res)=>{
    try{
        if (req.session){
        const commentData= await Comment.create({
           ...req.body,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        res.json(commentData);
        
    } 
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
    router.delete('/:id', withAuth, async (req,res)=>{
        try{
            const commentData= await Comment.destroy({
                Where:{
                id:req.params.id,
            }});
            if(!commentData){
                res.status(404).json({message: 'No comment with this id.'});
                
            }
            res.json(commentData)
        } catch (err){
            console.log(err);
            res.status(500).json(err);
        }
            
        });   
        // router.put('/:id', withAuth, async (req,res)=>{
        //     try{
        //         const commentData= await Comment.update({
        //             comment_text: req.body.comment_text},
        //             {
        //             Where:{
        //             id:req.params.id,
        //         }});
        //         if(!commentData){
        //             res.status(404).json({message: 'No comment with this id.'});
                    
        //         }
        //         res.json(commentData)
        //     } catch (err){
        //         console.log(err);
        //         res.status(500).json(err);
        //     }
                
        //     });  
    



module.exports = router;