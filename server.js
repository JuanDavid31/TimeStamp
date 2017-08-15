var express = require("express");
var app = express();

var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var hash = {};

(function(){
    hash["January"] = 1;
    hash["February"] = 2;
    hash["March"] = 3;
    hash["April"] = 4;
    hash["May"] = 5;
    hash["June"] = 6;
    hash["July"] = 7;
    hash["August"] = 8;
    hash["September"] = 9;
    hash["October"] = 10;
    hash["November"] = 11;
    hash["December"] = 12;
})();


app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/views/index.html");
});

app.get("/:fecha", function(req, res){

    var fecha = req.params.fecha,
        unix = null,
        date = null;

    if(esNatural(fecha)){ 
        unix = naturalAUnix(fecha); 
        date = unixADate(unix); console.log(unix, date);
    }else if(esUnix(fecha)){
        unix = fecha;
        date = unixADate(fecha);
    }

    res.send({unix: unix, date: date});
});

function esNatural(fecha){ 
    var mes = fecha.split(/(\W|,\W)/)[0];
    for(var i = 0; i < months.length; i++){
        if(months[i].toLowerCase().includes(mes.toLowerCase())){
            return true;
        }
    }
    return false;
}

function naturalAUnix(naturalDate){
    var fecha = naturalDate.split(/(\W|,\W)/);
    var anio = fecha[6];
    var mes = parseDia(hash[parseMes(fecha[0])])-1 + "";
    var dia = parseDia(fecha[2]);

    var date = new Date(anio, mes, dia);
    return  Date.parse(date)/1000;
}

function parseMes(mes){
    for(var i = 0; i < months.length; i++){
        if(months[i].toLowerCase().includes(mes.toLowerCase())){
            return months[i];
        }
    }
    return false;
}

function parseDia(dia){
    if(dia.length === 1){
        return "0" + dia;
    }
    return dia;
}

function unixADate(unix_timestamp){
   var a = new Date(unix_timestamp * 1000);
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year;
    return time;
}

function esUnix(date){
    if(Number(date) < Number((+ Date.now() ))){
        return true;
    }
    return false;
}

app.listen(process.env.PORT || 3002, function(){
    console.log("Servidor iniciado", hash.December);
    
});