import React, { Component } from 'react';
import PatientContractABI from './PatientContractABI.json'; // Remplacez ceci par le chemin de votre ABI
import Web3 from 'web3';

class Patients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: 0,
            id: 0,
            nom: '',
            prenom: '',
            age: 0,
            numSecu: 0,
            web3: '',
            contract: '',
        };


    }

    handleSearch = async (e) => {

        e.preventDefault();
        console.log("patientId ", this.state.patientId)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("metamask ", accounts[0])
        const patientAddress = await this.state.contract.methods.patientIds().call()
            .then(result => {
                console.log('result ', result)
            }).catch(e => {
                console.log('erreur ', e)
            })

        await this.state.contract.methods.getPatientInfoById(parseInt(this.state.patientId)).call((error, result) => {
            if (!error) {
                console.log('Message:', result);
            } else {
                console.error(error);
            }
        });
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleAddPatient = async () => {
        try {
            const accounts = await this.web3.eth.getAccounts();
            await this.contract.methods.ajouterPatient(
                this.state.id,
                this.state.nom,
                this.state.prenom,
                this.state.age,
                this.state.numSecu
            ).send({ from: accounts[0] });

            alert('Patient ajouté avec succès!');
            // Réinitialiser les champs après l'ajout
            const resetPatientInfo = {
                id: 0,
                nom: '',
                prenom: '',
                age: 0,
                numSecu: 0,
            };
            this.setState({ patientInfo: resetPatientInfo });
        } catch (error) {
            console.error('Erreur lors de l\'ajout du patient:', error);
        }
    };

    checkEthereum = () => {
        if (typeof window.ethereum !== 'undefined') {
            console.log('Ethereum is available');
            const web3 = new Web3(window.ethereum);

            // Vérifier si MetaMask est installé
            if (web3.currentProvider.isMetaMask) {
                console.log('MetaMask is installed');

                // Vérifier si MetaMask est connecté
                web3.eth.getAccounts((error, accounts) => {
                    if (error) {
                        console.error('Erreur lors de la récupération des comptes:', error);
                    } else if (accounts.length === 0) {
                        console.log('MetaMask est installé mais non connecté');
                    } else {
                        console.log('MetaMask est installé et connecté');
                    }
                });
            }
        } else {
            console.log('Ethereum is not available');
        }
    };
    setupWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            this.web3 = window.web3;

            if (this.web3 && this.web3.eth) {
                this.contract = new this.state.web3.eth.Contract(PatientContractABI, this.contractAddress);
            } else {
                console.error('Erreur: Web3 ou sa propriété "eth" est indéfini');
            }
        } else {
            console.log('MetaMask not found');
        }
    };

    componentDidMount() {
        const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545/"));
        
        this.setState({ web3: web3 })
        const contractAddress = '0xaDa24EA6dbB4D3ed079d87Ce7406a852a1D7239f'; // Remplacez ceci par l'adresse de votre contrat
        const contract = new web3.eth.Contract(PatientContractABI, contractAddress);
        console.log("contract ", contract.methods, 'web3 ', web3)
        this.setState({ contract: contract })
    }

    render() {
        const { patientId, id, nom, prenom, age, numSecu } = this.state;

        return (
            <div className="aab" style={{ paddingTop: 150, marginLeft: 200 }}>
                <input
                    type="text"
                    placeholder="ID du patient"
                    value={patientId}
                    onChange={(e) => this.setState({ patientId: e.target.value })}
                /><br />
                <button onClick={this.handleSearch}>Rechercher</button><br />
                {
                    patientId && (
                        <div className='form-group'>
                            <h2>Informations du patient:</h2><br />
                            <p>Nom: {nom}</p><br />
                            <p>Prénom: {prenom}</p><br />
                            <p>Age: {age}</p><br />
                            <p>Numéro Sécurité Sociale: {numSecu}</p><br />
                        </div>
                    )
                }

                <div className='form-group'>
                    <h2>Ajouter un patient</h2><br />
                    <input
                        type="text"
                        placeholder="ID"
                        value={id}
                        onChange={this.handleChange}
                    /><br /><br />
                    <input
                        type="text"
                        placeholder="nom"
                        value={nom}
                        onChange={this.handleChange}
                    /><br /><br />
                    <input
                        type="text"
                        placeholder="prenom"
                        value={prenom}
                        onChange={this.handleChange}
                    /><br /><br />
                    <input
                        type="text"
                        placeholder="age"
                        value={age}
                        onChange={this.handleChange}
                    /><br /><br />
                    <input
                        type="text"
                        placeholder="numSecu"
                        value={numSecu}
                        onChange={this.handleChange}
                    /><br /><br />
                    {/* ... autres champs d'entrée ... */}
                    <button onClick={this.handleAddPatient}>Ajouter Patient</button>
                </div>
            </div>
        );
    }
}

export default Patients;
