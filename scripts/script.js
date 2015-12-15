$(function(){
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
    }); 
    
    function dataReceived(data) {
        var city = data.city.name;
        var country = data.city.country;
        $('#city').html(city + ',' + country); // Додаємо локацію на сторінку
    }
    
    function showError(msg){
        $('#error').html('Сталася помилка: ' + msg);
    }
});