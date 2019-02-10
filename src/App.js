import React, { Component } from 'react';
import Records from './components/records';
import RecordForm from './components/recordForm';
import RecordBox from './components/recordBox';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      record:'',
      credit:'',
      debit:'',
      amount:''
    }
  }

  getAmountInfo(credit, debit, balance){
    this.setState({
      credit: credit,
      debit: debit,
      amount: balance
    })
  }

  getNewRecord(record){
      this.setState({
        record: record
      })
  }

  render() {
    return (
      <div className="App container">
        <h1 className='text-center'>Hello User</h1>
        <div className='row mt-5'>
            <RecordBox text='credit' type='success' amount={this.state.credit}/>
            <RecordBox text='debit' type='danger' amount={this.state.debit}/>
            <RecordBox text='balance' type='primary' amount={this.state.amount}/>
        </div>
        <RecordForm getNewRecord={this.getNewRecord.bind(this)} />
        <Records newRecord={this.state.record} getInfo = {this.getAmountInfo.bind(this)}/>
      </div>
    );
  }
}

export default App;
