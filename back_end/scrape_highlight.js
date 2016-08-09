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

//ask
var stock2 = [ 'OISHI',
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
'ASIMAR'
];

var str = "";
var bad_500 = 0;

function findTextAndReturnRemainder(target, variable){
    var chopFront = target.substring(target.search(variable)+variable.length,target.length);
    var result = chopFront.substring(0,chopFront.search(";"));
    return result;
}

function cutSpace (string){
    string = string.replace(/N.M./g, "-");
    string = string.replace(/N\/A/g, "-");
    string = string.replace(/[a-zA-Z_ก-๙_:*%"'()]/g, " ").replace(/\s+/g, " ");
    return string;
}

function cutChg (string){
    string = string.replace(/%Chg/g,"/").replace(/\s+/g, " ").replace(/ - /g,"-");
    return string;
}

function clear (string){
    string = string.replace(" ","").replace(/\+/g,"");
    return string;
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

async.each(stock2, function (name, callback) {
  var urlstring = "http://www.setsmart.com/ism/companyhighlight.html?lstEndYear=2017&locale=en_US&lstBeginPeriod=Q1&symbol="+name+"&submit=go&decorator=html&submit.y=12&lstAccountPeriod=F&submit.x=26&lstCompareType=Q&lstEndPeriod=Q4&lstBeginYear=1970#";
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
    "JSESSIONID=3A8A3FDE57AFF75979988DFA1616FB34.setsmartweb02  ",
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
          console.log( "STATUS:" + response.statusCode + "bad_" + bad_500 );
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
            var metadata = [] ;
           $('td.heading-set.table').each(function(i, element){
                var Q = cutSpace($(this).text());
                newQ = Q.split("/");
                var quater = clear(newQ[0]);
                var year = clear(newQ[1]);
                
                var date = cutChg($(this).parent().next().children().text()).split("/");
                var dated = date[i];
                  
                var d = new Date();
                var n = d.toJSON();
                metadata[i] = {
                  Name:name,
                  TimeAdd:n,
                  Quarter:quater,
                  Year:year,
                  Date:dated,
                } 
                if(i==0){
                  metadata[i].Lastest = 1;
                } 
                console.log(metadata);

            })
          
          $('div.heading2').each(function(i, element){
                /*Trading*/
                var trading = $(this).next().children();
                var close = cutSpace($(trading).eq(3).text()).split(" ");
                var high = cutSpace($(trading).eq(4).text()).split(" ");
                var low = cutSpace($(trading).eq(5).text()).split(" ");
                var value = cutSpace($(trading).eq(6).text()).split(" ");
                value.splice(1,2);
                /*Statistics*/
                var market = cutSpace($(trading).eq(8).text()).split(" ");
                market.splice(1,2);
                var turnover = cutSpace($(trading).eq(9).text()).split(" ");
                var period = cutSpace($(trading).eq(10).text()).split(" ");
                period.splice(1,1);
                var PE = cutSpace($(trading).eq(11).text()).split(" ");
                PE.splice(1,1);
                var PBV = cutSpace($(trading).eq(12).text()).split(" ");
                PBV.splice(1,1);
                var BookValue = cutSpace($(trading).eq(13).text()).split(" ");
                var Yield = cutSpace($(trading).eq(14).text()).split(" ");
                /*Financial Data*/
                var AsDate = cutSpace($(trading).eq(16).text()).split(" ");
                var Cash = cutSpace($(trading).eq(17).text()).split(" ");
                Cash.splice(1,1);
                var TotalAsset = cutSpace($(trading).eq(18).text()).split(" ");
                TotalAsset.splice(1,1);
                var CurrtLiabilities = cutSpace($(trading).eq(19).text()).split(" ");
                CurrtLiabilities.splice(1,1);
                var TotalLiabilities = cutSpace($(trading).eq(20).text()).split(" ");
                TotalLiabilities.splice(1,1);
                var PaidupCap = cutSpace($(trading).eq(21).text()).split(" ");
                PaidupCap.splice(1,3);
                var Equities = cutSpace($(trading).eq(22).text()).split(" ");
                Equities.splice(1,1);
                var Sales = cutSpace($(trading).eq(23).text()).split(" ");
                Sales.splice(1,1);
                var Revenue = cutSpace($(trading).eq(24).text()).split(" ");
                Revenue.splice(1,1);
                var CostOfSales = cutSpace($(trading).eq(25).text()).split(" ");
                CostOfSales.splice(1,1);
                var EBIT = cutSpace($(trading).eq(26).text()).split(" ");
                EBIT.splice(1,1);
                var IntExpenses = cutSpace($(trading).eq(27).text()).split(" ");
                IntExpenses.splice(1,1);
                var NetProfits = cutSpace($(trading).eq(28).text()).split(" ");
                NetProfits.splice(1,1);
                var EPS = cutSpace($(trading).eq(29).text()).split(" ");
                /*Financial Ratio*/
                  /*Liquidity Ratio*/
                var CurrentRatio = cutSpace($(trading).eq(32).text()).split(" ");

                var QuickRatio = cutSpace($(trading).eq(33).text()).split(" ");

                  /*Leverage Ratio*/
                var DERatio = cutSpace($(trading).eq(35).text()).split(" ");
                DERatio.splice(1,1);
                var IntCoverage = cutSpace($(trading).eq(36).text()).split(" ");
                IntCoverage.splice(1,1);
                  /*Profitability Ratio*/
                var GrossProfitMargin = cutSpace($(trading).eq(38).text()).split(" ");

                var NetProfitsMargin = cutSpace($(trading).eq(39).text()).split(" ");

                var ReturnToAsset = cutSpace($(trading).eq(40).text()).split(" ");
                ReturnToAsset.splice(1,1);
                var ReturnToEquity = cutSpace($(trading).eq(41).text()).split(" ");
                ReturnToEquity.splice(1,1);
                  /*Activity Ratio*/
                var AccountReciveTurnover = cutSpace($(trading).eq(43).text()).split(" ");
                AccountReciveTurnover.splice(1,1);
                var AverageCollecPeriod = cutSpace($(trading).eq(44).text()).split(" ");
                AverageCollecPeriod.splice(1,1);
                var FixedAssetTurnover = cutSpace($(trading).eq(45).text()).split(" ");
                FixedAssetTurnover.splice(1,1);
                var InventoryTurnover = cutSpace($(trading).eq(46).text()).split(" ");
                InventoryTurnover.splice(1,1);
                var AvgSalePeriod = cutSpace($(trading).eq(47).text()).split(" ");
                AvgSalePeriod.splice(1,1);
                var TotalAssetTurnver = cutSpace($(trading).eq(48).text()).split(" ");  
                TotalAssetTurnver.splice(1,1);
                var j =0;
                var k =0;

              for(i=0;i<=close.length-2;i++)
              {   
              if(i%2!=0)
                {
                  metadata[j].Close = close[i];
                  metadata[j].ValueDay = value[i];
                  metadata[j].High = high[i];
                  metadata[j].Low = low[i];
                  metadata[j].Market = market[i];
                  metadata[j].TurnOver = turnover[i];
                  metadata[j].PE = PE[i];
                  metadata[j].PBV = PBV[i];
                  metadata[j].BookValue = BookValue[i];
                  metadata[j].Yield = Yield[i];

                  metadata[0].Cash = null; metadata[1].cash = null; 
                  metadata[0].TotalAsset = null; metadata[1].TotalAsset = null;
                  metadata[0].CurrtLiabilities = null; metadata[1].CurrtLiabilities = null; 
                  metadata[0].TotalLiabilities = null; metadata[1].TotalLiabilities = null;
                  metadata[0].PaidupCap = null; metadata[1].PaidupCap = null;  
                  metadata[0].Equities = null; metadata[1].Equities = null;  
                  metadata[0].Sales = null; metadata[1].Sales = null;   
                  metadata[0].Revenue = null; metadata[1].Revenue = null;
                  metadata[0].CostOfSales = null; metadata[1].CostOfSales = null;
                  metadata[0].EBIT = null; metadata[1].EBIT = null;
                  metadata[0].IntExpenses = null; metadata[1].IntExpenses = null;
                  metadata[0].NetProfits = null; metadata[1].NetProfits = null;
                  metadata[0].EPS = null; metadata[1].EPS = null;
                  metadata[0].CurrentRatio = null; metadata[1].CurrentRatio = null;
                  metadata[0].QuickRatio = null; metadata[1].QuickRatio = null;
                  metadata[0].DERatio = null; metadata[1].DERatio = null;
                  metadata[0].IntCoverage = null; metadata[1].IntCoverage = null;
                  metadata[0].GrossProfitMargin = null; metadata[1].GrossProfitMargin = null;
                  metadata[0].NetProfitsMargin = null; metadata[1].NetProfitsMargin = null;
                  metadata[0].ReturnToAsset = null; metadata[1].ReturnToAsset = null;
                  metadata[0].ReturnToEquity = null; metadata[1].ReturnToEquity = null;
                  metadata[0].AccountReciveTurnover = null; metadata[1].AccountReciveTurnover = null;
                  metadata[0].AverageCollecPeriod = null; metadata[1].AverageCollecPeriod = null;
                  metadata[0].FixedAssetTurnover = null; metadata[1].FixedAssetTurnover = null;
                  metadata[0].InventoryTurnover = null; metadata[1].InventoryTurnover = null;
                  metadata[0].AvgSalePeriod = null; metadata[1].AvgSalePeriod = null;
                  metadata[0].TotalAssetTurnver = null; metadata[1].TotalAssetTurnver = null;

                  metadata[j].cash = Cash[i-4];
                  metadata[j].TotalAsset = TotalAsset[i-4]; 
                  metadata[j].CurrtLiabilities = CurrtLiabilities[i-4];
                  metadata[j].TotalLiabilities = TotalLiabilities[i-4];
                  metadata[j].PaidupCap = PaidupCap[i-4];
                  metadata[j].Equities = Equities[i-4];
                  metadata[j].Sales = Sales[i-4];
                  metadata[j].Revenue = Revenue[i-4];
                  metadata[j].CostOfSales = CostOfSales[i-4];
                  metadata[j].EBIT = EBIT[i-4];
                  metadata[j].IntExpenses = IntExpenses[i-4];
                  metadata[j].NetProfits = NetProfits[i-4];
                  metadata[j].EPS = EPS[i-4];
                  metadata[j].CurrentRatio = CurrentRatio[i-4];
                  metadata[j].QuickRatio = QuickRatio[i-4];
                  metadata[j].DERatio = DERatio[i-4];
                  metadata[j].IntCoverage = IntCoverage[i-4];
                  metadata[j].GrossProfitMargin = GrossProfitMargin[i-4];
                  metadata[j].NetProfitsMargin = NetProfitsMargin[i-4];
                  metadata[j].ReturnToAsset = ReturnToAsset[i-4];
                  metadata[j].ReturnToEquity = ReturnToEquity[i-4];
                  metadata[j].AccountReciveTurnover = AccountReciveTurnover[i-4];
                  metadata[j].AverageCollecPeriod = AverageCollecPeriod[i-4];
                  metadata[j].FixedAssetTurnover = FixedAssetTurnover[i-4];
                  metadata[j].InventoryTurnover = InventoryTurnover[i-4];
                  metadata[j].AvgSalePeriod = AvgSalePeriod[i-4];
                  metadata[j].TotalAssetTurnver = TotalAssetTurnver[i-4];

                  j++;
                }
              else if(i%2 ==0 && k<=metadata.length-1)
                {
                  metadata[k].Closechg = close[i+2];
                  metadata[k].ValueDaychg = value[i+2];
                  metadata[k].Highchg = high[i+2];
                  metadata[k].Lowchg = low[i+2];
                  metadata[k].Marketchg = market[i+2];
                  metadata[k].Turnoverchg = turnover[i+2];
                  metadata[k].PEchg = PE[i+2];
                  metadata[k].PBVchg = PBV[i+2];
                  metadata[k].Yieldchg = Yield[i+2];
                  
                  metadata[k].BookValuechg = BookValue[i+2];
                  metadata[0].Cashchg = null; metadata[1].cashchg = null;
                  metadata[0].TotalAssetchg = null; metadata[1].TotalAssetchg = null;
                  metadata[0].CurrtLiabilitieschg = null; metadata[1].CurrtLiabilitieschg = null;
                  metadata[0].TotalLiabilitieschg = null; metadata[1].TotalLiabilitieschg = null; 
                  metadata[0].PaidupCapchg = null; metadata[1].PaidupCapchg = null;
                  metadata[0].Equitieschg = null; metadata[1].Equitieschg = null;
                  metadata[0].Saleschg = null; metadata[1].Saleschg = null;
                  metadata[0].Revenuechg = null; metadata[1].Revenuechg = null;
                  metadata[0].CostOfSaleschg = null; metadata[1].CostOfSaleschg = null;
                  metadata[0].EBITchg = null; metadata[1].EBITchg = null;
                  metadata[0].IntExpenseschg = null; metadata[1].IntExpenseschg = null;
                  metadata[0].NetProfitschg = null; metadata[1].NetProfitschg = null;
                  metadata[0].EPSchg = null; metadata[1].EPSchg = null;
                  metadata[0].CurrentRatiochg = null; metadata[1].CurrentRatiochg = null;
                  metadata[0].QuickRatiochg = null; metadata[1].QuickRatiochg = null;
                  metadata[0].DERatiochg = null; metadata[1].DERatiochg = null;
                  metadata[0].IntCoveragechg = null; metadata[1].IntCoveragechg = null;
                  metadata[0].GrossProfitMarginchg = null; metadata[1].GrossProfitMarginchg = null;
                  metadata[0].NetProfitsMarginchg = null; metadata[1].NetProfitsMarginchg = null;
                  metadata[0].ReturnToAssetchg = null; metadata[1].ReturnToAssetchg = null;
                  metadata[0].ReturnToEquitychg = null; metadata[1].ReturnToEquitychg = null;
                  metadata[0].AccountReciveTurnoverchg = null; metadata[1].AccountReciveTurnoverchg = null;
                  metadata[0].AverageCollecPeriodchg = null; metadata[1].AverageCollecPeriodchg = null;
                  metadata[0].FixedAssetTurnoverchg = null; metadata[1].FixedAssetTurnoverchg = null;
                  metadata[0].InventoryTurnoverchg = null; metadata[1].InventoryTurnoverchg = null;
                  metadata[0].AvgSalePeriodchg = null; metadata[1].AvgSalePeriodchg = null;
                  metadata[0].TotalAssetTurnverchg = null; metadata[1].TotalAssetTurnverchg = null;


                  metadata[k].Cashchg = Cash[i-2];
                  metadata[k].TotalAssetchg = TotalAsset[i-2];
                  metadata[k].CurrtLiabilitieschg = CurrtLiabilities[i-2];
                  metadata[k].TotalLiabilitieschg = TotalLiabilities[i-2];
                  metadata[k].PaidupCapchg = PaidupCap[i-2];
                  metadata[k].Equitieschg = Equities[i-2];
                  metadata[k].Saleschg = Sales[i-2];
                  metadata[k].Revenuechg = Revenue[i-2];
                  metadata[k].CostOfSaleschg = CostOfSales[i-2];
                  metadata[k].EBITchg = EBIT[i-2];
                  metadata[k].IntExpenseschg = IntExpenses[i-2];
                  metadata[k].NetProfitschg = NetProfits[i-2];
                  metadata[k].EPSchg = EPS[i-2];
                  metadata[k].CurrentRatiochg = CurrentRatio[i-2];
                  metadata[k].QuickRatiochg = QuickRatio[i-2];
                  metadata[k].DERatiochg = DERatio[i-2];
                  metadata[k].IntCoveragechg = IntCoverage[i-2];
                  metadata[k].GrossProfitMarginchg = GrossProfitMargin[i-2];
                  metadata[k].NetProfitsMarginchg = NetProfitsMargin[i-2];
                  metadata[k].ReturnToAssetchg = ReturnToAsset[i-2];
                  metadata[k].ReturnToEquitychg = ReturnToEquity[i-2];
                  metadata[k].AccountReciveTurnoverchg = AccountReciveTurnover[i-2];
                  metadata[k].AverageCollecPeriodchg = AverageCollecPeriod[i-2];
                  metadata[k].FixedAssetTurnoverchg = FixedAssetTurnover[i-2];
                  metadata[k].InventoryTurnoverchg = InventoryTurnover[i-2];
                  metadata[k].AvgSalePeriodchg = AvgSalePeriod[i-2];
                  metadata[k].TotalAssetTurnverchg = TotalAssetTurnver[i-2];

                  k++;
                }
              }
              for(i=0;i<=period.length-3;i++)
              {
                metadata[i].Period = period[i+1];
                metadata[0].AsDate = null;
                metadata[1].AsDate = null;
                metadata[i].AsDate = AsDate[i-1];
              }
               var Json_data = JSON.stringify(metadata);
               var file_name = name;
               /*fs.writeFile('data_highlight/'+file_name+'.json', JSON.stringify(metadata, null, 4), function(err){
                    console.log('Success! - your file is '+file_name+'.json , Please check in your directory ');
                })*/
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


app.listen('8081') 
// ใช้ port 8081
exports = module.exports = app; 	