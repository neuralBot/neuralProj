var express = require('express');
var async = require('async');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var url = require( "url" );
var http = require('http');

var source = [ 'http://steamcommunity.com/market/listings/570/Exalted%20Manifold%20Paradox',
//'http://steamcommunity.com/market/listings/570/Exalted%20Manifold%20Paradox',
//'http://steamcommunity.com/market/listings/570/Manifold%20Paradox%20Bundle',
];

var source2 = [ 'http://pantip.com'];

var asyncTasks = [];

async.each(source, function (name, callback) {
  var urlstring = name;
  var parsedurl = url.parse( urlstring );
  var options = {
    hostname: parsedurl.hostname,
    port: ( parsedurl.port || 80 ), // 80 by default
    method: 'GET',
    path: parsedurl.path,
    headers: { 
    },
  };

  var cookies = [
  "steamCountry=TH%7C802defd990923d692eafe6a1ec4a2dd2",
    "sessionid=0dcd8b0f11dc99c1157b6fa7",   
    ];

  options.headers["Cookie"] = cookies.join( "; " );

  var request = http.request(
    options,
    function ( response ) {
      // display returned cookies in header
      var setcookie = response.headers["set-cookie"];
      if ( setcookie ) {
        setcookie.forEach(
          function ( cookiestr ) {
            console.log( "COOKIE:" + cookiestr );
          }
        );
      }

      var data = "";
      response.on(
        "data",
        function ( chunk ) { data += chunk; }
      );

      response.on(
        "end",
        function () {


          console.log( "STATUS:" + response.statusCode);
          console.log(data);
          $ = cheerio.load(data);
          //console.log($);
          
         /* $('div .post-pick').each(function(){
            
            //console.log($(this).text());
            var cdata = $(this).children().children().eq(1).text(); 
            console.log(cdata);

          });*/
         
           $('script').filter(function(){
                var result = "";
                var cdata = $(this).text();
                console.log(cdata);
                var n = cdata.search("var line1=");
                console.log(n);
                if(n!=-1)
                {
                  var result = cdata.split(");");
                  console.log(result);
                  //result = result[60].substring(result[60].indexOf("["), result[60].indexOf(";"));
                  console.log(result);
                  //var array = JSON.parse(result);
                  //console.log(array);
                  //calculate2(array);
  
                  callback();
                }
                
            })
        }
      );
    }
  );

  request.on(
    "error",
    function( err ) {
      console.error( "ERROR:" + err );
    }
  );

  request.end(); // let request know it is finished sending
  }, function(err) { //async
    console.log('iterating done');
});  

/*var contents = fs.readFileSync("test0.json");
var jsonContent = JSON.parse(contents);

console.log("JSON = "+contents);*/


var system = {
    "money_start": 100,
    "sum_buy": 0,
    "sum_sell": 0,
    "money_buy": 30,
    "commission": 0.15,
    "money_sell": 35,
    "mean": 0,
    "hold": 0,
    "sum_match": 0,
    "total_item": 0,
  }

function calculate2(arr){
  system.mean = 0;
  for(i=0;i<arr.length-1;i++){
    system.sum_match+=parseInt(arr[i][2]);
    system.mean+=arr[i][1];
    system.total_item++;
    if(arr[i][1]<system.money_buy&&system.hold==0){
      system.sum_buy++;
      system.money_start -= arr[i][1];
      console.log("Date : "+arr[i][0]+" Buy item at "+arr[i][1]+"$, Your money : "+system.money_start);
      system.hold = 1;
    }
    if(arr[i][1]>system.money_sell&&system.hold==1){
      system.sum_sell++;
      system.money_start += arr[i][1]*0.85;
      console.log("Date : "+arr[i][0]+" Sell item at "+arr[i][1]+"$, Your money : "+system.money_start);
      system.hold = 0;
    }
  }
  console.log("FINISH !~");
  console.log("Match"+system.sum_match);
  console.log("Mean price :"+system.mean/arr.length);
  console.log("Sum buy :"+system.sum_buy);
  console.log("Sum sell :"+system.sum_sell);
  console.log("Total money :"+system.money_start);

}



