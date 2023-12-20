import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import web3 from '.././web3';
import contract from '.././contract';

class Home extends Component {
	state = {
		redirectto : 5
	};
	render() {
		  return (
			<div id="home-body">
			<br></br>
			<br></br>
			<br></br>
			<br></br>
				<h2>S'inscrire via Metamask</h2>
					<div><NavLink to="/newpatient" className="btn btn-primary"><h4>Je suis Patient</h4></NavLink></div>
					<br></br>
					<div><NavLink to="/newdoctor" className="btn btn-primary"><h4>Je suis Doctor</h4></NavLink></div>
					<br></br>
					<div><NavLink to="/newinsurancecompany" className="btn btn-primary"><h4>Je suis une Companie d'assurance</h4></NavLink></div>
					<br></br>
					<div><NavLink to="/newchemist" className="btn btn-primary"><h4>Je suis une pharmacie</h4></NavLink></div>
					<br></br>
				<h2>Deja inscrit?</h2>
				  <button onClick={async() => {
				  	const accounts = await web3.eth.getAccounts();

				  	await contract.methods.Identify().call({from : accounts[0]}, (error,result) => {
						  
						console.log(result)
						this.setState({redirectto : result});
				  		console.log(result);
				  	});
				  }} className="btn btn-primary"><h4>Let's go !!</h4></button>
			{
				(this.state.redirectto==1) 
					? (<Redirect to="/patient"/>)
					: (<span></span>)
			}
			{
				(this.state.redirectto==2) 
					? (<Redirect to="/doctor"/>)
					: (<span></span>)
			}
			{
				(this.state.redirectto==3) 
					? (<Redirect to="/insurancecompany"/>)
					: (<span></span>)
			}
			{
				(this.state.redirectto==4) 
					? (<Redirect to="/chemist"/>)
					: (<span></span>)
			}
			</div>
	    )
	}     
}

export default Home;