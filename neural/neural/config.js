function getdata(){
  var name = document.getElementById("company").value;
  var xmlhttp = new XMLHttpRequest();
  var url = "../data_highlight/"+name+".json";

  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
          var example = JSON.parse(this.responseText);
          loaddata(example);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function loaddata(example){

     var optionChart = {
      date : [],
      values_1 : [],
      values_2 : [],
      values_2_y : [],
      values_2_yper : [],
      values_3 : [],
      values_4 : [],
      values_5 : [],
      values_6 : [],
      values_7 : [],
      values_7_y : [],
      values_7_yper : [],
      values_8 : [],
      values_9 : [],
      values_10 : [],
      values_11 : [],
      values_12 : [],
      values_13 : [],
      values_14 : [],
      values_15 : [],
      values_16 : [],
      values_17 : [],
      values_18 : [],
      values_19 : [],
      values_20 : [],
      values_21 : [],
      yoyRQ: [],
      yoyPQ: [],
    };

    function replaceStr(str){
      if(str != null){
        str = str.replace(",","");
      }
      return str;
    }
    var i,j=example.length-2,year=example[j].Year,Rev=0,Net=0,k,firstpaid=parseFloat(replaceStr(example[j-1].PaidupCap));
    for(i=example.length-1;i>=0;i--)
    {
      if(example[i].PaidupCap!=""&&example[i].PaidupCap!=null){
        firstpaid=parseFloat(replaceStr(example[i].PaidupCap));
        console.log(firstpaid+"test"+example[i].Year+example[i].Quarter);
        break;
      }
    }
    for(i=0;i<example.length-1;i++)
    {
      //if(example[j].Quarter==1&&example[j].Year==2017)
      //  break;
      optionChart.date[i] = "Q"+example[j+1].Quarter+"-"+example[j+1].Year;
      optionChart.values_1[i] = parseFloat(replaceStr(example[j+1].Close));
      optionChart.values_2[i] = parseFloat(replaceStr(example[j+1].NetProfits));
      optionChart.values_3[i] = parseFloat(replaceStr(example[j+1].GrossProfitMargin));
      optionChart.values_4[i] = parseFloat(replaceStr(example[j+1].Market));
      optionChart.values_5[i] = parseFloat(replaceStr(example[j+1].PaidupCap));
      optionChart.values_6[i] = parseFloat(replaceStr(example[j+1].Sales));
      optionChart.values_7[i] = parseFloat(replaceStr(example[j+1].Revenue));
      optionChart.values_8[i] = parseFloat(replaceStr(example[j+1].GrossProfitMargin));
      optionChart.values_9[i] = parseFloat(replaceStr(example[j+1].NetProfitsMargin));
      optionChart.values_10[i] = parseFloat(replaceStr(example[j+1].NetProfits));
      optionChart.values_11[i] = parseFloat(replaceStr(example[j+1].TotalAsset));
      optionChart.values_12[i] = parseFloat(replaceStr(example[j+1].Equities));
      optionChart.values_13[i] = parseFloat(replaceStr(example[j+1].ReturnToAsset));
      optionChart.values_14[i] = parseFloat(replaceStr(example[j+1].ReturnToEquity));
      optionChart.values_15[i] = parseFloat(replaceStr(example[j+1].PE));
      optionChart.values_16[i] = parseFloat(replaceStr(example[j+1].PBV));
      optionChart.values_17[i] = parseFloat(replaceStr(example[j+1].Yield));
      optionChart.values_19[i] = parseFloat(replaceStr(example[j+1].High));
      optionChart.values_20[i] = parseFloat(replaceStr(example[j+1].Low));
      optionChart.values_21[i] = parseFloat(replaceStr(example[j+1].ValueDay));

      if(example[j].Market!="-"&&example[j].Market!=""&&example[j].Market!=null)
        optionChart.values_18[i] = Math.round((parseFloat(replaceStr(example[j].Market)))/firstpaid*100)/100;

      console.log(example[j].Market+"real"+optionChart.values_18[i]);

      optionChart.values_7_y[i] = 0;
      optionChart.values_2_y[i] = 0;

      if(i==example.length-1){
        optionChart.values_7_y[i] = Rev;
        optionChart.values_2_y[i] = Net;
        optionChart.yoyRQ[i] = Math.round(((optionChart.values_7[i]-optionChart.values_7[i-4])/optionChart.values_7[i-4]*100)*100)/100;
        optionChart.yoyPQ[i] = Math.round(((optionChart.values_2[i]-optionChart.values_2[i-4])/optionChart.values_2[i-4]*100)*100)/100;
      }
      else if(example[j].Quarter!=4){
        optionChart.values_7_y[i] = 0;
        optionChart.values_2_y[i] = 0;
        Rev += parseFloat(replaceStr(example[j+1].Revenue));
        Net += parseFloat(replaceStr(example[j+1].NetProfits));
        //console.log("Ney : "+Net+" Rev : "+Rev);
      }
      else if(example[j].Quarter==4){
        Rev += parseFloat(replaceStr(example[j+1].Revenue));
        Net += parseFloat(replaceStr(example[j+1].NetProfits));
        //console.log("Ney : "+Net+" Rev : "+Rev);
        optionChart.values_7_y[i] = Math.round(Rev*100)/100;
        optionChart.values_2_y[i] = Math.round(Net*100)/100;
        //console.log(optionChart.values_2_y[i]+" and "+optionChart.values_2_y[i-4]);
        optionChart.values_7_yper[i] = Math.round(((optionChart.values_7_y[i]-optionChart.values_7_y[i-4])/optionChart.values_7_y[i-4]*100)*100)/100;
        optionChart.values_2_yper[i] = Math.round(((optionChart.values_2_y[i]-optionChart.values_2_y[i-4])/optionChart.values_2_y[i-4]*100)*100)/100;
        Rev = 0;
        Net = 0;
      }
      optionChart.yoyRQ[i] = Math.round(((optionChart.values_7[i]-optionChart.values_7[i-4])/optionChart.values_7[i-4]*100)*100)/100;
      optionChart.yoyPQ[i] = Math.round(((optionChart.values_2[i]-optionChart.values_2[i-4])/optionChart.values_2[i-4]*100)*100)/100;
      j--;
    }
    //console.log(optionChart);
    var myConfig = {
      globals: {
        fontFamily: 'Roboto'
      },
      backgroundColor: '#F5F5F5',
      type: "mixed",
      title: {
        color: '#424242',
        marginLeft: 80,
        text: 'HMPRO',
        textAlign: 'left'
      },
      subtitle: {
        color: '#424242',
        marginLeft: 80,
        text: 'Homepro VI charts',
        textAlign: 'left'
      },
      'scale-x': {
        lineColor: '#BDBDBD',
        values: optionChart.date,
        label: {
          text: 'Quarter'
        },
        item: {
          visible: false
        },
        guide: {
          lineWidth: 0,
          items: [{
            backgroundColor: '#F5F5F5'
          }, {
            backgroundColor: '#FFF'
          }]
        },
        tick: {
          visible: false
        }
      },
      'scale-y': {
        "offset-end":"60%",
        lineColor: '#BDBDBD',
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        format: '%v',
        label: {
          color: '#424242',
          text: 'NetProfits (M Baht)'
        }
      },
      'scale-y-2': {
        "placement":"default",
        "blended":true,
        "offset-start":"50%",
        lineColor: '#BDBDBD',
        format: '%v"',
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        label: {
          text: 'GrossProfitMargin (%)'
        }
      },
      'scale-y-3': {
        lineColor: '#BDBDBD',
        format: '%v"',
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        guide: {
          visible:false
        },
        label: {
          text: 'Price (%)'
        }
      },
      crosshairX: {
        plotLabel: {
          multiple: true
        },
        scaleLabel: {
          backgroundColor: "#BDBDBD",
          alpha: 1,
          color: '#FFFFFF',
          fontSize: 16
        }
      },
      plot: {
        tooltip: {
          visible: false
        },
      },
      plotarea: {
        backgroundColor: '#FFF',
        margin: '60px 80px 60px 80px'
      },
      series: [{
                    "values": optionChart.values_1,
                    "scales":"scale-x,scale-y-3",
                    "text": "Pricing",
                    "line-color": "#007790",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_2,
                    "text": "NetProfits",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_3,
                    "scales":"scale-x,scale-y-2",
                    "text": "NetProfits",
                    "line-color": "#DDD",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "marker": {
                        visible:false
                    }
                } 
      ]
    };

    var myConfig2 = {
      globals: {
        fontFamily: 'Roboto'
      },
      backgroundColor: '#F5F5F5',
      type: "mixed",
      title: {
        color: '#424242',
        marginLeft: 80,
        text: 'HMPRO',
        textAlign: 'left'
      },
      subtitle: {
        color: '#424242',
        marginLeft: 80,
        text: 'Homepro VI charts',
        textAlign: 'left'
      },
      'scale-x': {
        lineColor: '#BDBDBD',
        values: optionChart.date,
        label: {
          text: 'Quarter'
        },
        item: {
          visible: false
        },
        guide: {
          lineWidth: 0,
          items: [{
            backgroundColor: '#F5F5F5'
          }, {
            backgroundColor: '#FFF'
          }]
        },
        tick: {
          visible: false
        }
      },
      'scale-y': {
        lineColor: '#BDBDBD',
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        format: '%v',
        label: {
          color: '#424242',
          text: 'MarketCap (M Baht)'
        }
      },
      'scale-y-2': {
        lineColor: '#BDBDBD',
        format: '%v"',
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        label: {
          text: 'PaidupCap (M Baht)'
        }
      },
      crosshairX: {
        plotLabel: {
          multiple: true
        },
        scaleLabel: {
          backgroundColor: "#BDBDBD",
          alpha: 1,
          color: '#FFFFFF',
          fontSize: 16
        }
      },
      plot: {
        tooltip: {
          visible: false
        },
      },
      plotarea: {
        backgroundColor: '#FFF',
        margin: '60px 80px 60px 80px'
      },
      series: [
                {
                    "values": optionChart.values_4,
                    "text": "MarketCap",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_5,
                    "type":"bar",
                    "bar-width": "50%",
                    "scales":"scale-x,scale-y-2",
                    "text": "PaidupCap",
                    "background-color": "#40beeb",
                } 
      ]
    };

    var SalesProfits = {
      "preview": {
        "background-color":"#FFFFFF",
        "border-color":"#6666ff",
        "border-width":5,
        "height":"20%",
        "width":"100%",
        "x":"40px",
        "y":"80px",
      },
      globals: {
        fontFamily: 'Roboto'
      },
      backgroundColor: '#F5F5F5',
      type: "mixed",
      title: {
        color: '#424242',
        marginLeft: 80,
        text: 'HMPRO',
        textAlign: 'left'
      },
      subtitle: {
        color: '#424242',
        marginLeft: 80,
        text: 'Homepro VI charts',
        textAlign: 'left'
      },
      'scale-x': {
        "zooming":true,
        lineColor: '#BDBDBD',
        values: optionChart.date,
        label: {
          text: 'Quarter'
        },
        item: {
          visible: false
        },
        guide: {
          lineWidth: 0,
          items: [{
            backgroundColor: '#F5F5F5'
          }, {
            backgroundColor: '#FFF'
          }]
        },
        tick: {
          visible: false
        }
      },
      'scale-y': {
        "zooming":true,
        lineColor: '#BDBDBD',
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        label: {
          color: '#424242',
          text: 'Sales & Profits (M Baht)'
        }
      },
      'scale-y-2': {
        "zooming":false,
        lineColor: '#BDBDBD',
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        label: {
          text: 'ProfitsMargin (%)'
        }
      },
      crosshairX: {
        plotLabel: {
          multiple: true
        },
        scaleLabel: {
          backgroundColor: "#BDBDBD",
          alpha: 1,
          color: '#FFFFFF',
          fontSize: 16
        }
      },
      plot: {
        tooltip: {
          visible: false
        },
      },
      plotarea: {
        backgroundColor: '#FFF',
        "margin-top":"35%",
        margin: '60px 80px 60px 80px'
      },
      series: [
                {
                    "values": optionChart.values_6,
                    "scales":"scale-x,scale-y",
                    "text": "Sales",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_7,
                    "scales":"scale-x,scale-y",
                    "text": "Revenue",
                    "line-color": "#111111",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_8,
                    "scales":"scale-x,scale-y-2",
                    "text": "GrossProfitMargin",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_9,
                    "scales":"scale-x,scale-y-2",
                    "text": "NetProfitsMargin",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_10,
                    "scales":"scale-x,scale-y",
                    "text": "NetProfits",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "marker": {
                        visible:false
                    }
                },
      ]
    };

    var ReturnEquity = {
      globals: {
        fontFamily: 'Roboto'
      },
      backgroundColor: '#F5F5F5',
      type: "mixed",
      title: {
        color: '#424242',
        marginLeft: 80,
        text: 'HMPRO',
        textAlign: 'left'
      },
      subtitle: {
        color: '#424242',
        marginLeft: 80,
        text: 'Homepro VI charts',
        textAlign: 'left'
      },
      'scale-x': {
        lineColor: '#BDBDBD',
        values: optionChart.date,
        label: {
          text: 'Quarter'
        },
        item: {
          visible: false
        },
        guide: {
          lineWidth: 0,
          items: [{
            backgroundColor: '#F5F5F5'
          }, {
            backgroundColor: '#FFF'
          }]
        },
        tick: {
          visible: false
        }
      },
      'scale-y': {
        lineColor: '#BDBDBD',
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        label: {
          color: '#424242',
          text: 'Assets (M Baht)'
        }
      },
      'scale-y-2': {
        lineColor: '#BDBDBD',
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        label: {
          text: 'Return (%)'
        }
      },
      crosshairX: {
        plotLabel: {
          multiple: true
        },
        scaleLabel: {
          backgroundColor: "#BDBDBD",
          alpha: 1,
          color: '#FFFFFF',
          fontSize: 16
        }
      },
      plot: {
        tooltip: {
          visible: false
        },
      },
      plotarea: {
        backgroundColor: '#FFF',
        margin: '60px 80px 60px 80px'
      },
      series: [
                {
                    "values": optionChart.values_11,
                    "scales":"scale-x,scale-y",
                    "text": "TotalAsset",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_13,
                    "type":"bar",
                    "bar-width": "50%",
                    "scales":"scale-x,scale-y-2",
                    "text": "ReturnToAsset",
                    "background-color": "#BA8D7F",
                },
      ]
    };

    var ReturnAsset = {
      globals: {
        fontFamily: 'Roboto'
      },
      backgroundColor: '#F5F5F5',
      type: "mixed",
      title: {
        color: '#424242',
        marginLeft: 80,
        text: 'HMPRO',
        textAlign: 'left'
      },
      subtitle: {
        color: '#424242',
        marginLeft: 80,
        text: 'Homepro VI charts',
        textAlign: 'left'
      },
      'scale-x': {
        lineColor: '#BDBDBD',
        values: optionChart.date,
        label: {
          text: 'Quarter'
        },
        item: {
          visible: false
        },
        guide: {
          lineWidth: 0,
          items: [{
            backgroundColor: '#F5F5F5'
          }, {
            backgroundColor: '#FFF'
          }]
        },
        tick: {
          visible: false
        }
      },
      'scale-y': {
        lineColor: '#BDBDBD',
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        label: {
          color: '#424242',
          text: 'Assets (M Baht)'
        }
      },
      'scale-y-2': {
        lineColor: '#BDBDBD',
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        label: {
          text: 'Return (%)'
        }
      },
      crosshairX: {
        plotLabel: {
          multiple: true
        },
        scaleLabel: {
          backgroundColor: "#BDBDBD",
          alpha: 1,
          color: '#FFFFFF',
          fontSize: 16
        }
      },
      plot: {
        tooltip: {
          visible: false
        },
      },
      plotarea: {
        backgroundColor: '#FFF',
        margin: '60px 80px 60px 80px'
      },
      series: [

                {
                    "values": optionChart.values_12,
                    "scales":"scale-x,scale-y",
                    "text": "Equities",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#7519E6"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_14,
                    "type":"bar",
                    "bar-width": "50%",
                    "scales":"scale-x,scale-y-2",
                    "text": "ReturnToEquity",
                    "background-color": "#BFBFBF",
                },
      ]
    };

    var Yield = {
      globals: {
        fontFamily: 'Roboto'
      },
      backgroundColor: '#F5F5F5',
      type: "mixed",
      title: {
        color: '#424242',
        marginLeft: 80,
        text: 'HMPRO',
        textAlign: 'left'
      },
      subtitle: {
        color: '#424242',
        marginLeft: 80,
        text: 'Homepro VI charts',
        textAlign: 'left'
      },
      'scale-x': {
        lineColor: '#BDBDBD',
        values: optionChart.date,
        label: {
          text: 'Quarter'
        },
        item: {
          visible: false
        },
        guide: {
          lineWidth: 0,
          items: [{
            backgroundColor: '#F5F5F5'
          }, {
            backgroundColor: '#FFF'
          }]
        },
        tick: {
          visible: false
        }
      },
      'scale-y': {
        lineColor: '#BDBDBD',
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        label: {
          color: '#424242',
          text: 'P/E & P/Bv (Times)'
        }
      },
      'scale-y-2': {
        lineColor: '#7F51B8',
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#7F51B8'
        },
        guide: {
          visible: false
        },
        label: {
          text: 'Yeild (%)'
        }
      },
      crosshairX: {
        plotLabel: {
          multiple: true
        },
        scaleLabel: {
          backgroundColor: "#BDBDBD",
          alpha: 1,
          color: '#FFFFFF',
          fontSize: 16
        }
      },
      plot: {
        tooltip: {
          visible: false
        },
      },
      plotarea: {
        backgroundColor: '#FFF',
        margin: '60px 80px 60px 80px'
      },
      series: [
               {
                    "values": optionChart.values_15,
                    "scales":"scale-x,scale-y",
                    "text": "P/E",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_16,
                    "scales":"scale-x,scale-y",
                    "text": "P/Bv",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#7519E6"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_17,
                    "type":"bar",
                    "bar-width": "50%",
                    "scales":"scale-x,scale-y-2",
                    "text": "Yeild",
                    "background-color": "#BA8D7F",
                },  
      ]
    };

    var price = {
      globals: {
        fontFamily: 'Roboto'
      },
      backgroundColor: '#F5F5F5',
      type: "mixed",
      title: {
        color: '#424242',
        marginLeft: 80,
        text: 'HMPRO',
        textAlign: 'left'
      },
      subtitle: {
        color: '#424242',
        marginLeft: 80,
        text: 'Price',
        textAlign: 'left'
      },
      'scale-x': {
        lineColor: '#BDBDBD',
        values: optionChart.date,
        label: {
          text: 'Quarter'
        },
        item: {
          visible: false
        },
        guide: {
          lineWidth: 0,
          items: [{
            backgroundColor: '#F5F5F5'
          }, {
            backgroundColor: '#FFF'
          }]
        },
        tick: {
          visible: false
        }
      },
      'scale-y': {
        lineColor: '#BDBDBD',
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        label: {
          color: '#424242',
          text: 'Price'
        }
      },
      'scale-y-2': {
        lineColor: '#7F51B8',
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#7F51B8'
        },
        guide: {
          visible: false
        },
        label: {
          text: 'volumn'
        }
      },
      crosshairX: {
        plotLabel: {
          multiple: true
        },
        scaleLabel: {
          backgroundColor: "#BDBDBD",
          alpha: 1,
          color: '#FFFFFF',
          fontSize: 16
        }
      },
      plot: {
        tooltip: {
          visible: false
        },
      },
      plotarea: {
        backgroundColor: '#FFF',
        margin: '60px 80px 60px 80px'
      },
      series: [
               {
                    "values": optionChart.values_1,
                    "scales":"scale-x,scale-y",
                    "text": "Close",
                    "line-color": "#00F",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_19,
                    "scales":"scale-x,scale-y",
                    "text": "High",
                    "line-color": "#0F0",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#7519E6"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_20,
                    "scales":"scale-x,scale-y",
                    "text": "Low",
                    "line-color": "#F00",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#7519E6"
                    },
                    "marker": {
                        visible:false
                    }
                },
                {
                    "values": optionChart.values_21,
                    "type":"bar",
                    "bar-width": "50%",
                    "scales":"scale-x,scale-y-2",
                    "text": "Volumn",
                    "background-color": "#BA8D7F",
                },  
      ]
    };

    var Yoy = {
      globals: {
        fontFamily: 'Roboto'
      },
      backgroundColor: '#F5F5F5',
      type: "mixed",
      title: {
        color: '#424242',
        marginLeft: 80,
        text: 'HMPRO',
        textAlign: 'left'
      },
      subtitle: {
        color: '#424242',
        marginLeft: 80,
        text: 'Homepro VI charts',
        textAlign: 'left'
      },
      'scale-x': {
        lineColor: '#BDBDBD',
        values: optionChart.date,
        label: {
          text: 'Quarter'
        },
        item: {
          visible: false
        },
        guide: {
          lineWidth: 0,
          items: [{
            backgroundColor: '#F5F5F5'
          }, {
            backgroundColor: '#FFF'
          }]
        },
        tick: {
          visible: false
        }
      },
      'scale-y': {
        lineColor: '#BDBDBD',
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        label: {
          color: '#424242',
          text: 'Revenue & Net Profits (M Baht)'
        }
      },
      'scale-y-2': {
        lineColor: '#7F51B8',
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#7F51B8'
        },
        guide: {
          visible: false
        },
        label: {
          text: 'YoY (%)'
        }
      },
      crosshairX: {
        plotLabel: {
          multiple: true
        },
        scaleLabel: {
          backgroundColor: "#BDBDBD",
          alpha: 1,
          color: '#FFFFFF',
          fontSize: 16
        }
      },
      plot: {
        tooltip: {
          visible: false
        },
      },
      plotarea: {
        backgroundColor: '#FFF',
        margin: '60px 80px 60px 80px'
      },
      series: [


                {
                    "values": optionChart.values_2,
                    "scales":"scale-x,scale-y",
                    "text": "Net Profits",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#7519E6"
                    },
                    "marker": {
                        visible:true
                    }
                },
                {
                    "values": optionChart.values_7_yper,
                    "type":"bar",
                    "scales":"scale-x,scale-y-2",
                    "text": "Revenue YoY",
                    "background-color": "#BA8D7F",
                },
                {
                    "values": optionChart.values_2_y,
                    "type":"bar",
                    "scales":"scale-x,scale-y",
                    "text": "Net Profits Year",
                    "background-color": "#634D80",
                },
                {
                    "values": optionChart.values_2_yper,
                    "type":"bar",
                    "scales":"scale-x,scale-y-2",
                    "text": "Net Profits YoY",
                    "background-color": "#BFBFBF",
                },
      ]
    };

     var YoyQ = {
      globals: {
        fontFamily: 'Roboto'
      },
      backgroundColor: '#F5F5F5',
      type: "mixed",
      title: {
        color: '#424242',
        marginLeft: 80,
        text: 'HMPRO',
        textAlign: 'left'
      },
      subtitle: {
        color: '#424242',
        marginLeft: 80,
        text: 'Homepro VI charts',
        textAlign: 'left'
      },
      'scale-x': {
        lineColor: '#BDBDBD',
        values: optionChart.date,
        label: {
          text: 'Quarter'
        },
        item: {
          visible: false
        },
        guide: {
          lineWidth: 0,
          items: [{
            backgroundColor: '#F5F5F5'
          }, {
            backgroundColor: '#FFF'
          }]
        },
        tick: {
          visible: false
        }
      },
      'scale-y': {
        lineColor: '#BDBDBD',
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        label: {
          color: '#424242',
          text: 'Revenue & Net Profits (M Baht)'
        }
      },
      'scale-y-2': {
        lineColor: '#7F51B8',
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#7F51B8'
        },
        guide: {
          visible: false
        },
        label: {
          text: 'YoY (%)'
        }
      },
      crosshairX: {
        plotLabel: {
          multiple: true
        },
        scaleLabel: {
          backgroundColor: "#BDBDBD",
          alpha: 1,
          color: '#FFFFFF',
          fontSize: 16
        }
      },
      plot: {
        tooltip: {
          visible: false
        },
      },
      plotarea: {
        backgroundColor: '#FFF',
        margin: '60px 80px 60px 80px'
      },
      series: [


                {
                    "values": optionChart.values_2,
                    "scales":"scale-x,scale-y",
                    "text": "Net Profits",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#7519E6"
                    },
                    "marker": {
                        visible:true
                    }
                },
                {
                    "values": optionChart.yoyRQ,
                    "type":"bar",
                    "scales":"scale-x,scale-y-2",
                    "text": "Yoy Revenue",
                    "background-color": "#634D80",
                },
                {
                    "values": optionChart.yoyPQ,
                    "type":"bar",
                    "scales":"scale-x,scale-y-2",
                    "text": "Yoy Profits",
                    "background-color": "#BFBFBF",
                },
      ]
    };

    var PriceProfits = {
      globals: {
        fontFamily: 'Roboto'
      },
      backgroundColor: '#F5F5F5',
      type: "mixed",
      title: {
        color: '#424242',
        marginLeft: 80,
        text: 'HMPRO',
        textAlign: 'left'
      },
      subtitle: {
        color: '#424242',
        marginLeft: 80,
        text: 'Homepro VI charts',
        textAlign: 'left'
      },
      'scale-x': {
        lineColor: '#BDBDBD',
        values: optionChart.date,
        label: {
          text: 'Quarter'
        },
        item: {
          visible: false
        },
        guide: {
          lineWidth: 0,
          items: [{
            backgroundColor: '#F5F5F5'
          }, {
            backgroundColor: '#FFF'
          }]
        },
        tick: {
          visible: false
        }
      },
      'scale-y': {
        lineColor: '#BDBDBD',
        guide: {
          lineStyle: 'solid',
          lineColor: '#BDBDBD'
        },
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#BDBDBD'
        },
        label: {
          color: '#424242',
          text: 'Price (Baht)'
        }
      },
      'scale-y-2': {
        lineColor: '#7F51B8',
        item: {
          color: '#212121'
        },
        tick: {
          lineColor: '#7F51B8'
        },
        guide: {
          visible: false
        },
        label: {
          color: '#424242',
          text: 'Profits (M Baht)'
        }
      },
      crosshairX: {
        plotLabel: {
          multiple: true
        },
        scaleLabel: {
          backgroundColor: "#BDBDBD",
          alpha: 1,
          color: '#FFFFFF',
          fontSize: 16
        }
      },
      plot: {
        tooltip: {
          visible: false
        },
      },
      plotarea: {
        backgroundColor: '#FFF',
        margin: '60px 80px 60px 80px'
      },
      series: [


                {
                    "values": optionChart.values_1,
                    "scales":"scale-x,scale-y",
                    "text": "Close price",
                    "line-color": "#000",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#7519E6"
                    },
                    "marker": {
                        visible:true
                    }
                },
                {
                    "values": optionChart.values_18,
                    "scales":"scale-x,scale-y",
                    "text": "Real close price",
                    "line-color": "#634D80",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#634D80"
                    },
                    "marker": {
                        visible:true
                    }
                },
                {
                    "values": optionChart.values_2,
                    "scales":"scale-x,scale-y-2",
                    "text": "Net Profits",
                    "line-color": "#D1BDB6",
                    "legend-marker": {
                        "type": "circle",
                        "size": 5,
                        "background-color": "#007790",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#634D80"
                    },
                    "marker": {
                        visible:false
                    }
                },
      ]
    };

  zingchart.render({
      id: 'myChart2',
      data: SalesProfits,
      height: 1000,
      width: '100%',
    });

  zingchart.render({
      id: 'myChart3',
      data: ReturnEquity,
      height: 1000,
      width: '100%',
    });

  zingchart.render({
      id: 'myChart3_2',
      data: ReturnAsset,
      height: 1000,
      width: '100%',
    });

    zingchart.render({
      id: 'myChart4',
      data: Yield,
      height: 1000,
      width: '100%',
    });

    zingchart.render({
      id: 'myChart5',
      data: Yoy,
      height: 1000,
      width: '100%',
    });

    zingchart.render({
      id: 'myChart6',
      data: PriceProfits,
      height: 1000,
      width: '100%',
    });

    zingchart.render({
      id: 'myChart7',
      data: price,
      height: 1000,
      width: '100%',
    });

    zingchart.render({
      id: 'myChart8',
      data: YoyQ,
      height: 1000,
      width: '100%',
    });
  }

