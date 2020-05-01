import axios from 'axios'
const getLocationFormatted = async (latitude,longitude)=>{
        console.log(latitude,longitude)
        
        if(!!latitude && !!longitude){
            try{
            const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_API_KEY}&language=fr&limit=1`)
            console.log(res.data)
            const features = res.data.features[0].context
            
            
            return  features[1].text_fr + ", "+ features[2].text_fr +", "+features[3].text_fr
            }catch(e){
                console.log(e)
                return ''
            }}
       return ''
}
export default getLocationFormatted
