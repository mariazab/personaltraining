import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import Traininglist from './Traininglist';
import 'react-bootstrap';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); 

class Calendar extends Component {

    constructor(props){
        super(props);
        this.state = { trainings: [] };
     
    }
      
    componentDidMount() {
        this.loadTrainings();
    }

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then((response) => response.json())
        .then((responseData) => {
            var events = [];
            for(var i = 0; i < responseData.content.length; i++){
                /*var startDate = moment.utc(responseData.content[i].date).format();
                var endDate = moment.utc(moment(responseData.content[i].date).add(responseData.content[i].duration, 'm'));
                console.log("start date " + startDate);
                console.log("new date " + new Date(moment(responseData.content[i].date).utcOffset(responseData.content[i].date)));*/
                console.log(responseData.content[i].date);
                events.push({
                    start: moment.utc(responseData.content[i].date)._d,
                    end: moment.utc(responseData.content[i].date).add(responseData.content[i].duration, 'm')._d,
                    title: responseData.content[i].activity
                });
            }
                this.setState({
                    trainings: events,
                });
        
        })
    }

    render() {
        return (
            <div className="App-body">
                <div style={{height: 800}} className="container-fluid">
                <BigCalendar
                    defaultDate={new Date()}
                    events={this.state.trainings}
                    defaultView="month"
                    views={["month", "week", "day"]}
                    culture="en-GB"
                />
                </div>
            </div>
        );
    }
}

export default Calendar;
