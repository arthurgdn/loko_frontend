import axios from 'axios'
const getLocationFormatted =  (latitude,longitude)=>{
        let formattedText
        if(!!latitude && !!longitude){
            axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_API_KEY}&language=fr&limit=1`).then(
            (res)=>{
                const features = res.data.features[0].context
                formattedText = features[1].text_fr + ", "+ features[2].text_fr +", "+features[3].text_fr
            }
        ).catch((e)=>console.log(e))
        }
        
    return formattedText?formattedText : ''
}
export default getLocationFormatted
