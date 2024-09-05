const salesModel = require('../models/sales');

const SalesController = async(req,res)=>{
    try{
        const {restaurantId,item,totalCost} = req.body;

        const newSales = new salesModel({
            restaurantId,
            item,
            totalCost
        })

        await newSales.save();
        res.status(200).json({message:"Order created successfully"})

    }catch (error) {
        return res.status(500).json({ error: 'Error creating order' });
      }
}

module.exports = {SalesController};