var temp;

$(document).ready(function(){
  
  /* Switch from C to F and back*/ 
  $("#curDegree").click(function() {
    
    var format = $("#curDegree").text();
    console.log(format);
    if (format == "&deg;C") {
      $("#curDegree").text("F");
      var newDegree = ((parseInt($("#temp").text()) * 9) / 5) + 32;
      $("#temp").text(newDegree);
    }
    else {
      $("#curDegree").text("C");
      $("#temp").text(temp);
    }
  });
  
  /* Get location of user*/
  $.getJSON("https://ipapi.co/json", function(location) {
    
    // error handling
    var status = "";
    status = location.country;
    if (status == "") {
      $("#location").html("Error: Could not aquire coordinates.");
    }
    else {
    
      // store coordinates
      var lat = location.latitude;
      var lon = location.longitude;
      
      /* Get weather report for user */
      $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon, function(val) 
      {
    
        /* get icon */
        var icon = "<img src=\"" + val.weather["0"].icon + "\"><br>";
        $("#icon").html(icon);
        
        /* get weather */
        var weather = "<h2>" + val.weather["0"].description + "</h2><br>";
        $("#weather").html(weather);
        
        /* get temperature */
        temp = Math.round(val.main.temp * 10) / 10;
      
        $("#temp").text(temp);
        $("#curDegree").text("C");
      });
      
    }
  });
  
  
  

  
            
});