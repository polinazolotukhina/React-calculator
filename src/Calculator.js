import React, { Component } from 'react';
import './App.css';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      total: 0,
      operator: '',
      items: [],
      results: [],
      showInput: false,
      name: '',
    };
    this.handleType = this.handleType.bind(this);
    this.saveName = this.saveName.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.getResult = this.getResult.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.delete = this.delete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.enterName = this.enterName.bind(this);


  }

  handleType (e) {
    const value = e.target.attributes.getNamedItem('data-filter').value;

    this.setState((prevState) => {
      const current = (this.state.current == 0 || this.state.current == this.state.total ) ? '' : this.state.current;
      return {current: parseInt(current + value)};
    });

  }
  calculate (sign, number) {
    const total = this.state.total;
    console.log(total);
    switch(sign){
      case "-":
      return total - number;
      break;
      case "+":
      return  total + number;
      break;
      case "*":
      return  total * number;
      break;
      case "/":
      return  total / number;
      break;
      default:
      return 0;
    }
  };

  handleAction (e) {
    const operator = e.target.attributes.getNamedItem('data-filter').value;

    this.setState((prevState) => {
      return {
        total: prevState.current,
        operator: operator,
        current: 0,
        showInput: false
      }
    });

    console.log(this.state);
  }
  getResult () {
    this.setState({
      current: this.calculate(this.state.operator, this.state.current)
    });
  }
  cancel(){
    this.setState({
      current: '',
      showInput: false
    });
  }
  save(){
    const data =   {
      name: this.state.name,
      date: Date(),
      result: this.state.current,
      showInput: false
    }
    this.setState({
      results: [
        ...this.state.results,
        data
      ],
      showInput: false

    })
  }
  delete(e) {
         const index = parseInt(e.target.value, 1);
         this.setState(state => {
             state.results.splice(index, 1);
             return {items: state.results};
         });
     }
onSubmit(){
  this.setState({
    userName: this.state.userInput,
    showInput: false
  })
}
saveName(e){
  this.setState({name:e.target.value})
}
enterName(){
  this.setState({showInput: true})
}

  render() {
    return (
<div className="container">
  <div className="row">
      <div className="col-md-7 col-xs-12">
        <div className="text-center">
            <h2>Result: {this.state.current} </h2>
        </div>
        <div className="row">
            <button className="col-xs-3" data-filter="7" onClick={this.handleType}>7</button>
            <button className="col-xs-3"  data-filter="8" onClick={this.handleType} >8</button>
            <button className="col-xs-3"  data-filter="9" onClick={this.handleType} >9</button>
            <button className="col-xs-3"  data-filter="+" onClick ={this.handleAction} >+</button>
        </div>
        <div className="row">
            <button className="col-xs-3" data-filter="4" onClick={this.handleType}>4</button>
            <button className="col-xs-3" data-filter="5" onClick={this.handleType}>5</button>
            <button className="col-xs-3" data-filter="6" onClick={this.handleType}>6</button>
            <button className="col-xs-3" data-filter="-" onClick ={this.handleAction}  >-</button>
        </div>
        <div className="row">
            <button className="col-xs-3" data-filter="1" onClick={this.handleType}>1</button>
            <button className="col-xs-3" data-filter="2" onClick={this.handleType}>2</button>
            <button className="col-xs-3" data-filter="3" onClick={this.handleType}>3</button>
            <button className="col-xs-3" data-filter="*" onClick ={this.handleAction}  >*</button>
        </div>
        <div className="row">
            <button className="col-xs-3" data-filter="0" onClick={this.handleType}>0</button>
            <button className="col-xs-3" onClick={this.enterName}>save</button>
            <button className="col-xs-3" onClick={this.cancel}>cancel</button>
            <button className="col-xs-3" data-filter="/" onClick ={this.handleAction}  >/</button>
            <button className="col-xs-12" onClick={this.getResult}>=</button>
       </div>
    </div>
  <div className="col-md-5 col-xs-12">
     <ul>
     <h2>Saved Maths:</h2>
          {
            this.state.results.map((item, index) => <li key={index}>number:{item.result} name:{item.name} date: {item.date} <button value={index} onClick={this.delete}>delete</button></li>)
          }
      </ul>
  </div>
    <div className="col-md-7 col-xs-12">
      {this.state.showInput && <div className="text-center"><h2 >Please enter your name to save the result</h2><input onChange={this.saveName}/><button onClick={this.save}>submit</button></div>}
</div>
      </div>
</div>
    );
  }
}

export default Calculator;
