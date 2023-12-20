import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import web3 from '.././web3';
import contract from '.././contract';

class Chemist extends Component {
	state = {
		current : 0,
		makepdv : 0,
		gmedpacn : 0,
		gmedmed : ''
	};
	render() {
		  return (
				<div id="sidebar">

				<div className="sidenav">
				  <center><h4>Pharmacie</h4></center>
				  <br></br>
				  <center><h6><button onClick={() => {
				  	this.setState({current : 1});
				  	this.setState({makepdv : 0});
				  }} className="btn btn-light">Donner Medicament</button></h6></center>
				</div>

				{
					(this.state.current==1)
					?    (<form id="gmed" className="abc">	
					  <div className="form-group" style={{marginTop: 30}}>
					    <label htmlFor="exampleInputEmail1">Numero carte vitale Patient</label>
					    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Num carte vitale Patient"></input>
					 </div>
					  <div className="aab">
					  <button onClick={async(event) => {
					  	event.preventDefault();
					  	const accounts = await web3.eth.getAccounts();
					  	let x = document.querySelector("#gmed");
					  	this.setState({ gmedpacn : x.elements[0].value });
					  	x.elements[0].value='';
					  	await contract.methods.giveMedicines(this.state.gmedpacn).call({from : accounts[0]},(error,result) => {
					  		if(!error)
					  		{
						  		this.setState({
						  			gmedmed : web3.utils.hexToAscii(result),
						  		});
						  		this.setState({makepdv : 1});
						  	}	
					  	})
					  }}className="btn btn-primary">Submit</button>
					  </div>
					</form>)
					: (<span></span>)
				}

			    {
			    	(this.state.makepdv==1)
					?    (<div><h4 className="yf">Medicines : {this.state.gmedmed}</h4></div>)
					: (<span></span>)
				  }
				</div>
		  );
	}
}

export default Chemist;