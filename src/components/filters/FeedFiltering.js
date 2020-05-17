import React,{useState} from 'react'
import {connect} from 'react-redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import { sortByPoints, sortByDate,setDistanceRadius,setTextFilter } from '../../actions/feedFilters'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const TippedSlider = createSliderWithTooltip(Slider)

const FeedFiltering = ({filters})=>{
    const [text,setText] = useState(filters.text)
    const [distanceRadius,setStateDistanceRadius] = useState(filters.distanceRadius)
    
    return (
        <div>
        <p>Afficher les annonces suivantes</p>
            <select
                className="select"
                value={filters.sortBy}
                onChange={(e) => {
                    if (e.target.value === 'date') {
                        sortByDate()
                    } else if (e.target.value === 'points') {
                        sortByPoints
                    }
                }}
            >
              <option value="date">Plus récentes</option>
              <option value="points">Plus pertinentes</option>
          </select>
          <input
                type="text"
                value={text}
                onChange={(e)=>{
                    setText(e.target.value)
                    setTextFilter(e.target.value)
                }}
                placeholder="Rechercher une annonce"
          />
        <p>Afficher les annonces dans un rayon de : </p>
          <TippedSlider
          min={0}
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
    )
}
const mapStateToProps = (state)=>({
    filters : state.feedFilters
})
const mapDispatchToProps = (dispatch)=>({
    setTextFilter : (text)=>dispatch(setTextFilter(text)),
    sortByPoints : ()=>dispatch(sortByPoints()),
    sortByDate : ()=>dispatch(sortByDate()),
    setDistanceRadius : ()=>dispatch(setDistanceRadius())
})
export default connect(mapStateToProps,mapDispatchToProps)(FeedFiltering)