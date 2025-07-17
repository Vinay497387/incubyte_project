const express = require('express');
const router = express.Router();
const Sweet = require('../models/Sweet'); 


async function getSweet(req, res, next) {
    let sweet;
    try {
        
        sweet = await Sweet.findOne({ id: req.params.id });
        if (sweet == null) {
            
            return res.status(404).json({ message: 'Cannot find sweet' });
        }
    } catch (err) {
        
        return res.status(500).json({ message: err.message });
    }
    
    res.sweet = sweet;
    next(); 
}


router.get('/', async (req, res) => {
    try {
        const sweets = await Sweet.find(); 
        res.json(sweets); 
    } catch (err) {
        
        res.status(500).json({ message: err.message });
    }
});


router.get('/:id', getSweet, (req, res) => {
    
    res.json(res.sweet);
});


router.post('/', async (req, res) => {
    
    const { id, name, category, price, quantity } = req.body;

    
    if (!id || !name || !category || price === undefined || quantity === undefined) {
        return res.status(400).json({ message: 'All fields (id, name, category, price, quantity) are required.' });
    }

    try {
        
        const existingSweet = await Sweet.findOne({ id });
        if (existingSweet) {
            return res.status(409).json({ message: 'Sweet with this ID already exists.' });
        }

        
        const sweet = new Sweet({
            id,
            name,
            category,
            price,
            quantity
        });

        
        const newSweet = await sweet.save();
        
        res.status(201).json(newSweet);
    } catch (err) {
        
        res.status(400).json({ message: err.message });
    }
});


router.patch('/:id', getSweet, async (req, res) => {
    
    if (req.body.name != null) {
        res.sweet.name = req.body.name;
    }
    if (req.body.category != null) {
        res.sweet.category = req.body.category;
    }
    if (req.body.price != null) {
        res.sweet.price = req.body.price;
    }
    if (req.body.quantity != null) {
        res.sweet.quantity = req.body.quantity;
    }
    try {
        
        const updatedSweet = await res.sweet.save();
        res.json(updatedSweet); 
    } catch (err) {

        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', getSweet, async (req, res) => {
    try {
        
        await Sweet.deleteOne({ id: req.params.id });
        res.json({ message: 'Sweet deleted' }); 
    } catch (err) {
        
        res.status(500).json({ message: err.message });
    }
});


router.patch('/:id/purchase', getSweet, async (req, res) => {
    
    if (res.sweet.quantity <= 0) {
        return res.status(400).json({ message: 'Not enough stock available for purchase.' });
    }
    res.sweet.quantity -= 1; 
    try {
        const updatedSweet = await res.sweet.save();
        res.json(updatedSweet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.patch('/:id/restock', getSweet, async (req, res) => {
   
    res.sweet.quantity += 1;
    try {
        const updatedSweet = await res.sweet.save();
        res.json(updatedSweet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get('/search', async (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query; 
    let query = {}; 

    
    if (name) {
        query.name = { $regex: name, $options: 'i' }; 
    }
    if (category) {
        query.category = { $regex: category, $options: 'i' }; 
    }
    if (minPrice || maxPrice) {
        query.price = {}; 
        if (minPrice) {
            query.price.$gte = parseFloat(minPrice); 
        }
        if (maxPrice) {
            query.price.$lte = parseFloat(maxPrice); 
        }
    }

    try {
        const sweets = await Sweet.find(query); 
        res.json(sweets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
