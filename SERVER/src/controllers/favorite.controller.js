const { Router } = require("express")

const Favorite = require('../models/favorite.model');

const router = Router();

router.post('/favorite',  async (req, res) => {
    try{
        const favorite = await Favorite.create(req.body)
        return res.status(200).send(favorite)
    }
    catch (error) {
        return res.status(500).send({message: error.message})
    }
})

router.get('/favorite/:id',  async(req, res) => {
    try{
        const favorite = await Favorite.findById(req.params.id).lean().exec()
        return res.status(200).send(favorite)

    } catch(error) {
        return res.status(500).send({message : error.message})
    }

})

router.delete("/favorite/:id", async (req, res) => {
    try {
      const favorite = await Favorite.findByIdAndDelete(req.params.id).lean().exec();
  
      res.status(200).send(favorite);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });

router.get('/favorites',  async(req, res) => {
    try{
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        let totalPages = 0;
        let favorite
        if(req.query.q) {
            if(req.query.q == 'sort')
            {
                favorite = await Favorite.find().skip((page - 1) * limit).limit(limit).lean().exec()
                const totalDocs = await Favorite.find().countDocuments()
                totalPages = (Math.ceil(totalDocs/limit))
                favorite = req.query.sort == 1 ? favorite.sort((a,b) => (a.energy_100g - b.energy_100g)): favorite.sort((a,b)=>(-a.energy_100g + b.energy_100g))

            } 
            else if(req.query.q == 'filter')
            {
                favorite = await Favorite.find({creator: req.query.base}).skip((page - 1) * limit).limit(limit).lean().exec()
                const totalDocs = await Favorite.find({creator: req.query.base}).countDocuments()
                totalPages = (Math.ceil(totalDocs/limit))
            }
            else
                {
                    favorite = await Favorite.find({product_name : req.query.block}).skip((page - 1) * limit).limit(limit).lean().exec()
                    const totalDocs = await Favorite.find({product_name : req.query.block}).countDocuments()
                    totolPages = (Math.ceil(totalDocs/limit))
                }
        }
        else{
            favorite = await Favorite.find().skip((page - 1) * limit).limit(limit).lean().exec()
            const totalDocs = await Favorite.find().countDocuments()
            totalPages = (Math.ceil(totalDocs/limit))

        }
        let arr = []
        for(let i = 1; i<=totalPages; i++)
        {
            arr.push(i)

        }
        return res.status(200).send({favorite, totalPages:arr})
    } catch (error) {
        return req.status(500).send({message : error.message})
    }
})
module.exports = router;