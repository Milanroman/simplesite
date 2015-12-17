function getWeatherByCity(lang, fnOK, fnError, cityName) {
    $.getJSON(
        'http://api.openweathermap.org/data/2.5/forecast?q=' 
        + cityName + '&APPID=19e6212ba1a15130d764c8ce642a543b&cnt=8&units=metric'
        + '&lang=' + lang + '&callback=?',
        function (data) {
            fnOK.call(this,data);
        }
    );
}