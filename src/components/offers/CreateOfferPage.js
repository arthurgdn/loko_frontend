import React from 'react'
import {connect} from 'react-redux'
import OfferForm from './OfferForm'
import {startAddOffer} from '../../actions/offers'
class  CreateOfferPage extends React.Component{
    onSubmit=(offer,image)=>{
        console.log('submitted:',offer,image)
        this.props.startAddOffer(offer,image)
        this.props.history.push('/home')
    }
    render(){
        return (
            <div>
            <div className="page-header">
                <div className="content-container">
                <h1 className="page-header__title">Créer une annonce</h1>
                <div className="content-container">
                <OfferForm
                inGroup = {false}
                onSubmit={this.onSubmit}
                /></div>
            </div></div>
        
    </div>
        )
    }
}
const mapDispatchToProps=(dispatch)=>({
    startAddOffer: (offer,image)=>dispatch(startAddOffer(offer,image))
}) 
export default connect(undefined,mapDispatchToProps)(CreateOfferPage)