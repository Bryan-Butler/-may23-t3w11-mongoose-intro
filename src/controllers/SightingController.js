const express = require('express');
const {Sighting} = require('../models/SightingModel');
const router = express.Router();

// Find all sightings in the Database
router.get('/', async(request, response) => {
    let result = await Sighting.find();

    response.json({
        sightings: result,
    })
})

router.get('/search/:location', async(request, response) =>{
    let result = await Sighting.find({location: request.params.location}).populate('user', '-password');
    response.json({
        sightings: result
    })
})

//create a new sighting in the db
router.post('/', async(request, response) =>{
    let result = await Sighting.create(request.body).catch(error =>{return error});
    result = await result.populate('pets');
    result = await result.populate('user', 'username');

    response.json({
        sightings: result,
    })
})

//update a sighting by id
router.patch('/:id', async(request, response) =>{
    request.body.time = new Date(Date.now());
    let result =  await Sighting.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
            returnDocument: 'after',
            upsert:true
        }
    ).catch(error => error);

    response.json({
        updatedSighting: result
    })
})

//delete a sighting by id
router.delete('/:id', async(request, response) => {
    let result = await Sighting.findByIdAndDelete(request.params.id).populate('user cats', '-passowrd');

    response.json({
        deletedSighting: result
    })
})

module.exports = router;