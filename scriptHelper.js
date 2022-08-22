// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
  document.getElementById('missionTarget').innerHTML = 
    `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}"></img>`
}

function validateInput(testInput) {
    if(testInput === '') {
        return 'Empty'
    } else if(isNaN(testInput)) {
        return 'Not a Number'
    } else {
        return 'Is a Number'
    }
}

function formSubmission(document,/* list,*/event, pilot, copilot, fuelLevel, cargoLevel) {

    if(validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
        alert('All fields are required!');
        event.preventDefault();
    } else if(validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number' || validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert('Make sure to enter valid information for each field!')
        event.preventDefault();
    } else {

        document.getElementById('pilotStatus').innerHTML = `${pilot} is ready for launch.`
        document.getElementById('copilotStatus').innerHTML = `${copilot} is ready for launch`

        let list = document.getElementById('faultyItems')
        let fuelStatus = document.getElementById('fuelStatus')
        let cargoStatus = document.getElementById('cargoStatus')
        let launchStatus = document.getElementById('launchStatus')

        if(fuelLevel < 10000 && cargoLevel > 10000) {
            fuelStatus.innerHTML = 'Fuel level is too low for launch';
            cargoStatus.innerHTML = 'Cargo Mass is too high for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'red';
            event.preventDefault();
        } else if (fuelLevel < 10000 && cargoLevel < 10000) {
            fuelStatus.innerHTML = 'Fuel level is too low for launch';
            cargoStatus.innerHTML = 'Cargo Mass is low enough for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'red';
            event.preventDefault();
        } else if(fuelLevel > 10000 && cargoLevel > 10000) {
            fuelStatus.innerHTML = 'Fuel level is high enough for launch';
            cargoStatus.innerHTML = 'Cargo Mass is too high for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'red';
            event.preventDefault();
        } else {
            fuelStatus.innerHTML = 'Fuel level is high enough for launch';
            cargoStatus.innerHTML = 'Cargo Mass is low enough for launch';
            launchStatus.innerHTML = 'Shuttle is ready for launch';
            launchStatus.style.color = 'green';
        }

        list.style.visibility = 'visible';
        event.preventDefault();
    }

    
};

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
