const express = require('express');

const app = express();

app.listen((err) => {

if(err){
    console.lo("Error : ",err);
    return;
}
console.log("Server is started....");

})
