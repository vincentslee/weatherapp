var cityname='';
var lastcity = localStorage.getItem("cityname");
Display(lastcity);

$("#last").text("Last Searched: "+lastcity);
$("#last").click(function(){
    $("#content").empty();
    cityname=lastcity;
    Display(cityname);
})

$("#entercity").click(function(){
    var cityname=$("#city-search").val();
    $("#content").empty();
    localStorage.setItem("cityname", cityname);
    Display(cityname);
})

function Display(cityname){
    $("#last").text("Last Searched: "+cityname);
    console.log(cityname);
    var APIKey = "53b370c01feae4ec91b6bd4675083514";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid=" + APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        console.log(response.list[0].weather[0].description);
        console.log(response.list[0].main.feels_like);
        console.log(response.list[0].main.humidity);
        console.log(response.list[0].wind.speed);
    
        var n = 0;
        $("#content").append("<div class='label'>"+cityname+" Weather</div>")
        for(var i = 0; i < response.list.length; i++){
            var sky = response.list[i].weather[0].description;
            var temp = (response.list[i].main.feels_like - 273.15) * 9/5 + 32;
            var humid = response.list[i].main.humidity;
            var wind = response.list[i].wind.speed;
            var time = response.list[i].dt_txt;
            
            var iconCode = response.list[i].weather[0].icon;
            console.log(iconCode);
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            $("#content").append("<div class= 'bar' id='icon"+i+"'></div>")
            $("#icon"+i).html("<img src='" + iconUrl  + "'>"+"[Date/Time: "+time+"] Weather: "+sky+" Temperature: "+Math.floor(temp)+"F Humidity: "+humid+" Wind Speed: "+wind);
                
            
        }
        
    });
}
