import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import 'react-bootstrap';

class AddCustomer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''};
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const newCustomer = {firstname: this.state.firstname, lastname: this.state.lastname, streetaddress: this.state.streetaddress, postcode: this.state.postcode, city: this.state.city, email: this.state.email, phone: this.state.phone};
        this.props.addCustomer(newCustomer);
        this.simpleDialog.hide();
    }



      render() {
          return (
            <div>
            <button className="btn btn-info" onClick={() => this.simpleDialog.show()}>Add customer</button>
            <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Add customer">
               <form>
                   <div className="form-group">
                       <input placeholder="First name" className="form-control" name="firstname" onChange={this.handleChange} />
                   </div>
                   <div className="form-group">
                       <input placeholder="Last name" className="form-control" name="lastname" onChange={this.handleChange} />
                   </div>
                    <div className="form-group">
                       <input placeholder="Street address" className="form-control" name="streetaddress" onChange={this.handleChange} />
                   </div>
                    <div className="form-group">
                       <input placeholder="Postcode" className="form-control" name="postcode" onChange={this.handleChange} />
                   </div>
                    <div className="form-group">
                       <input placeholder="City" className="form-control" name="city" onChange={this.handleChange} />
                   </div>
                    <div className="form-group">
                       <input placeholder="Email" className="form-control" name="email" onChange={this.handleChange} />
                   </div>
                   <div className="form-group">
                       <input placeholder="Phone" className="form-control" name="phone" onChange={this.handleChange} />
                   </div>
               </form>
            <button className="btn btn-success" style={{margin: 10}} onClick={this.handleSubmit}>Save</button>
            </SkyLight>
            
           </div>
          )
      }
}

export default AddCustomer;