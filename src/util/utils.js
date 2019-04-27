const request = require('request');

const getGeocode = (address,callback)=>{

const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibWF5YW5rdCIsImEiOiJjanRtbGgxaGcwdzdnNDNxMzFjN21wMmFmIn0.iiluTn79Nv8s4F5eiFtbSA";

request({url,json:true},(error,{body})=>{
	//console.log(error);
	if(error !==null){
		callback('unable to connect to the location service',undefined);
	}else if(body.message){
		callback("Not a authorised request",undefined);
	}
	else{

		const features = body.features;
		if(features.length ==0){
			callback('the request you made could not be found',undefined);
		}else{
			const latitude = features[0].center[1];
			const longitude = features[0].center[0];
			
			callback(undefined,{
				latitude:latitude,
				longitude:longitude,
				location: features[0].place_name
			});
		}
		
	}
	
})

}

const getWeather = (lat,long,callback)=>{
  	const url ="https://api.darksky.net/forecast/9452c077363dd58747038ded33b150c6/"+lat+","+long+"?lang=en";

request({url,json:true},(err,{body})=>{

	if(err !==null){
		callback('Error occured - unable to connect with the weather service',undefined);
	}
	else if(body.code == 400){
		callback("the given location is not found",undefined);
	}
	else{
		const data = body.daily.data[0].summary+'It is currently '+body.currently.temperature + ' degrees out . There is a '+body.currently. precipProbability+ '  chance of rain.';
		callback(undefined,data);

	}
	
	

})

}

module.exports = {
	getGeocode,
	getWeather
}