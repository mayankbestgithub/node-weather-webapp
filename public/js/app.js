//console.log('I am inside app.js from public folder');




var searchLocation = document.querySelector("input");
var searchButton = document.querySelector("button");

var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2'); 
searchButton.addEventListener('click',function(e){
    e.preventDefault();
    let location = searchLocation.value;
    messageOne.innerHTML = "Loading...";
    messageTwo.innerHTML = "";
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
            response.json().then((weatherData)=>{
                console.log(weatherData);
                messageOne.innerHTML = weatherData.location;
                messageTwo.innerHTML = weatherData.weather

            });
    
        });
});