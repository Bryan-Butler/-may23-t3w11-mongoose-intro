const express = require('express');
const router = express.Router();
const { Pet } = require('../models/PetModel');

// finds all pets in the db
router.get('/all', async (request, response) =>{
    
    let result = await Pet.find();

    response.json({
        pets: result
    });
})

// finds one pet by its ID
router.get('/:id', async (request, response) => {
    let result = await Pet.findById(request.params.id).catch(error =>{ return "id not found"});

    response.json({
        pet: result
    });
})

//finds by name
router.get('/search/name/:name', async (request, response) => {

    console.log(request.params.name);
    let result = await Pet.find({name: request.params.name});

    response.json({
        pets: result
    });
})

// finds by type of animal
router.get('/search/type/:type', async (request, response) =>{
    let result = null;

    response.json({
        pet: result
    });
})

// create a new pet in the DB
// POST localhost:3000/pets/
router.post('/', async (request, response) => {
    /*
    try{
        let result = await Pet.create(request.body);
        catch(error){
            result = error,
        }
    }
    */
    // error handling via Promise.catch()
    let result = await Pet.Create(request.body);

    response.json({
        pet: result
    });
})

module.exports = router 