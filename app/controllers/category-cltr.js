const Category=require('../models/category-model')
const { validationResult } = require('express-validator')


const categoryCltr={}

categoryCltr.list=async(req,res)=>{
    try
    {
        const category=await Category.find()
        res.json(category)

    }
    catch(e){
        res.status(500).json(e)

    }
}

// categoryCltr.create = async (req, res) => {
//     const errors = validationResult(req) 
//     if(!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//     }
//     const body = req.body 
//     const categoryObj = await Category.findOne({ name: { '$regex' : body.name, $options: 'i' } })
//     if(!categoryObj) {
//         const category = new Category(body) 
//         try {
//             await category.save()
//             res.json(category)
//         } catch(e) {
//             res.status(500).json(e)
//         }
//     } else {
//         res.status(204).json({ error: 'category already present'})
//     }
// }


categoryCltr.create = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body 
    const category = new Category(body) 
    try {
        await category.save()
        res.json(category)
    } catch(e) {
        res.status(500).json(e)
    }
}


module.exports = categoryCltr