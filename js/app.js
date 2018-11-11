function getShortDateFormat(objDate){
    var day = objDate.getDate();
    var monthIndex = objDate.getMonth();
    var year = objDate.getFullYear();
    return monthIndex + '/' + day +  '/' + year;    
}