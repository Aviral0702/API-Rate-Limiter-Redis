import express from 'express';

const router = express.Router();

router.post('/testing',(req,res)=>{
    res.json({message:"API is working"});
})

export default router;