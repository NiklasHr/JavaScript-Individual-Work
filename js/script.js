//All used event listeners
document.getElementById("search").addEventListener("click",getWeather);
document.getElementById("imperial").addEventListener("click",imperialUnit);
document.getElementById("metric").addEventListener("click",metricUnit);

//Variable "units" and functions that let the users change to their preferred units. 
//Metric by default. Runs the function "getWeather" on press. Adds/removes class.
let units = "metric"
function metricUnit(){
    units = "metric";
    getWeather();
    document.getElementById("metric").className = "active"
    document.getElementById("imperial").className = ""
}
function imperialUnit(){
    units = "imperial";
    getWeather();
    document.getElementById("metric").className = ""
    document.getElementById("imperial").className = "active"
}


//Function that uses API.
function getWeather(){
//Adding the user input "city" into the URL.
        let city = "http://api.openweathermap.org/data/2.5/weather?q=" + document.getElementById("city").value + "&units=" + units + "&mode=XML&APPID=f84bf4c48d629a20e8fac022da5e681c"

        //Making the xmlhttp request and using the variable "city" as URL.
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.open("GET",city,true);
        xmlhttp.send();

        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                //Making a variable that has the xmlhttp response in JSON.
                let results = JSON.parse(xmlhttp.response);
                //Putting results on the page
                document.getElementById("cityResult").innerHTML = document.getElementById("city").value
                document.getElementById("weatherResult").innerHTML = results.weather[0].main;
                document.getElementById("countryResult").innerHTML = results.sys.country;
                if (units === "metric") {
                    document.getElementById("temperatureResult").innerHTML = results.main.temp + " °C";
                    document.getElementById("windResult").innerHTML = results.wind.speed + " m/s"
                } else {
                    document.getElementById("temperatureResult").innerHTML = results.main.temp + " °F";
                    document.getElementById("windResult").innerHTML = results.wind.speed + " mph"
                }
            }
        }

}