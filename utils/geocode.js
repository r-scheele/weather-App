const request = require("request")

const geocode = (address, callback)=>{
  const url = `http://api.positionstack.com/v1/forward?access_key=40e42246a7d6e8d49985860148cb55dd&query=${address}&geojson`
  request({url},(error,{body})=>{
    const res1 = JSON.parse(body).data[0]
    if(error){
      callback("Unable to connect to location services! ",undefined)
    }else if(body.error){
      callback("Cannot get location. ",undefined)
    }else{
      callback(undefined,{
        latitude: res1.latitude,
        longitude: res1.longitude,
        location: res1.label,
        region: res1.region,
        continent: res1.continent,
      })
    }
  })

}

module.exports= geocode