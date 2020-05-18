import React ,{useEffect,useState}from 'react'
import {connect} from 'react-redux'
import OfferForm from './OfferForm'
import {startEditOffer} from '../../actions/offers'
class  EditOfferPage extends React.Component{
    
    onSubmit=(offer,image)=>{
        console.log('submitted:',offer,image)
        this.props.startEditOffer(this.props.offer._id,offer,image)
        this.props.history.push('/home')
    }
    render(){
        return (
            <div>
            <div className="page-header">
                <div className="content-container">
                <h1 className="page-header__title">Modifier l'annonce</h1>
                <div className="content-container">
                <OfferForm
                onSubmit={this.onSubmit}
                inGroup={false}
                {...this.props.offer}
                /></div>
            </div></div>
        
    </div>
        )
    }
}
const mapStateToProps = (state,props)=>({
    offer : state.offers.find((offer)=>offer._id===props.match.params.id)
})
const mapDispatchToProps=(dispatch)=>({
    startEditOffer: (offer,image)=>dispatch(startEditOffer(offer,image))
}) 
export default connect(mapStateToProps,mapDispatchToProps)(EditOfferPage)