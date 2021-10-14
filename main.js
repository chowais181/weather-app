function getCity() {
  document.getElementById("invalid").style.display = "none";
  var cityName = document.getElementsByClassName("cityName")[0].value;

  var wind_speed = document.getElementById("wind_speed");
  var cities = ["Islamabad", "Karachi", "Lahore", "Peshawar", "Quetta"];

  if (cityName == "") {
    //empty query
    var j = 0;
    document.getElementById("table_city").style.display = "none";
    document.getElementById("invalid").style.display = "none";
    document.getElementById("default").style.display = "block";
    for (var i = 0; i < cities.length; i++) {
      //to access the classes of the cities table in calasses we need to define
      var cName = document.getElementsByClassName("cName");
      var cTemp = document.getElementsByClassName("cTemp");
      var cPre = document.getElementsByClassName("cPre");
      var cHumi = document.getElementsByClassName("cHumi");
      var cWeatherDesc = document.getElementsByClassName("cWeatherDesc");
      var cWindSpeed = document.getElementsByClassName("cWindSpeed");
      //show the retrieved data on screen through table
      $.ajax({
        url:
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          cities[i] +
          "&units=metric&appid=d1f40bb4d41311dbf68fbda0df53b451",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
          cName[j].innerHTML = data["name"];
          cTemp[j].innerHTML = data["main"]["temp"];
          cPre[j].innerHTML = data["main"]["pressure"];
          cHumi[j].innerHTML = data["main"]["humidity"];
          cWeatherDesc[j].innerHTML = data["weather"][0]["description"];
          cWindSpeed[j].innerHTML = data["wind"]["speed"];
          j++;
        },
      });
    }
  } else {
    //if the user entered the name of the specific city
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&units=metric&appid=d1f40bb4d41311dbf68fbda0df53b451",
      type: "GET",
      dataType: "JSON",
      success: function (data) {
        document.getElementById("default").style.display = "none";
        document.getElementById("invalid").style.display = "none";
        document.getElementById("table_city").style.display = "inline";

        temp.innerHTML = data["main"]["temp"];
        city.innerHTML = cityName;
        pres.innerHTML = data["main"]["pressure"];
        humi.innerHTML = data["main"]["humidity"];
        driz.innerHTML = data["weather"][0]["description"];
        wind_speed.innerHTML = data["wind"]["speed"];
      },
      error: function (data) {
        //error invalid search
        document.getElementById("invalid").style.display = "block";
        document.getElementById("table_city").style.display = "none";
        document.getElementById("default").style.display = "none";
      },
    });
  }
}
