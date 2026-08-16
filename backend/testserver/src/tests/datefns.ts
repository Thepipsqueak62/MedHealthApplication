import {compareAsc, format} from "date-fns";


var data = format(new Date(2014,1,11),"yyyy-MM-dd hh:mm:ss")
console.log(data)


const dates = [
    new Date(1995, 6, 2),
    new Date(1987, 1, 11),
    new Date(1989, 6, 10),

];
var datess = dates.sort(compareAsc)
console.log(datess)