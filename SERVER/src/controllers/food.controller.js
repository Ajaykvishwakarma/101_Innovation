const { Router } = require("express");

const Food = require('../models/food.model');

const router = Router()

router.post('/food',  async (req, res) => {
    try{
        const food = await Food.create(req.body)
        return res.status(200).send(food)
    }
    catch (error) {
        return res.status(500).send({message: error.message})
    }
})

router.get('/food/:id',  async(req, res) => {
    try{
        const food = await Food.findById(req.params.id).lean().exec()
        return res.status(200).send(food)

    } catch(error) {
        return res.status(500).send({message : error.message})
    }

})

router.delete("/food/:id", async (req, res) => {
    try {
      const food = await Food.findByIdAndDelete(req.params.id).lean().exec();
  
      res.status(200).send(food);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });

router.get('/foods',  async(req, res) => {
    try{
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        let totalPages = 0;
        let food
        if(req.query.q) {
            if(req.query.q == 'sort')
            {
                food = await Food.find().skip((page - 1) * limit).limit(limit).lean().exec()
                const totalDocs = await Food.find().countDocuments()
                totalPages = (Math.ceil(totalDocs/limit))
                food = req.query.sort == 1 ? food.sort((a,b) => (a.energy_100g - b.energy_100g)): food.sort((a,b)=>(-a.energy_100g + b.energy_100g))

            } 
            else if(req.query.q == 'filter')
            {
                food = await Food.find({creator: req.query.base}).skip((page - 1) * limit).limit(limit).lean().exec()
                const totalDocs = await Food.find({creator: req.query.base}).countDocuments()
                totalPages = (Math.ceil(totalDocs/limit))
            }
            else
                {
                    food = await Food.find({product_name : req.query.block}).skip((page - 1) * limit).limit(limit).lean().exec()
                    const totalDocs = await Food.find({product_name : req.query.block}).countDocuments()
                    totolPages = (Math.ceil(totalDocs/limit))
                }
        }
        else{
            food = await Food.find().skip((page - 1) * limit).limit(limit).lean().exec()
            const totalDocs = await Food.find().countDocuments()
            totalPages = (Math.ceil(totalDocs/limit))

        }
        let arr = []
        for(let i = 1; i<=totalPages; i++)
        {
            arr.push(i)

        }
        return res.status(200).send({food, totalPages:arr})
    } catch (error) {
        return req.status(500).send({message : error.message})
    }
})
module.exports = router;