require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
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

function formSubmission(document/*, list*/,event, pilot, copilot, fuelLevel, cargoLevel) {

    if(validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
        alert('All fields are required!');
        event.preventDefault();
    } else if(validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number' || validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert('Make sure to enter valid information for each field!')
        event.preventDefault();
    } else {

        document.getElementById('pilotStatus').innerHTML = `Pilot ${pilot} is ready for launch`
        document.getElementById('copilotStatus').innerHTML = `Co-pilot ${copilot} is ready for launch`

        let list = document.getElementById('faultyItems')
        let fuelStatus = document.getElementById('fuelStatus')
        let cargoStatus = document.getElementById('cargoStatus')
        let launchStatus = document.getElementById('launchStatus')

        if(fuelLevel < 10000 && cargoLevel > 10000) {
            fuelStatus.innerHTML = 'Fuel level too low for launch';
            cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'rgb(199, 37, 78)';
        
        } else if (fuelLevel < 10000 && cargoLevel < 10000) {
            fuelStatus.innerHTML = 'Fuel level too low for launch';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'rgb(199, 37, 78)';
            
        } else if(fuelLevel > 10000 && cargoLevel > 10000) {
            fuelStatus.innerHTML = 'Fuel level high enough for launch';
            cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'rgb(199, 37, 78)';
            
        } else if (cargoLevel > 10000) {
            fuelStatus.innerHTML = 'Fuel level high enough for launch';
            cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
            launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
            launchStatus.style.color = 'rgb(199, 37, 78)';
        } else {
            fuelStatus.innerHTML = 'Fuel level high enough for launch';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
            launchStatus.innerHTML = 'Shuttle is Ready for Launch';
            launchStatus.style.color = 'rgb(65, 159, 106)';
            list.style.visibility = 'hidden'
        }

        list.style.visibility = 'visible';
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
