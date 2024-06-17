export const API_KEY = 'vsdszaviludfefegbhuvlnvvkfiofwwqfgBuZlffs';

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