const request = require("request")

const geocode = (address, callback)=>{
  const url = `http://api.positionstack.com/v1/forward?access_key=40e42246a7d6e8d49985860148cb55dd&query=${address}&geojson&limit=1`
  request({url},(error,{body})=>{
    const res = JSON.parse(body).data[0]
    if(error){
      callback("Unable to connect to location services! ",undefined)
    }else if(body.error){
      callback("Cannot get location. ",undefined)
    }else{
      callback(undefined,{
        latitude: res.latitude,
        longitude: res.longitude,
        location: res.label,
        region: res.region,
        continent: res.continent,
      })
    }
  })

}

module.exports= geocode