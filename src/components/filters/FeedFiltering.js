import React,{useState} from 'react'
import {connect} from 'react-redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import {AiOutlineSearch} from 'react-icons/ai'
import { sortByPoints, sortByDate,setDistanceRadius,setTextFilter } from '../../actions/feedFilters'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const TippedSlider = createSliderWithTooltip(Slider)

const FeedFiltering = ({filters,setDistanceRadius,sortByDate,sortByPoints,setTextFilter})=>{
    const [text,setText] = useState(filters.text)
    const [displayIcon,setDisplayIcon] = useState(true)
    const [distanceRadius,setStateDistanceRadius] = useState(Math.round(1000*Math.log10(10*filters.distanceRadius)))
    
    return (
        <div className="feed__filter-container">
            <div className="feed__search">
                {displayIcon && (<i className="feed__icon"><AiOutlineSearch/></i>)} 
                <input
                    type="text"
                    onFocus={()=>setDisplayIcon(false)}
                    onBlur={()=>setDisplayIcon(true)}
                    value={text}
                    className="feed__input"
                    onChange={(e)=>{
                        setText(e.target.value)
                        setTextFilter(e.target.value)
                    }}
                    placeholder="Rechercher une annonce"
                />
            </div>
            <div className="feed__slider">
                <p>Afficher les annonces dans un rayon de (km): </p>
                <TippedSlider
                    style={{width:400}}
                    min={0}
                    className="feed__tippedslider"
                    max={4000}
                    value = {distanceRadius}
                    onChange={(value)=>{
                        setStateDistanceRadius(value)
                        setDistanceRadius(Math.round(10**(value/1000)/10))
                    }}
                    tipFormatter={(value)=>Math.round(10**(value/1000))/10}
                    marks = {{1000:"1",2000:"10",3000:"100",4000:"1000"}}
                />
            </div>
            
        </div>
    )
}
const mapStateToProps = (state)=>({
    filters : state.feedFilters
})
const mapDispatchToProps = (dispatch)=>({
    setTextFilter : (text)=>dispatch(setTextFilter(text)),
    sortByPoints : ()=>dispatch(sortByPoints()),
    sortByDate : ()=>dispatch(sortByDate()),
    setDistanceRadius : (radius)=>dispatch(setDistanceRadius(radius))
}) 
export default connect(mapStateToProps,mapDispatchToProps)(FeedFiltering)