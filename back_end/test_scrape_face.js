var express = require('express');
var async = require('async');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var app     = express();
var url = require( "url" );
var http = require('http');

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

app.use(express.static(__dirname));//make node to read json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var str = "";
var bad_500 = 0;
date = [1];
name = "https://www.facebook.com";
async.each(date, function (name, callback) {
  
  var urlstring = "https://www.facebook.com/search/latest/?q=data&__mref=message_bubble";
  console.log(urlstring);
  var parsedurl = url.parse( urlstring );
  var options = {
    hostname: parsedurl.hostname,
    port: ( parsedurl.port || 80 ), // 80 by default
    method: 'GET',
    path: parsedurl.path,
    headers: { 
      'Host': ''
    },
  };
  var cookies = [
    "xs=2%3An_oJ7dFQHKyqUQ%3A2%3A1474355834%3A9811",
    "sb=S9FmVy1W39IRPFxxSP5Sz9HD",
    "lu=gg7c7w99f7owe4eb7gwlOHmg",
    "fr=0JZ3Sb7z7HJgjPsYH.AWWBqCLR9Jnp-UU2aImNmqCmnGU.BX4OAH.j2.AAA.0.0.BX4OJ6.AWU_Wr3m",
    "datr=89_gV7Jiiv0sqkiExHfgTf1S",
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
          console.log( "NAME:" + name );
          if(response.statusCode==500) bad_500+=1;
          console.log( "STATUS:" + response.statusCode + " bad_" + bad_500 );
          
          $ = cheerio.load(data);
        } // response.on
      );
    }
  );

  request.on(
    "error",
    function( err ) {
      console.error( "ERROR:" + err );
    }
  );

  request.end();// let request know it is finished sending
  
  }, function(err) { //async
    console.log('iterating done');
});