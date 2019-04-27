const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const utils = require('./util/utils.js');
const app = express();
app.set ('view engine','hbs');
app.set('views','template/views');
let publicPath = path.join(__dirname,'../public');
let templatePath = path.join(__dirname,'../template');
let partialsPath = path.join(__dirname,'../template/partials');
app.use(express.static(publicPath));
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
	res.render('index',{
		title:'Home',
		created_by:'xxx'
	});
})
app.get('/weather',(req,res)=>{

	if(!req.query.address){
		return res.send({
			error:'Please search the address'
		})
	}
	let address = req.query.address;
	utils.getGeocode(address,(error,{location,latitude,longitude}={})=>{
 	
 	if(error){
 		return res.send({error});
 	}
 	utils.getWeather(latitude,longitude,(forcastError,forcastData)=>{
 		if(forcastError){
 			
 			return res.send({forcastError});
 		}
 		
 		
 		res.send({
		
			location: location,
			weather: forcastData,
			address
			
		});
 	});
 });
	
	
	
});
app.get('/about',(req,res)=>{
	res.render('about',{
		title:'About',
		created_by: 'xxx',
		help_text: 'This is a dummy text'
	})
});

app.get('/help',(req,res)=>{
	res.render('help',{
		title:'Help',
		created_by: 'xxx',
		help_text: 'This is a dummy text'
	})
});

app.get('/help/*',(req,res)=>{
	res.render("404",{
		title:'404',
		created_by:'xxx',
		errorMessage: 'Article Not found'
	});
});

app.get('*',(req,res)=>{
	res.render("404",{
		title:'404',
		created_by:'xxx',
		errorMessage: 'Page Not found'
	});
});
app.listen(port,()=>{

	console.log('server started');
})