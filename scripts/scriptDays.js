$(function(){
    
    moment.locale('uk');
    
    $('#btnGetWeather').click(function () {
        getWeatherByCityDays('ua', dataReceivedDays, $('#inputCityName').val());
    });
    $('#inputCityName').keypress(function(e) {
        var ENTER_KEY_CODEDays = 13;
        if ( e.which === ENTER_KEY_CODEDays ) 
        {
            $('#btnGetWeather').trigger('click');
            return false;
        }
    });    
    
    
    getWeatherDataDays('ua', dataReceivedDays);
    
    function dataReceivedDays(data) {
        var offsetdays = (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC в секундах
        $("#dayly tr").remove();
        

        $.each(data.list, function(){
            // "this" тримає об'єкт прогнозу звідси: http://openweathermap.org/forecast16
            var localTimeDays = new Date(this.dt*1000 - offsetdays); // конвертуємо час з UTC у локальний
            addWeatherDays(
                this.weather[0].icon,
                moment(localTimeDays).calendar(),	// Використовуємо moment.js для представлення дати
                this.weather[0].description,
                Math.round(this.temp.day) + '&deg;C',
                this.humidity
                
            );
        });
    }

    function addWeatherDays(icon, td, description, temp, humidity){
        var markupdays = '<tr>' +
                + '<td>' + '<img src="images/icons/' + 
                  icon + '.png" width=100%/>' + '</td>' + '<td>' + temp + '</td>' + '<td>' + td + '</td>' + 
                 + '<td>' + description  + '</td>' + '<td>' + humidity + '  %' + '</td>' + '</tr>';  
        dayly.insertRow(-1).innerHTML = markupdays;// Додаємо рядок до таблиці
    }
 
       
});

