// Write your JavaScript code here!

import fetch from 'node-fetch';


window.addEventListener("load", function() {

    let list = document.getElementById('faultyItems')
    list.style.visibility = 'hidden';

    let form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        let pilot = document.getElementById('pilot').value;
        let copilot = document.getElementById('copilot').value;
        let fuelLevel = document.getElementById('fuelLevel').value;
        let cargoLevel = document.getElementById('cargoMass').value;

        formSubmission(document, /*list,*/ event, pilot, copilot, fuelLevel, cargoLevel);
        
    }) 

    myFetch();
   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
   }).then(function () {
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let planet = pickPlanet(listedPlanets);
       addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
   })
   
});

// window.addEventListener("load", function() {
//     let form = document.querySelector('form');
    
//     form.addEventListener('submit', function(event) {
//         let pilot = document.getElementById('pilot').value;
//         let copilot = document.getElementById('copilot').value;
//         let fuelLevel = document.getElementById('fuelLevel').value;
//         let cargoLevel = document.getElementById('cargoMass').value;

//         formSubmission(document, event, pilot, copilot, fuelLevel, cargoLevel);
//     })
// })