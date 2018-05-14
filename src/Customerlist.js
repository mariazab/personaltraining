import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddCustomer from './AddCustomer';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import AddTraining from './AddTraining';


class Customerlist extends Component {
    constructor(props){
        super(props);
        this.state = { customers: [] };
     
    }
   

    componentDidMount() {
        this.loadCustomers();
        
    }
    

    //Load the customers
    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                customers: responseData.content,
            });
        })
    }

    // Add new customer
    addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(res => this.loadCustomers())
        .catch(err => console.error(err))
    }

    //Delete a customer
    onDelClick = (idLink) => {
        console.log(idLink);
        confirmAlert({
            title: 'Confirm to proceed',
            message: 'Are you sure you want to delete this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => { 
                    fetch(idLink, {method: 'DELETE'})
                    .then(res => this.loadCustomers())
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

       // Add new training
       addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(
            toast.success("Training added", {
            position: toast.POSITION.BOTTOM_LEFT
        })
        )
        .catch(err => console.error(err))
        console.log(newTraining);
        
    }

    render() {
        return (
            <div className="App-body">
                <div className="container-fluid">
                    <div className="row" style={{margin: 10}}>
                        <AddCustomer addCustomer={this.addCustomer}/>
                    </div>
                    <ReactTable data={this.state.customers}
                    columns={[
                        {
                            columns: [
                                {
                                    Header: "Id",
                                    accessor: "links[0].href",
                                    show: false
                                },
                                {
                                    Header: "First name",
                                    accessor: "firstname",
                                    filterable: true,
                                },
                                {
                                    Header: "Last name",
                                    accessor: "lastname"
                                },
                                {
                                    Header: "Street Address",
                                    accessor: "streetaddress"
                                },
                                {
                                    Header: "Postcode",
                                    accessor: "postcode"
                                },
                                {
                                    Header: "City",
                                    accessor: "city"
                                },
                                {
                                    Header: "Email",
                                    accessor: "email"
                                },
                                {
                                    Header: "Phone number",
                                    accessor: "phone"
                                },
                                {
                                    id: "button",
                                    accessor: "links[0].href",
                                    sortable: false,
                                    filterable: false,
                                    width: 140,
                                    Cell: ({value}) => (<AddTraining addTraining={this.addTraining} loadCustomers={this.loadCustomers} customer={(value)} />)
                                },
                                {
                                    id: "button",
                                    accessor: "links[0].href",
                                    sortable: false,
                                    filterable: false,
                                    width: 100,
                                    Cell: ({value}) => (<button className="btn btn-danger" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
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

export default Customerlist;