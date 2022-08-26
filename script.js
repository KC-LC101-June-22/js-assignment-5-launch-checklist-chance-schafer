window.addEventListener("load", function() {

    let form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        let pilot = document.getElementById('pilot').value;
        let copilot = document.getElementById('copilot').value;
        let fuelLevel = document.getElementById('fuelLevel').value;
        let cargoLevel = document.getElementById('cargoMass').value;

        formSubmission(document, /*list,*/ event, pilot, copilot, fuelLevel, cargoLevel);

        event.preventDefault();
        
    }) 

    myFetch();
   let listedPlanets;
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
   }).then(function () {
       let planet = pickPlanet(listedPlanets);
       addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
   })
   
});
