import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import web3 from '.././web3';
import contract from '.././contract';

class NewPatient extends Component {
	state = {
	    acn : '',
	    name : '',
	    home : '',
	    no : '',
	    bg : '',
	    icid : '',
	    emer : ''
    };

	render() {
		  return (
				<div id="addpatient" >
					    <form id="newpatient" className="abc" >	
						<div style={{marginTop: 40}}>
					  <div className="form-group" >
					    <label htmlFor="exampleInputEmail1">carte Vital</label>
					    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter VOTRE Vital Card Number"></input>
					 </div>
					 <div className="form-group" >
					  <label htmlFor="exampleInputPassword1">Nom</label>
					    <input type="text" className="form-control"id="exampleInputPassword1" placeholder="Enter VOTRE nom"></input>
					   
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputemail1">Addresse</label>
					    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter VOTRE Addresse"></input>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputnumber1">Phone Number</label>
					    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter VOTRE Phone Number"></input>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputemail1">Groupe sanging</label>
					    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter VOTRE Groupe sanging"></input>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputnumber1">Id compagnie assurance </label>
					    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter VOTRE Id compagnie assurance"></input>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputnumber1">Contact</label>
					    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter VOTRE  Contact"></input>
					  </div>
					  </div>
					  <div className="aab">
					  <button onClick={async(event) => {
					  	event.preventDefault();
					  	let x = document.querySelector("#newpatient");
					  	this.setState({
					  		acn : x.elements[0].value,
					  		name : '0x' + web3.utils.asciiToHex(x.elements[1].value).slice(2).padStart(64, '0'),
					  		home : '0x' + web3.utils.asciiToHex(x.elements[2].value).slice(2).padStart(64, '0'),
					  		no : x.elements[3].value,
					  		bg : '0x' + web3.utils.asciiToHex(x.elements[4].value).slice(2).padStart(64, '0'),
					  		icid : x.elements[5].value,
					  		emer : x.elements[6].value
					  	});
					  	for(let i=0; i<7; i++)
					  	{
					  		x.elements[i].value = '';
					  	}
					  	const accounts = await web3.eth.getAccounts();
					  	try {
							const result = await contract.methods.addPatientInfo(
							  this.state.acn,
							  this.state.name,
							  this.state.home,
							  this.state.no,
							  this.state.bg,
							  this.state.icid,
							  this.state.emer
							).send({ from: accounts[0] });
						  
							console.log("Transaction hash:", result.transactionHash);
							console.log("Events emitted:", result.events);
						  
							// Afficher d'autres détails du résultat si nécessaire
						  } catch (error) {
							console.error("Error:", error);
						  }
					  }} className="btn btn-primary">Submit</button>
					  </div>
					</form>
				</div>
		  );
	}
}

export default NewPatient;