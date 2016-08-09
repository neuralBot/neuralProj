var express = require('express');
var async = require('async');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var app     = express();
var url = require( "url" );
var http = require('http');
var stock = [ 'OISHI',
'ORI',
'PACE',
'PAE',
'PAF',
'PAP',
'PATO',
'PB',
'PCSGH',
'PDI',
'PE',
'PERM',
'PF',
'PG',
'PK',
'PL',
'PLANB',
'PLAT',
'PLE',
'PM',
'PMTA',
'POLAR',
'POMPUI',
'POPF',
'POST',
'PPF',
'PPP',
'PR',
'PRAKIT',
'PRANDA',
'SF',
'SFP',
'SGF',
'SGP',
'SHANG',
'SIAM',
'SIM',
'SINGER',
'SIRI',
'SIRIP',
'SIS',
'SITHAI',
'SKR',
'SLP',
'SMC',
'SMG',
'SMIT',
'SMK',
'SMM',
'SMPC',
'SMT',
'SNC',
'SNP',
'SOLAR',
'SORKON',
'SPACK',
'SPALI',
'SPC',
'SPCG',
'SPF',
'THREL',
'TIC',
'TICON',
'TIF1',
'TIP',
'TIPCO',
'TISCO',
'TIW',
'TK',
'TKN',
'TKS',
'TKT',
'TLGF',
'TLHPF',
'TLOGIS',
'TLUXE',
'TMB',
'TMD',
'TMT',
'TNITY',
'TNL',
'TNPC',
'TNPF',
'TOG',
'TOP',
'TOPP',
'TPA',
'TPC',
'TPCORP',
'TPIPL',
'WHABT',
'WHAPF',
'WHART',
'WICE',
'WIIK',
'WIN',
'WORK',
'WORLD',
'WP',
'WR',
'YCI',
'YNP',
'ZMICO',
'M-CHAI',
'M-II',
'M-PAT',
'M-STOR',
'MACO',
'MAJOR',
'MAKRO',
'MALEE',
'MANRIN',
'MATCH',
'MATI',
'MAX',
'MBK',
'MBKET',
'MC',
'MCOT',
'MCS',
'MDX',
'MEGA',
'METCO',
'MFC',
'MFEC',
'MIDA',
'MILL',
'MINT',
'MIPF',
'MIT',
'MJD',
'MJLF',
'MK',
'AQUA',
'AS',
'ASEFA',
'ASIA',
'ASIAN',
'ASIMAR',
'ASK',
'ASP',
'AYUD',
'BA',
'BAFS',
'BANPU',
'BAT-3K',
'BAY',
'BBL',
'BCH',
'BCP',
'BDMS',
'BEAUTY',
'BEC',
'BEM',
'BFIT',
'BH',
'BIG',
'BIGC',
'BJC',
'BJCHI',
'BKI',
'BKKCP',
'BLA',
'CMR',
'CNS',
'CNT',
'COL',
'COM7',
'CPALL',
'CPF',
'CPH',
'CPI',
'CPL',
'CPN',
'CPNCG',
'CPNRF',
'CPTGF',
'CRANE',
'CRYSTAL',
'CSC',
'CSL',
'CSP',
'CSR',
'CSS',
'CTARAF',
'CTW',
'CWT',
'DCC',
'DCON',
'DELTA',
'DEMCO',
'DIF',
'DRACO',
'SPG',
'SPI',
'SPORT',
'SPPT',
'SPRC',
'SPWPF',
'SRICHA',
'SSC',
'SSF',
'SSI',
'SSPF',
'SSSC',
'SST',
'SSTPF',
'SSTSS',
'STA',
'STANLY',
'STEC',
'STHAI',
'STPI',
'SUC',
'SUPER',
'SUSCO',
'SUTHA',
'SVH',
'SVI',
'SVOA',
'SYMC',
'SYNEX',
'SYNTEC',
'FUTUREPF',
'GBX',
'GC',
'GEL',
'GENCO',
'GFPT',
'GJS',
'GL',
'GLAND',
'GLOBAL',
'GLOW',
'GOLD',
'GOLDPF',
'GPSC',
'GRAMMY',
'GRAND',
'GREEN',
'GSTEL',
'GUNKUL',
'GYT',
'HANA',
'HEMRAJ',
'HFT',
'HMPRO',
'HPF',
'HTC',
'ICC',
'ICHI',
'IEC',
'IFEC',
'TPOLY',
'TPP',
'TPROP',
'TR',
'TRC',
'TREIT',
'TRIF',
'TRS',
'TRU',
'TRUBB',
'TRUE',
'TSC',
'TSI',
'TSR',
'TSTE',
'TSTH',
'TT',
'TT&T',
'TTA',
'TTCL',
'TTI',
'TTL',
'TTLPF',
'TTTM',
'TTW',
'TU',
'TU-PF',
'TUCC',
'TVI',
'TVO',
'DRT',
'DSGT',
'DTAC',
'DTC',
'DTCI',
'DTCPF',
'EARTH',
'EASON',
'EASTW',
'ECL',
'EE',
'EGATIF',
'EGCO',
'EIC',
'EMC',
'EPCO',
'EPG',
'ERW',
'ERWPF',
'ESSO',
'ESTAR',
'EVER',
'F&D',
'FANCY',
'FE',
'FER',
'FMT',
'FNS',
'FORTH',
'FSS',
'ROJNA',
'RPC',
'RS',
'S',
'S & J',
'S11',
'SABINA',
'SAFARI',
'SAM',
'SAMART',
'SAMCO',
'SAMTEL',
'SAPPE',
'SAT',
'SAUCE',
'SAWAD',
'SAWANG',
'SBPF',
'SC',
'SCAN',
'SCB',
'SCC',
'SCCC',
'SCG',
'SCI',
'SCN',
'SCP',
'SE-ED',
'SEAFCO',
'SENA',
'PREB',
'PRECHA',
'PRG',
'PRIN',
'PRINC',
'PRO',
'PS',
'PSL',
'PT',
'PTG',
'PTL',
'PTT',
'PTTEP',
'PTTGC',
'PYLON',
'Q-CON',
'QH',
'QHHR',
'QHOP',
'QHPF',
'RAM',
'RATCH',
'RCI',
'RCL',
'RICH',
'RICHY',
'RML',
'ROBINS',
'ROCK',
'ROH',
'A',
'AAV',
'ABC',
'ABPIF',
'ACC',
'ADVANC',
'AEC',
'AEONTS',
'AFC',
'AH',
'AHC',
'AI',
'AIT',
'AJ',
'AJD',
'AKR',
'ALUCON',
'AMANAH',
'AMARIN',
'AMATA',
'AMATAR',
'AMATAV',
'AMC',
'ANAN',
'AOT',
'AP',
'APCS',
'APURE',
'APX',
'AQ',
'BLAND',
'BLISS',
'BR',
'BRC',
'BROCK',
'BRR',
'BSBM',
'BTC',
'BTNC',
'BTS',
'BTSGIF',
'BUI',
'BWG',
'CBG',
'CCET',
'CCP',
'CEN',
'CENTEL',
'CFRESH',
'CGD',
'CGH',
'CHARAN',
'CHG',
'CHOTI',
'CI',
'CIMBT',
'CITY',
'CK',
'CKP',
'CM',
'IFS',
'IHL',
'ILINK',
'IMPACT',
'INET',
'INOX',
'INSURE',
'INTUCH',
'IRC',
'IRPC',
'IT',
'ITD',
'IVL',
'J',
'JAS',
'JASIF',
'JCP',
'JCT',
'JMART',
'JMT',
'JTS',
'JUTHA',
'JWD',
'KAMART',
'KBANK',
'KBS',
'KC',
'KCAR',
'KCE',
'KDH',
'TWP',
'TWPC',
'TWZ',
'TYCN',
'U',
'UMI',
'UNIPF',
'UNIQ',
'UOB8TF',
'UOBKH',
'UP',
'UPF',
'UPOIC',
'URBNPF',
'UT',
'UTP',
'UV',
'UVAN',
'VARO',
'VGI',
'VI',
'VIBHA',
'VIH',
'VNG',
'VNT',
'VPO',
'WACOAL',
'WAVE',
'WG',
'WHA',
'TAE',
'TASCO',
'TBSP',
'TC',
'TCAP',
'TCB',
'TCC',
'TCCC',
'TCIF',
'TCJ',
'TCMC',
'TCOAT',
'TEAM',
'TF',
'TFD',
'TFG',
'TFI',
'TFUND',
'TGCI',
'TGPRO',
'TGROWTH',
'TH',
'THAI',
'THANI',
'THCOM',
'THE',
'THIF',
'THIP',
'THL',
'THRE',
'ML',
'MNIT',
'MNIT2',
'MNRF',
'MODERN',
'MONO',
'MONTRI',
'MPIC',
'MSC',
'MTI',
'MTLS',
'NC',
'NCH',
'NEP',
'NEW',
'NFC',
'NKI',
'NMG',
'NNCL',
'NOBLE',
'NOK',
'NPP',
'NSI',
'NTV',
'NUSA',
'NWR',
'NYT',
'OCC',
'OGC',
'OHTL',
'KGI',
'KKC',
'KKP',
'KPNPF',
'KSL',
'KTB',
'KTC',
'KTECH',
'KTIS',
'KTP',
'KWC',
'KYE',
'L&E',
'LALIN',
'LANNA',
'LEE',
'LH',
'LHBANK',
'LHHOTEL',
'LHK',
'LHPF',
'LHSC',
'LOXLEY',
'LPH',
'LPN',
'LRH',
'LST',
'LTX',
'LUXF',
'M' ];

