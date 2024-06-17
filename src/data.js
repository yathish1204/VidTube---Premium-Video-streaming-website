export const API_KEY = 'AIzaSyDwuEWdUBki0qfHeWWZ2QjuQUIgBuZx_iU';

export const valueConvertor = (value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M";
    }else if(value>=1000){
        return Math.floor(value/1000)+"K";
    }
    else if(value<1000){
        return value
    }
}