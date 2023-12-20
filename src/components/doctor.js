import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import web3 from '.././web3';
import contract from '.././contract';

class Doctor extends Component {
	state = {
		current : 0,
		makepdv : 0,
		tid : 0,
		pid : 0,
		did : 0,
		digno : '',
		test : '',
		bill : 0,
		dpacn : '',
		precau : '',
		tppacn : 0,
		tpdid : 0,
		tpdiagno : '',
		tptests : '',
		tpbill : 0,
		tpmed : '',
		tptid : 0,
		inkpid : 0,
		inkmed : ''
	};
	render() {
		  return (
				<div id="sidebar">

				<div className="sidenav">
				  <center><h4>Doctor</h4></center>
				  <br></br>
				  <center><h6><button onClick={() => {
				  	this.setState({current : 1});
				  	this.setState({makepdv : 0});
				  }} className="btn btn-light">Obtenir les détails d'un traitement</button></h6></center>

				  <center><h6><button onClick={() => {
				  	this.setState({current : 2});
				  	this.setState({makepdv : 0});
				  }} className="btn btn-light">Donner conseils</button></h6></center>

				  <center><h6><button onClick={() => {
				  	this.setState({current : 3});
				  	this.setState({makepdv : 0});
				  }} className="btn btn-light">Traiter un Patient</button></h6></center>

				  <center><h6><button id="toomuch3" onClick={() => {
				  	this.setState({current : 4});
				  	this.setState({makepdv : 0});
				  }} className="btn btn-light">Envoyer des infos à  l'assurance</button></h6></center>
				</div>

				{
					(this.state.current==1)
					?    (<form id="gtd" className="abc">	
					  <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Traitment ID</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Treatment ID"></input>
					 </div>
					  <div className="aab">
					  <button onClick={async(event) => {
					  	event.preventDefault();
					  	const accounts = await web3.eth.getAccounts();
					  	let x = document.querySelector("#gtd");
					  	this.setState({ tid : x.elements[0].value });
					  	x.elements[0].value='';
					  	await contract.methods.getTreatmentDetails(this.state.tid)
					  	.call({from : accounts[0]},(error,result) => {
					  		if(!error)
					  		{
						  		this.setState({
						  			pid : result[0],
						  			did  : result[1],
						  			digno : web3.utils.hexToAscii(result[2]),
						  			test : web3.utils.hexToAscii(result[3]),
						  			bill : result[4]
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
					(this.state.current==2)
					?    (<form id="udp" className="abc">	
					  <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Num Carte vitale Patient</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Carte vitale"></input>
					 </div>
					 <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Nouvelle Precaution</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Nouvelle Precaution"></input>
					 </div>
					  <div className="aab">
					  <button onClick={async(event) => {
					  	event.preventDefault();
					  	const accounts = await web3.eth.getAccounts();
					  	let x = document.querySelector("#udp");
					  	this.setState({ dpacn : x.elements[0].value, precau : web3.utils.asciiToHex(x.elements[1].value) });
					  	x.elements[0].value='';
					  	x.elements[1].value='';
					  	await contract.methods.UpdatePrecautions(this.state.dpacn,this.state.precau)
					  	.send({from : accounts[0]});
					  }}className="btn btn-primary">Submit</button>
					   </div>
					</form>)
					: (<span></span>)
				}
				{
					(this.state.current==3)
					?    (<form id="tpp" className="abc">	
					 <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Carte vital.</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Carte vital."></input>
					 </div>
					 <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Id medecin</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Id medecin"></input>
					 </div>
					 <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Diagnostique</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter le diagnostique"></input>
					 </div>
					 <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Tests effectués</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter les tests"></input>
					 </div>
					 <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Prix</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the Prix"></input>
					 </div>
					 <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Medicaments</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter les Medicaments"></input>
					 </div>
					  <div className="aab">
					  <button onClick={async(event) => {
					  	event.preventDefault();
					  	let x = document.querySelector("#tpp");
					  	this.setState({ 
					  		tppacn : x.elements[0].value,
					  		tpdid : x.elements[1].value,
					  		tpdiagno : web3.utils.asciiToHex(x.elements[2].value),
					  		tptests : web3.utils.asciiToHex(x.elements[3].value),
					  		tpbill : x.elements[4].value,
					  		tpmed : web3.utils.asciiToHex(x.elements[5].value)
					  	});
					  	for(let i=0; i<6; i++)
					  	{
					  		x.elements[i].value = '';
					  	}
					  	const accounts = await web3.eth.getAccounts();
					  	await contract.methods.TreatPatient(this.state.tppacn,this.state.tpdid,this.state.tpdiagno,this.state.tptests,this.state.tpbill,this.state.tpmed).send({from : accounts[0]}, (error,result) => {
					  		if(!error)
					  		{
						  		this.setState({
						  			tptid : (142317*this.state.tppacn)%1000003
						  		});
						  		this.setState({makepdv : 3});
						  	}	
					  	});
					  }}className="btn btn-primary">Submit</button>
					   </div>
					</form>)
					: (<span></span>)
				}
				{
					(this.state.current==4)
					?    (<form id="ink" className="abc">	
					  <div className="form-group">
					    <label htmlFor="exampleInputEmail1">ID Patient</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter ID patient"></input>
					 </div>
					 <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Medicaments</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Medicaments"></input>
					 </div>
					  <div className="aab">
					  <button onClick={async(event) => {
					  	event.preventDefault();
					  	const accounts = await web3.eth.getAccounts();
					  	let x = document.querySelector("#ink");
					  	this.setState({ inkpid : x.elements[0].value, inkmed : web3.utils.asciiToHex(x.elements[1].value) });
					  	x.elements[0].value='';
					  	x.elements[1].value='';
					  	await contract.methods.addInsuranceKeep(this.state.inkpid,this.state.inkmed).send({from : accounts[0]});
					  }}className="btn btn-primary">Submit</button>
					   </div>
					</form>)
					: (<span></span>)
				}
				
			    {
			    	(this.state.makepdv==1)
					?    (<div><h4 className="yf">Patient Id : {this.state.pid}</h4>
					    <h4 className="yf">Doctor Id : {this.state.did}</h4>
					    <h4 className="yf">Diagnostics : {this.state.digno}</h4>
					    <h4 className="yf">Tests Conducted : {this.state.test}</h4>
					    <h4 className="yf">Bill : {this.state.bill}</h4></div>)
					: (<span></span>)
				}
				{
			    	(this.state.makepdv==3)
					?    (<div><h4 className="yf">Treatment ID : {this.state.tptid}</h4></div>)
					: (<span></span>)
				}
				</div>
		  );
	}
}


export default Doctor;