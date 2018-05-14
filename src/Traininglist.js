import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment';
import AddTraining from './AddTraining';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Traininglist extends Component {
    state = { trainings: [] };

    componentDidMount() {
        this.loadTrainings();
    }

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                trainings: responseData,
            });
        })
    }

    //Delete a training
    onDelClick = (idLink) => {
        console.log(idLink);
        confirmAlert({
            title: 'Confirm to proceed',
            message: 'Are you sure you want to delete this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => { 
                    fetch("https://customerrest.herokuapp.com/api/trainings/" + idLink, {method: 'DELETE'})
                    .then(res => this.loadTrainings())
                    .catch(err => console.error(err))
                    
                    toast.success("Delete successful", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                }
                  
              },
              {
                label: 'No',
              }
            ]
          });
        
        
    }


    render() {
        return (
            <div className="App-body">
                <div className="container-fluid">
                    <ReactTable data={this.state.trainings}
                    columns={[
                        {
                            columns: [
                                {
                                    Header: "Id",
                                    accessor: "id",
                                    show: false
                                },
                                {
                                    Header: "Date",
                                    accessor: "date",
                                    Cell: props => <span>{moment.utc(props.value).format('DD.MM.YYYY hh:mm a')}</span>
                                },
                                {
                                    Header: "Duration",
                                    accessor: "duration"
                                },
                                {
                                    Header: "Activity",
                                    accessor: "activity"
                                },
                                {
                                    Header: "Customer",
                                    id: "customer",
                                    accessor: d => d.customer.firstname + ' ' + d.customer.lastname
                                },
                                {
                                    id: "button",
                                    accessor: "id",
                                    sortable: false,
                                    filterable: false,
                                    width: 100,
                                    Cell: ({value}) => (<button className='btn btn-danger' onClick={()=>{this.onDelClick(value)}}>Delete</button>)
                                }
                            ]
                        }
                    ]}
                    defaultPageSize={10}
                    filterable
                    className="-highlight" >
                    </ReactTable>,
                </div>
                <ToastContainer />
            </div>
        );
    }
}
export default Traininglist;