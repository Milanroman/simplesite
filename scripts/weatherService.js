$(function() {
            navigator.geolocation.getCurrentPosition(locSuccess, locError);
        });

    function locSuccess(position) {
        var weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude +
                                             '&lon=' + position.coords.longitude + '&APPID=19e6212ba1a15130d764c8ce642a543b&units=metric' + '&callback=?';
        $.getJSON(weatherAPI, function (response) {
            $('#city').html(response.city.name + ', ' + response.city.country);
            $('#time_now0').html(response.list[0].dt_txt);
            $('#time_now1').html(response.list[1].dt_txt);
            $('#time_now2').html(response.list[2].dt_txt);
            $('#time_now3').html(response.list[3].dt_txt);
            $('#time_now4').html(response.list[4].dt_txt);
            $('#temp_now0').html(Math.round(response.list[0].main.temp) + '&deg;C');
            $('#temp_now1').html(Math.round(response.list[1].main.temp) + '&deg;C');
            $('#temp_now2').html(Math.round(response.list[2].main.temp) + '&deg;C');
            $('#temp_now3').html(Math.round(response.list[3].main.temp) + '&deg;C');
            $('#temp_now4').html(Math.round(response.list[4].main.temp) + '&deg;C');
            $('#humidity0').html(response.list[0].main.humidity);
            $('#humidity1').html(response.list[1].main.humidity);
            $('#humidity2').html(response.list[2].main.humidity);
            $('#humidity3').html(response.list[3].main.humidity);
            $('#humidity4').html(response.list[4].main.humidity);
            $('#wind0').html(response.list[0].wind.speed);
            $('#wind1').html(response.list[1].wind.speed);
            $('#wind2').html(response.list[2].wind.speed);
            $('#wind3').html(response.list[3].wind.speed);
            $('#wind4').html(response.list[4].wind.speed);
        });
    }

    function locError(error) {
        console.warn('Error:' + error.message);
    }
    


