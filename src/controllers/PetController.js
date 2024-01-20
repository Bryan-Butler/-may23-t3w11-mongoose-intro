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
    let result = await Pet.Create(request.body).catch(error => {return error});

    response.json({
        pet: result
    });
})


// find a pet by id and update it
// we need the id but also the attributres to be updated
router.patch('/:id', async (request, response) =>{
    let result = await Pet.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
            returnDocument: 'after',
            upster: true
        }
    ).catch(error => {return error})

    response.json({
        updatedPet: result
    })
})


//find pet by id and delete it
router.delete('/:id', async (request, response) => {
    await Pet.findByIdAndDelete(request.params.id).catch(error => {return "pet id not found"});
    response.json({
        message: "pet deleted"
    })
})

module.exports = router 