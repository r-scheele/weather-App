const request = require("request")

const forecast = (latitude,longitude, callback)=>{
  const apiKey = "df268baf35a395f3bb16d07bd0a78e13"
 const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`  
 request({url},(error,{body})=>{
  if(error){
    callback("Unable to connect to location services! ",undefined)
  }else if(body.error){
    callback("Unable to access weather services, please try again",undefined)
  }else{
    const ans = JSON.parse(body).current.weather[0].description +", And the temperature is currently " + JSON.parse(body).current.temp+ " degrees"
    callback(undefined,ans)
 }})
}

module.exports = forecast