import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as recordProvider from '../providers/records';

class Record extends Component{
    constructor(props){
        super(props);
        this.state={
            isEdit: false
        }
    }

    handleToggle(){
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    handleUpdate(event){
        event.preventDefault();
        let record = {
            date: this.refs.date.value,
            title: this.refs.title.value,
            amount: Number.parseInt(this.refs.amount.value, 0)
        }
        recordProvider.update(this.props.record.id, record).then(
            response => {
                this.setState({
                    isEdit: false
                })
                this.props.handleEditRecord(this.props.record, response.data);
                console.log(response.data)
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    handleDelete(event){
        event.preventDefault();
        recordProvider.deleteRecord(this.props.record.id).then(
            response => {
                console.log(response.data);
                this.props.handleDeleteRecord(this.props.record);
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    recordForm(){
        return(
            <tr>
                <td>{this.props.record.id}</td>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button className='btn btn-success mr-2' onClick={this.handleToggle.bind(this)}>Edit</button>
                    <button className='btn btn-danger' onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        )
    }

    editForm(){
        return(
            <tr>
                <td><input type='text' name='date' defaultValue={this.props.record.date} ref='date'/></td>
                <td><input type='text' name='title' defaultValue={this.props.record.title} ref='title' /></td>
                <td><input type='text' name='amount' defaultValue={this.props.record.amount} ref='amount' /></td>
                <td> 
                    <button className='btn btn-success mr-2' onClick={this.handleUpdate.bind(this)}>Update</button>
                    <button className='btn btn-danger' onClick={this.handleToggle.bind(this)}>Cancel</button>
                </td>
            </tr>
        )
    }

    render(){
            if(this.state.isEdit){
               return this.editForm();
            }else{
               return  this.recordForm();
            }
        }
    }

Record.propTypes = {
    id: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number
}

export default Record;