//br
var stock2 = [ 'QH'];

var str = "";
var bad_500 = 0;
var date = [
  [ "OISHI","2558", "2560"],
  [ "OISHI","2556", "2558"],
  [ "OISHI","2552", "2554"],
  [ "OISHI","2550", "2552"],
  [ "OISHI","2548", "2550"]
];
function findTextAndReturnRemainder(target, variable){
    var chopFront = target.substring(target.search(variable)+variable.length,target.length);
    var result = chopFront.substring(0,chopFront.search(";"));
    return result;
}

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

var asyncTasks = [];

var loop=0;
var number = 0;
//for(loop=0;loop<=date.length-1;loop++){
//var name = 'OISHI';
var num_file = 0;
async.each(date, function (name, callback) {
  
  var urlstring = "http://www.setsmart.com/ism/historicalTrading.html?lstDisplay=T&symbol="+name[0]+"&locale=th_TH&submit=go&lstMethod=AOM&submit.y=13&decorator=html&submit.x=24&showBeginDate=1%2F01%2F"+name[1]+"&lstPeriod=D&endDate=01%2F01%2F"+name[2]+"&beginDate=01%2F01%2F"+name[1]+"&quickPeriod=&showEndDate=01%2F01%2F"+name[2];
  console.log(urlstring);
  var parsedurl = url.parse( urlstring );
  var options = {
    hostname: parsedurl.hostname,
    port: ( parsedurl.port || 80 ), // 80 by default
    method: 'GET',
    path: parsedurl.path,
    headers: { 
      'Host': 'www.setsmart.com'
    },
  };

  var cookies = [
    "JSESSIONID=53F9704C919D218FF9136063655ACB34.setsmartweb01",
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
          //console.log(data);

          //ประวัติ
          /*$('table.tfont tr td.table').filter(function(){
                var cdata = $(this).text();
                cdata = cdata.replace(/\s+/g, " ")
               .replace(/[^a-zA-Z_ก-๙0-9.-_,:"'()]/g, " ")
               .toLowerCase();;
                console.log("DATA : " + cdata);
            })*/
           $('script').filter(function(){
                var result = "";
                var cdata = $(this).text();
                var n = cdata.search("myData");
                //console.log(cdata);
                if(n!=-1)
                {
                  
                  //var test = "['2016-07-12','5.3','5.35','5.35','5.2','5.25','-0.04999999999999982','-0.943396226415091','5.266240710261006','5.25','5.3','87246.8','459.46265','87247.167','459.46459815','37462.8422805','10.31','1.95','42.81999969482422','1.2200000286102295','0.5','7135779.482','',''],['2016-07-11','5.3','5.3','5.4','5.3','5.3','0.0','0.0','5.330197099712879','5.3','5.35','79792.1','425.30762','79792.426','425.30936010000005','37819.6312546','10.4','1.97','42.439998626708984','1.1200000047683716','0.5','7135779.482','',''],['2016-07-08','5.45','5.4','5.45','5.3','5.3','-0.15000000000000036','-2.752293577981658','5.356699027033','5.3','5.35','148422.3','795.05359','158422.667','848.5555651','37807.7124609','10.4','1.97','42.439998626708984','2.2200000286102295','0.5','7133530.653','','']";
                  var result = cdata.split(";");
                  result = result[4].substring(result[4].indexOf("["), result[4].length);
                  //console.log("DATA : " + result);
                  var res = result.replace(/'/g, "\"");
                  var arr = JSON.parse(res);
                  var i=0;
                  var d = new Date();
                  var n = d.toJSON();
                  var metadata = [];
                  for(i=0;i<=arr.length-1;i++){
                  metadata[i] = {
                      Name: name,
                      TimeAdd:n,
                      Date: arr[i][0],
                      Prior: arr[i][1],
                      Open: arr[i][2],
                      High: arr[i][6],
                      Low: arr[i][4],
                      Close: arr[i][5],
                      Chg: arr[i][6],
                      ChgPercent: arr[i][7],
                      Avg: arr[i][8],
                      Bid: arr[i][9],
                      Offer: arr[i][10],
                      AOMVolume: arr[i][11],
                      AOMValue: arr[i][12],
                      TotalVolume: arr[i][13],
                      TotalValue: arr[i][14],
                      MarketCap: arr[i][15],
                      PE: arr[i][16],
                      PBV: arr[i][17],
                      DividendYield: arr[i][18],
                      TurnOverRatio: arr[i][19],
                      Par: arr[i][20],
                      ListShares: arr[i][21],
                      TradingSign: arr[i][22],
                      BenefitSign: arr[i][23],
                    };
                  }
                  console.log(name[0]);
                  //calculate(array,name);
                  num_file++;
                  fs.writeFile('data_price/'+name[0]+num_file+'.json', JSON.stringify(metadata, null, 4), function(err){
                    console.log('Success! - your file is '+name[0]+num_file+'.json , Please check in your directory ');
                  });
                  callback();
                }
            })
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

//} //end for 

/*var contents = fs.readFileSync("test0.json");
var jsonContent = JSON.parse(contents);

console.log("JSON = "+contents);*/
var metadata = {};

var all = {
  valueStock : 0,
  valueallPattern : 0,
};

var money_start = 1000000;

var objpatt = [];

objpatt[0] = 
  {
  patt : "uu",
  value : 0,
  up : 0,
  down : 0,
  eq : 0,
  total : [[1,-12.5],[3,12],[2,-1],[4,4]]
  };

objpatt[0].total.sort(sortFunction);

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

objpatt[1] = 
{
  patt : "de",
  value : 0,
  up : 0,
  down : 0,
  eq : 0
};

console.log("PAT : "+objpatt.patt);

function calculate(arr,name){
  all.valueStock++;
  var i = 0;
  var start = arr.length-1;
  for(i=start-2;i>=1;i--) //เริ่มจากวันแรกสุก , index หลังสุด
  {
    all.valueallPattern++;
    if( (arr[i][5] > arr[i+1][5] ) && (arr[i+1][5] > arr[i+2][5])) //วันแรกน้อยกว่าวันถัดมา upup
    {
      objpatt[0].value++;
      if(arr[i-1][5]>arr[i][5]){
        objpatt[0].up++;
      }else if(arr[i-1][5]<arr[i][5]){
        objpatt[0].down++;
      }else{
        objpatt[0].eq++;
      }
    }
    if( (arr[i][5] < arr[i+1][5] ) && (arr[i+1][5] == arr[i+2][5])) // equaldown
    {
      money_start-=1000000;
      money_start+=1000000+((1000000*arr[i-1][7])/100);
      console.log("BUY : "+name+" 100000 B at "+arr[i][5]+"B date : "+arr[i][0]+" sell "+(100000+(100000*arr[i-1][7])/100)+"B at "+arr[i-1][5]+"B date : "+arr[i-1][0]+" total money "+money_start );
      
      objpatt[1].value++;
      if(arr[i-1][5]>arr[i][5]){
        objpatt[1].up++;
      }else if(arr[i-1][5]<arr[i][5]){
        objpatt[1].down++;
      }else{
        objpatt[1].eq++;
      }
    }
  }
  console.log(all);
  console.log(objpatt);
  console.log("patt : uu \nday4up : "+((100/objpatt[0].value)*objpatt[0].up)+"%");
  console.log("d4down : "+((100/objpatt[0].value)*objpatt[0].down)+"%");
  console.log("d4eq : "+((100/objpatt[0].value)*objpatt[0].eq)+"%");
  
  console.log("\npatt : de \nday3up : "+((100/objpatt[1].value)*objpatt[1].up)+"%");
  console.log("d3down : "+((100/objpatt[1].value)*objpatt[1].down)+"%");
  console.log("d3eq : "+((100/objpatt[1].value)*objpatt[1].eq)+"%");
  console.log(objpatt[0].total);
}

app.listen('8081') 
// ใช้ port 8081
exports = module.exports = app; 	


