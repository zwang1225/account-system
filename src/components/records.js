import React, { Component } from 'react';
import Record from './record';
// import axios from 'axios';
import * as recordsProvider from '../providers/records';

class Records extends Component{
    constructor(props){
        super(props);
        this.state={
            error: null,
            isLoaded: false,
            records:[],
            credit:0,
            debit: 0,
            balance:0
        }
    }

    handleEditRecord(record, data){
        console.log(data)
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.map( (item, index) => {
        if(index !== recordIndex) {
            // This isn't the item we care about - keep it as-is
            return item;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...data
        };
        });
        this.setState({
            records: newRecords
        },()=>console.log(this.state.records));
    }

    handleDeleteRecord(record){
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.filter( (item, index) => index !== recordIndex);
        this.setState({
            records: newRecords
          });
    }

    credit(){
        let credit = this.state.records.filter((record)=>{
          return record.amount >= 0;
        })
        let r = credit.reduce((prev, curr)=>{
            return prev + Number.parseInt(curr.amount, 0);
          }, 0)
        
        this.setState({
            credit: r
        })
    }
  
    debit(){
      let debit = this.state.records.filter((record)=>{
        return record.amount < 0;
      })
      let r = debit.reduce((prev, curr) => {
        return prev + Number.parseInt(curr.amount, 0);
      }, 0);
      
      this.setState({
            debit: r
      })
    }
  
    balance(){
      let r = this.state.credit + this.state.debit;

      this.setState({
            balance: r
      })
    }

    componentDidMount(){
        recordsProvider.getAllRecords().then(
            res => {
            this.setState({
                records: res.data,
                isLoaded: true
            });
            this.credit();
            this.debit();
            this.balance();
            this.props.getInfo(this.state.credit, this.state.debit, this.state.balance);
        }        
        ).catch(
            error => this.setState({
                isLoaded: true,
                error
            })
        )
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.records !== nextState.records || this.props.record !== nextProps.record){
            return true;    
        }
        return false
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.newRecord !== ''){
            this.setState({
                records:[
                    ...this.state.records,
                    nextProps.newRecord
                ]
            })
        }
    }

    render(){
        const { error, isLoaded, records } = this.state;
        if(error){
            return <div>error: {error.message}</div>;
        }else if(!isLoaded){
            return <div>the data is loading.....</div>
        }else{
            return(
                <div>
                    <h2>Records</h2>
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => 
                            <Record record={record} 
                            key={record.id} 
                            handleEditRecord={this.handleEditRecord.bind(this)}
                            handleDeleteRecord={this.handleDeleteRecord.bind(this)}
                        />)}
                    </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default Records;