
function getWeatherDataDays (lang, fnOKDays, fnErrorDays) {
    navigator.geolocation.getCurrentPosition(locSuccessDay, locErrorDays);

    function locSuccessDay(position) {
        // Check cache
        var cacheDays = localStorage['weatherCacheDays'] && JSON.parse(localStorage['weatherCacheDays']);
        var currDateDays = new Date();
        // If the cache is newer than 1 minutes, use the cache
        if (cacheDays && cacheDays.timestamp && cacheDays.timestamp > currDateDays.getTime() - 1*60*1000){
            fnOKDays.call(this, cacheDays.data);
        } else {
            $.getJSON(
                'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + position.coords.latitude + '&lon=' +
                position.coords.longitude + '&cnt=6&units=metric&APPID=19e6212ba1a15130d764c8ce642a543b' + '&lang=' + lang + '&callback=?',
                
                function (response) {
                    // Store the cache
                    localStorage.weatherCacheDays = JSON.stringify({
                        timestamp: (new Date()).getTime(),	// getTime() returns milliseconds
                        data: response
                    });
                    // Call the function again
                    locSuccessDay(position);
                }
            );
        }
    }

    function locErrorDays(error) {
        var messagedays = 'Location error. ';
        switch(error.code) {
            case error.TIMEOUT:
                messagedays += 'A timeout occured! Please try again!';
                break;
            case error.POSITION_UNAVAILABLE:
                messagedays += 'We can\'t detect your location. Sorry!';
                break;
            case error.PERMISSION_DENIED:
                messagedays += 'Please allow geolocation access for this to work.';
                break;
            case error.UNKNOWN_ERROR:
                messagedays += 'An unknown error occured!';
                break;
        }
        fnErrorDays.call(this, messagedays);
    }
}