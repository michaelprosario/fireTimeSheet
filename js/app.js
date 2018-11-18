function getShortDateFormat(objDate){
    var day = objDate.getDate();
    var monthIndex = objDate.getMonth();
    var year = objDate.getFullYear();
    return monthIndex + '/' + day +  '/' + year;    
}

// https://stackoverflow.com/questions/2732799/regex-time-validation-hhmm
function isValidTime(time) {
    var result = false, m;
    var re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
    if ((m = time.match(re))) {
        result = true;
    }
    return result;
}