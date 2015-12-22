$(function(){
    
    moment.locale('uk');
    
    $('#btnGetWeather').click(function () {
        getWeatherByCity('ua', dataReceived, showError, $('#inputCityName').val());
        getWeatherByCityDays('ua', dataReceivedDays, showErrorDay, $('#inputCityName').val());
    });
    
    $('#inputCityName').keypress(function(e) {
        var ENTER_KEY_CODE = 13;
        if ( e.which === ENTER_KEY_CODE ) 
        {
            $('#btnGetWeather').trigger('click');
            return false;
        }
    });    
    
    getWeatherData('ua', dataReceived, showError);
    
    function dataReceived(data) {
        var offset = (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC в секундах
        var city = data.city.name;
        var country = data.city.country;
        $("#hourly tr:not(:first)").remove();
        
        $.each(data.list, function(){
            // "this" тримає об'єкт прогнозу звідси: http://openweathermap.org/forecast16
            var localTime = new Date(this.dt*1000 - offset); // конвертуємо час з UTC у локальний
            addWeather(
                this.weather[0].icon,
                moment(localTime).calendar(),	// Використовуємо moment.js для представлення дати
                this.weather[0].description,
                Math.round(this.main.temp) + '&deg;C',
                this.main.humidity,
                this.wind.speed
            );
        });
        $('#city').html(city + ', <b>' + country + '</b>'); // Додаємо локацію на сторінку
    }

    function addWeather(icon, td, condition, temp, humidity, wind){
        var markup = '<tr>'+
            '<td>' + td + '</td>' + '<td>' + temp + '</td>' +
            '<td>' + '<img src="images/icons/'+ 
            icon +'.png" />' + '</td>' + '<td>' + condition  + '</td>' 
            + '<td>' + humidity+ '  %' + '</td>' + '<td>' + wind + ' m/s' + '</td>' + '</tr>';  
        hourly.insertRow(-1).innerHTML = markup; // Додаємо рядок до таблиці
    }    
    
    getWeatherDataDays('ua', dataReceivedDays, showError);
    function dataReceivedDays(data) {
        var offsetdays = (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC в секундах
        $("#dayly tr").remove();
        
        $.each(data.list, function(){
            // "this" тримає об'єкт прогнозу звідси: http://openweathermap.org/forecast16
            var localTimeDays = new Date(this.dt*1000 - offsetdays); // конвертуємо час з UTC у локальний
            addWeatherDays(
                this.weather[0].icon,
                this.weather[0].description,
                moment(localTimeDays).calendar(),	// Використовуємо moment.js для представлення дати
                Math.round(this.temp.day) + '&deg;C',
                this.humidity
            );
        });
    }
    
    function addWeatherDays(icon, td, condition, temp, humidity){
        var markupdays = '<tr>' +
                + '<td>' + '<img src="images/icons/' + 
                icon + '.png"/>'  + '</td>' + '<td>' + temp + '</td>' + '<td>' + td + '</td>' + 
                + '<td>' + condition  + '</td>' + '<td>' + humidity + '  %' + '</td>' + '</tr>';  
        dayly.insertRow(-1).innerHTML = markupdays;// Додаємо рядок до таблиці
    }
   
    function showError(msg){
        $('#error').html('Сталася помилка: ' + msg);
    }
    function showErrorDay(msg){
        $('#error').html('Сталася помилка: ' + msg);
    }
});

