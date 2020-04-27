import axios from 'axios'
const getLocationFormatted = async (latitude,longitude)=>{
    try{
    
        const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_API_KEY}&language=fr&limit=1`)
    
        const features = res.data.features[0].context
        const formattedText = features[1].text_fr + ", "+ features[2].text_fr +", "+features[3].text_fr
        return formattedText
    }catch(e){
        console.log(e)
        return ''
    }
}
export default getLocationFormatted
