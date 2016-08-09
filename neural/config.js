
     var optionChart = {
      date : [],
      values_1 : [],
      values_2 : [],
      values_3 : [],
      values_4 : [],
      values_5 : [],
    };

    function replaceStr(str){
      if(str != null){
        str = str.replace(",","");
      }
      return str;
    }
    var i;
    for(i=0;i<example.length;i++)
    {
      optionChart.date[i] = "Q"+example[i].Quarter+"-"+example[i].Year;
      optionChart.values_1[i] = parseFloat(replaceStr(example[i].Close));
      optionChart.values_2[i] = parseFloat(replaceStr(example[i].NetProfits));
      optionChart.values_3[i] = parseFloat(replaceStr(example[i].GrossProfitMargin));
      optionChart.values_4[i] = parseFloat(replaceStr(example[i].Market));
      optionChart.values_5[i] = parseFloat(replaceStr(example[i].PaidupCap));
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