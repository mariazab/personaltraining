import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import moment from 'moment';
import 'react-bootstrap';
import Customerlist from "./Customerlist";

class AddTraining extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: '', duration: '', activity: ''};
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //let formatDate = moment(this.state.date).format("x");
        let formatDate = this.state.date + ":00.000+0000";
        const newTraining = {date: formatDate, duration: this.state.duration, activity: this.state.activity, customer: this.props.customer};
        this.props.addTraining(newTraining);
        this.simpleDialog.hide();
    }

    render() {
        return (
          <div>
          <button className="btn btn-info" onClick={() => this.simpleDialog.show()}>Add training</button>
          <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Add training">
             <form>
                 <div className="form-group">
                     <input type="datetime-local" placeholder="Date" className="form-control" name="date" onChange={this.handleChange} />
                 </div>
                 <div className="form-group">
                     <input placeholder="Duration" className="form-control" name="duration" onChange={this.handleChange} />
                 </div>
                  <div className="form-group">
                     <input placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange} />
                 </div>
                  
             </form>
             <button className="btn btn-success" style={{margin: 10}} onClick={this.handleSubmit}>Save</button>
          </SkyLight>
          
         </div>
            )
        }
}

export default AddTraining;