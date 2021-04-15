// ----------------------------------------------- JS FILE ------------------------------------------- \\
    //Header Open
    document.write("<header id=\"head\">");
        //Reload button
        document.write("<div class=\"reload\"><a href='index.html'> <img src=\"pics/reload.png\"/>  </a> </div>"); 
        //Heading
        document.write("<h1>Weather in Hong Kong</h1>");
        //Flex Container
        document.write("<div class='flex-container'>"); 
        //Weather icon
        document.write("<div id='icon'>  </div>"); //AJAX retrieved icon
        //Tempreautre Icon
        document.write("<div class=\"Tempreature\"> </div>");
        //Tempreature Value
        document.write("<div class=\"Text\"><p id='tempValue' class='TempA'></p> </div>"); //AJAX retrieved Temp value
        //Humidity icon
        document.write("<div class=\"Humidity\"> </div>");
        //Humidity Value
        document.write("<div class=\"Text\"><p id='humidityValue' class='TempA'></p> </div>"); //AJAX retrieved Humidity value
        //Rainfall Icon
        document.write("<div class=\"Rainfall\"> </div>");
        //Rainfall Value
        document.write("<div class=\"Text\"><p id='rainValue' class='TempA'></p> </div>"); //AJAX retrieved Rain value
        //UVLevel Icon
        document.write("<div id='hide' class=\"UVlevel\"> <img src='pics/UVindex.png'> </div>");
        //UVLevel Value
        document.write("<div class=\"Text\"><p id='UVvalue' class='TempA'></p> </div>"); //AJAX retrieved UV level also dissapears
        //Flex Container End
        document.write("</div>");
        //Last update time
        document.write("<p id='timeUpdate'> </p>") //AJAX retirieved time
        //Warning Message
        document.write("<div id=\"Warning\"> Warning &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img id='dis' onmouseover='nan()' onmouseout='nan2()' src='pics/arrow.png'><p id='warnText'> </p> </div>"); //Hidden but pops up in situations AJAX retirieved
    //Header End
    document.write("</header>");

    //Nav Menu Open
    document.write("<nav>");
        document.write("<ul><li id='col1'><a href='#' id='retrieveTemp'>Temperature</a></li>");
        document.write("<li id='col2'><a href='#' id='retrieveForecast'>Forecast</a></li></ul> ");
    //Nav End
    document.write("</nav>");

    //MAIN AREA
    // Div with Temps of different Cities
    document.write("<div id=\"City\" class='flex-container2'> </div>");

    // Div with 9 day weather forecast
    document.write("<div id=\"Days\" class='flex-container2'> </div>")
   

    //Functions of JS and other stuff
    var T = document.getElementById('retrieveTemp');
    var F = document.getElementById('retrieveForecast');
    document.getElementById("Days").style.display = 'none';

    T.addEventListener("click", function() {
        if (document.getElementById('City').style.display === "none") {
            document.getElementById('City').style.display = "flex";
            document.getElementById('Days').style.display = "none";
        }
        document.getElementById("col1").style.background = "white";
        document.getElementById("col2").style.background = "#D8DEE9";
        
    });
    F.addEventListener("click",function() {
        if (document.getElementById('Days').style.display === "none") {
            document.getElementById('Days').style.display = "flex";
            document.getElementById('City').style.display = "none";
        }
        document.getElementById("col2").style.background = "white";
        document.getElementById("col1").style.background = "#D8DEE9";        
    });
    
    function closeCard(i) {
        document.getElementById(`card${i}`).style.display= "none";
    }

    function nan() {
        document.getElementById('warnText').style.display='flex';
    }
    function nan2() {
        document.getElementById('warnText').style.display='none'
    }

    //------------------------------- Using Fetch to Get Data -------------------------------

    fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en')
            .then( response => {
                if (response.status == 200) {
                response.json().then( WR => {
                    var icon = document.getElementById('icon');
                    var x = `<img src='https://www.hko.gov.hk/images/HKOWxIconOutline/pic${WR.icon}.png'>`;
                    document.getElementById('icon').innerHTML = x;

                    document.getElementById('tempValue').innerHTML = WR.temperature.data[1].value + '°C';
                    document.getElementById('humidityValue').innerHTML = WR.humidity.data[0].value + '%';
                    document.getElementById('rainValue').innerHTML= WR.rainfall.data[13].max + 'mm';
                    document.getElementById('timeUpdate').innerHTML = 'Last Update: ' + WR.updateTime.substr(11,5);
                    if (WR.uvindex.data == undefined) {
                        document.getElementById('hide').style.display = "none";
                    } else {
                        document.getElementById('UVvalue').innerHTML = WR.uvindex.data[0].value;
                    }
                    
                    if (WR.warningMessage == "") {
                        document.getElementById('Warning').style.display = "none";
                        //Test Value
                        document.getElementById('warnText').innerHTML = "NA";
                    } else {
                        document.getElementById('warnText').innerHTML = WR.warningMessage[0];
                    }

                    var card = "";
                    for (var i=0; i<WR.temperature.data.length; i++) {
                        card += "<div id='card" + i + "' class='Card Col'><button id='btn' onclick= 'closeCard(" + i + ")'>X </button><span class='cardData P'><b>" + WR.temperature.data[i].place + "</b></span><br ><br ><span class='cardData T'>" + WR.temperature.data[i].value + "°C</span> </div>";
                    }
                    document.getElementById("City").innerHTML = card;
                });
                } else {
                    console.log("HTTP return status: "+response.status);
                  }
            });

            fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en`)
                .then ( response => {
                    if (response.status == 200) {
                    response.json().then( WF => {
                        var card2 = ""
                        for (var i=0; i<9; i++) {
                            card2 += `<div class=\'Card2 Col\'>
                                         <img class='img' src='https://www.hko.gov.hk/images/HKOWxIconOutline/pic${WF.weatherForecast[i].ForecastIcon}.png'>
                                         <p> <b>` + WF.weatherForecast[i].forecastDate.substr(6,2) + `/` + WF.weatherForecast[i].forecastDate.substr(4,2) + `</b></p> 
                                         <p>` + WF.weatherForecast[i].week + `</p> 
                                         <p>` + WF.weatherForecast[i].forecastMintemp.value + `°` + WF.weatherForecast[i].forecastMintemp.unit + ` | ` + WF.weatherForecast[i].forecastMaxtemp.value + `°` + WF.weatherForecast[i].forecastMaxtemp.unit + `</p>
                                         <p>` + WF.weatherForecast[i].forecastMinrh.value + `% - ` + WF.weatherForecast[i].forecastMaxrh.value + `% </p>
                                     </div>`;
                        }
                        document.getElementById("Days").innerHTML = card2;
                    });
                    } else {
                        console.log("HTTP return status: "+response.status);
                      }
                });
               
            
