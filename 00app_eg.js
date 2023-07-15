
// //////////////////// MAIN PAGE IS APP.JS  WHICH IS NEXT ONE  ///////////////////////////////////////

// in this page we will learn how to use api in our website

const express = require("express");
const https=require("https");
// we dont have to install https as it already installed in npm modules
// we are using https to performe get request to any url/api
const app=express();

app.get("/",function(req,res){
    const url ="https://api.openweathermap.org/data/2.5/weather?q=pune&units=metric&appid=2ee793d3942d5f9e4e0dea765388ba1d#";
    // in giving url if we make mistake we might get error like 404 ,401 etc
    // you can find meaning of them on internet
    https.get(url,function(response){
        console.log(response);
// instead of console.logging response we can console log part of it as console.log(response.serverstatus)
        console.log(response.statusCode);

        response.on("data",function(data){
            // we use on methord to serch foor some data in response
            const weatherdata= JSON.parse(data);
            // JSON.parse()  convet string into javascript object
            // console.log(weatherdata);

            // const object = {
            //     name :"sankalp",
            //     favouritefood :"ramen"
            // }
            // console.log(JSON.stringify(object));
            // JSON.stringify()  convert javascript object into string

            const weathertemp= weatherdata.main.temp;
            const discription=weatherdata.weather[0].description;
            // you can get those path by using json crome ectension 
            // first open url then click on object that you want then click on green icon then on copy_path
            // then          name.copy.path
            console.log(weathertemp);
            console.log(discription);

            // openweather api also provide icon/image for all weathers , you cann find its link on their page and ,code for our image is given in    icon object

            const icon=weatherdata.weather[0].icon;

            const imageURL="https://openweathermap.org/img/wn/"+icon+ "@2x.png"


            res.write("<h1>tempreture in pune is "+weathertemp+"degree calcius.</h1>")
            res.write("<h3>weather is currently "+discription +"</h3>");
            res.write("<img src="+imageURL+">");
            res.send()
            // when we need to send multiple line of code then   write() is used then all write() get send simulataniously after send()
        })

    })
})


app.listen(3000,function(){
    console.log("Server is reunning on localhost:3000 : ");
})