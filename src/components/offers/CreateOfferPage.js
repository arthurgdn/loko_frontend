import React from 'react'
import {connect} from 'react-redux'
import OfferForm from './OfferForm'
import {startAddOffer} from '../../actions/offers'
class  CreateOfferPage extends React.Component{
    onSubmit=(offer)=>{
        this.props.startAddOffer(offer)
        this.props.history.push('/')
    }
    render(){
        return (
            <div>
            <div className="page-header">
                <div className="content-container">
                <h1 className="page-header__title">Créer une annonce</h1>
                <div className="content-container">
                <OfferForm
                onSubmit={this.onSubmit}
                /></div>
            </div></div>
        
    </div>
        )
    }
}
const mapDispatchToProps=(dispatch)=>({
    startAddOffer: (offer)=>dispatch(startAddOffer(offer))
}) 
export default connect(undefined,mapDispatchToProps)(CreateOfferPage)