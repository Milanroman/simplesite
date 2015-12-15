/*$(function(){
    $('#btnGetWeather').click(function () {
        getWeatherByCity('ua', dataReceived, showError, $('#inputCityName').val());
    });
    $('#inputCityName').keypress(function(e) {
        var ENTER_KEY_CODE = 13;
        if ( e.which === ENTER_KEY_CODE ) 
        {
            $('#btnGetWeather').trigger('click');
            return false;
        }
    }); */   


    $(function() {
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
        });

        function locationSuccess(position) {
            var weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude +
                                             '&lon=' + position.coords.longitude + '&APPID=19e6212ba1a15130d764c8ce642a543b' + '&callback=?';
            $.getJSON(weatherAPI, function (response) {
                $('#city').html(response.city.name);
                $('#temp_now').html(Math.round(response.list[0].main.temp - 273.15) + '&deg;C');
            });
        }

        function locationError(error) {
            console.warn('Error:' + error.message);
        }
        
        /*function showError(msg){
        $('#error').html('Сталася помилка: ' + msg);*/
    
//});