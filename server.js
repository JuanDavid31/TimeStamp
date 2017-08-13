var express = require("express");
var app = express();


app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/views/index.html");
});


app.listen(process.env.PORT || 3001, function(){
    console.log("Servidor iniciado");
});
