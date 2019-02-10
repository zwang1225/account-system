import React, { Component } from 'react';
import * as recordProvider from '../providers/records';

class RecordForm extends Component{
    constructor(props){
        super(props);
        this.state={
            date:'',
            title:'',
            amount:''
        }
    }

    handleValueChange(e){
        let {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        let data = {
            date: this.state.date,
            title: this.state.title,
            amount: this.state.amount
        }
        recordProvider.postRecord(data).then(
            response => {
                console.log(`new record posted ${response.data}`);
                this.props.getNewRecord(response.data);
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    render(){
        const { date, title, amount } = this.state;
        let disable = true;
        if(date && title && amount){
            disable = false;
        }

        return(
            <form className='form-inline mt-5 ml-1 mb-2' onSubmit={this.handleSubmit.bind(this)}>
                <div className='form-group mr-2'>
                    <input type='text' className='form-control' placeholder='date' name='date' onChange={this.handleValueChange.bind(this)}/>
                </div>
                <div className='form-group mr-2'>
                    <input type='text' className='form-control' placeholder='title' name='title' onChange={this.handleValueChange.bind(this)}/>
                </div>
                <div className='form-group mr-2'>
                    <input type='text' className='form-control' placeholder='amount' name='amount' onChange={this.handleValueChange.bind(this)}/>
                </div>
                <button type='submit' className='btn btn-primary' disabled={disable}>create record</button>
            </form>
        )
    }
}

export default RecordForm;