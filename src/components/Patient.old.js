import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PatientContractABI from './PatientContractABI.json'; // Remplacez ceci par le chemin de votre ABI

const web3 = new Web3(Web3.givenProvider);

const Patients = () => {
    const [patientId, setPatientId] = useState('');
    const [patientInfo, setPatientInfo] = useState({
        id:0,
        nom: '',
        prenom: '',
        age: 0,
        numSecu: 0,
    });

    const contractAddress = '0xBF77293F2166B6Dd5292325Dd76D0d0fC14996F0'; // Remplacez ceci par l'adresse de votre contrat
    const contract = new web3.eth.Contract(PatientContractABI, contractAddress);

    const handleSearch = async () => {
        try {
            const patientAddress = await contract.methods.getAddressByPatientId(patientId).call();
            const patientData = await contract.methods.getPatientInfoById(patientId).call({ from: patientAddress });

            this.setState({
                patientInfo: {
                    ...this.state.patientInfo,
                    nom: patientData[0],
                    prenom: patientData[1],
                    age: patientData[2],
                    numSecu: patientData[3],
                },
            });
        } catch (error) {
            console.error('Erreur lors de la recherche du patient:', error);
        }
    };

    const handleAddPatient = async () => {
        try {
          const accounts = await web3.eth.getAccounts();
          await contract.methods.ajouterPatient(patientInfo.id, patientInfo.nom, patientInfo.prenom, patientInfo.age, patientInfo.numSecu).send({ from: accounts[0] });
          alert('Patient ajouté avec succès!');
          // Réinitialiser les champs après l'ajout
          setPatientInfo({
            age:0,
            id:0,
            nom:'',
            numSecu:0
          })
        } catch (error) {
          console.error('Erreur lors de l\'ajout du patient:', error);
        }
      };

    const checkEthereum = () => {
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

    // Appel de la fonction de vérification

    useEffect(() => {
        checkEthereum();
        console.log("contract ", contract)
    });

    return (
        <div>
            <input
                type="text"
                placeholder="ID du patient"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
            />
            <button onClick={handleSearch}>Rechercher</button>
            {
                patientId && (

                    <div>
                        <h2>Informations du patient:</h2>
                        <p>Nom: {patientInfo.nom}</p>
                        <p>Prénom: {patientInfo.prenom}</p>
                        <p>Age: {patientInfo.age}</p>
                        <p>Numéro Sécurité Sociale: {patientInfo.numSecu}</p>
                    </div>

                )
            }

            <div>
                <h2>Ajouter un patient</h2>
                <input
                    type="text"
                    placeholder="ID"
                    value={patientInfo.id}
                    onChange={(e) => setPatientInfo({id:e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Nom"
                    value={patientInfo.nom}
                    onChange={(e) => setPatientInfo({nom:e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Prénom"
                    value={patientInfo.prenom}
                    onChange={(e) => setPatientInfo({prenom:e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Age"
                    value={patientInfo.age}
                    onChange={(e) => setPatientInfo({age:e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Numéro Sécurité Sociale"
                    value={patientInfo.numSecu}
                    onChange={(e) => setPatientInfo({numSecu:e.target.value})}
                />
                <button onClick={handleAddPatient}>Ajouter Patient</button>
            </div>
  
        </div>
    );
};

export default Patients;
