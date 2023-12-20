import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import web3 from '.././web3';
import contract from '.././contract';

class NewDoctor extends Component {
		state = {
		    did : '',
		    name : '',
		    ptype : '',
		    exp : '',
		    no : '',
		    addr : '',
	    };

		render() {
			  return (
					<div id="addpatient">
						    <form id="newpatient" className="abc">	
						  <div className="form-group">
						    <label htmlFor="exampleInputEmail1">Id Medecin</label>
						    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter votre Id Medecin"></input>
						 </div>
						 <div className="form-group" >
						  <label htmlFor="exampleInputPassword1">Nom</label>
						    <input type="text" className="form-control"id="exampleInputPassword1" placeholder="Enter votre Name"></input>
						   
						  </div>
						  <div className="form-group">
						    <label htmlFor="exampleInputemail1">Specialite</label>
						    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter votre Specialite"></input>
						  </div>
						  <div className="form-group">
						    <label htmlFor="exampleInputnumber1">Area of Expertize</label>
						    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter votre Expertise"></input>
						  </div>
						  <div className="form-group">
						    <label htmlFor="exampleInputemail1">Phone Number</label>
						    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter votre Phone Number"></input>
						  </div>
						  <div className="form-group">
						    <label htmlFor="exampleInputnumber1">Addresse Clinique </label>
						    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter l'addresse de votre Clinique"></input>
						  </div>
						  <div className="aab">
						  <button onClick={async(event) => {
						  	event.preventDefault();
						  	let x = document.querySelector("#newpatient");
						  	this.setState({
						  		did : x.elements[0].value,
						  		name : web3.utils.asciiToHex(x.elements[1].value),
						  		ptype : web3.utils.asciiToHex(x.elements[2].value),
						  		exp : web3.utils.asciiToHex(x.elements[3].value),
						  		no : x.elements[4].value,
						  		addr : web3.utils.asciiToHex(x.elements[5].value)
						  	});
						  	for(let i=0; i<6; i++)
						  	{
						  		x.elements[i].value = '';
						  	}
						  	const accounts = await web3.eth.getAccounts();
						  	await contract.methods.addDoctor(this.state.did,this.state.name,this.state.ptype,this.state.exp,this.state.no,this.state.addr).send({from : accounts[0]});
						  }} className="btn btn-primary">Submit</button>
						  </div>
						</form>
					</div>
			  );
		}
}

export default NewDoctor;