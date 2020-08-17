const request = require("request")
const geocode = require("../utils/geocode")
const forecast = require("../utils/forecast")
const path =require("path")
const express = require("express")
const hbs = require("hbs")


const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../template/views")
const partialsPath = path.join(__dirname,"../template/partials")



//setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//setup the directory to serve static files
app.use(express.static(publicDirPath))

app.get("",(req,res)=>{
  res.render("index",{
    title: "Weather App",
    name: "Habeeb Olamilekan"
  })
})
app.get("/about",(req,res)=>{
  res.render("about",{
    title:"About me",
    name: "Habeeb olamilekan"
  })
})
app.get("/help",(req,res)=>{
  res.render("Help",{
    message:"This is an help page",
    name: "Habeeeb olamilekan",
    title: "Help",
  })
})
app.get("/weather",(req,res)=>{
  if(!req.query.address){
    return res.send({
      error: "Please provide an address to search",
    })
  }else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
          if(error){
            return res.send({
              error: "Cannot identify location. "
            })}
            forecast(latitude,longitude,(error,forecastData)=>{
              if(error){
                return res.send({
                  error: error,
                })}
                res.send({
                  forecast:"There is "+forecastData+ " in "+ location+".",
                })
            })
        })
  }
})

app.get("/product",(req,res)=>{
  if (!req.query.search){
    return res.send({
      error: "Please provide an address query ", 
    })
  }
  res.send({
    products: []
  })
})

app.get("/help/*",(req,res)=>{
  res.render("404",{
    title: "404 help",
    name: "Habeeb Olamilekan",
    errorMessage: "Help article not found. "
  })
})
app.get("*",(req,res)=>{
  res.render("404",{
    title:"404",
    name: "Habeeb Olamilekan",
    errorMessage: "Page not found! ",
  })
})


app.listen(port, ()=>{
  console.log("Server is up on port "+port)
})