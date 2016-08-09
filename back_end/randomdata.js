var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
 
var open = 50;
var symbol = Math.floor((Math.random() * 2) + 1);
var num1 = Math.floor((Math.random() * 10) + 1);
var num2 = Math.floor((Math.random() * 3) + 1);

var data='{ "price" : [\n';

for(i=0;i<100;i++)
{
	data += '{ "open" : "'+open+'",';
	var symbol = Math.floor((Math.random() * 2) + 1);
	var num1 = Math.floor((Math.random() * 10) + 1);
	if(symbol==1)
		close = open-num1;
	else close = open+num1;
	data += '"close" : "'+close+'" },\n';
	symbol = Math.floor((Math.random() * 2) + 1);
	var num2 = Math.floor((Math.random() * 3) + 1);
	if(symbol==1)
		open = close-num2;
	else open = close+num2;
}
data = data.substring(0, data.length-2);
data += "]}";
var file_name = "output";
fs.writeFile(file_name+'.json', JSON.stringify(data, null, 4), function(err){
	        	console.log('Success! - your file is '+file_name+'.json , Please check in your directory ');
	        })

fs.readFile('output.json', function read(err, data) {
    if (err) {
        throw err;
    }
    console.log(data);   // Put all of the code here (not the best solution)         // Or put the next step in a function and invoke it
});

var myArray = [
{
"display": "JavaScript Tutorial",
"url": "http://www.w3schools.com/js/default.asp"
}
];

myArray.push({"display": "JavaScript Tutorial",
"url": "http://www.w3schools.com/js/default.asp"});