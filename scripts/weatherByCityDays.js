function getWeatherByCityDays(lang, fnOKDays, cityName) {
    $.getJSON(
        'http://api.openweathermap.org/data/2.5/forecast/daily?q=' 
        + cityName + '&APPID=19e6212ba1a15130d764c8ce642a543b&cnt=6&units=metric'
        + '&lang=' + lang + '&callback=?',
        function (data) {
            fnOKDays.call(this,data);
        }
    );
}