import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import EducationalRecords from './contracts/EducationalRecords.json';

const App = () => {
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [grade, setGrade] = useState("");
  const [usn, setusn] = useState("");
  const [records, setRecords] = useState([]);
  const [txHash, setTxHash] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [contractAddress, setContractAddress] = useState("");
  const [contractABI, setContractABI] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3('http://127.0.0.1:7545');
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EducationalRecords.networks[networkId];
      const instance = new web3.eth.Contract(
        EducationalRecords.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setWeb3(web3);
      setContract(instance);
      setContractAddress(deployedNetwork.address);
      setContractABI(EducationalRecords.abi);
    };
    init();
  }, []);

  const addRecord = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.addRecord(studentName, institutionName, courseName, grade)
    .send({ from: accounts[0], gas: 3000000 });
    loadRecords();
  };

  const loadRecords = async () => {
    const accounts = await web3.eth.getAccounts();
    const records = await contract.methods.getRecords(accounts[0]).call();
    setRecords(records);
  };

  const getTransactionDetails = async () => {
    const tx = await web3.eth.getTransaction(txHash);
    setTransaction(tx);
  };

  return (
    <div className="container">
      <h1>Educational Records</h1>
      <form onSubmit={(e) => { e.preventDefault(); addRecord(); }}>
        <div className="form-group">
          <label>Student Name</label>
          <input type="text" className="form-control" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Institution Name</label>
          <input type="text" className="form-control" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Course Name</label>
          <input type="text" className="form-control" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Grade</label>
          <input type="text" className="form-control" value={grade} onChange={(e) => setGrade(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>usn</label>
          <input type="text" className="form-control" value={usn} onChange={(e) => setusn(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Record</button>
      </form>
      <form onSubmit={(e) => { e.preventDefault(); getTransactionDetails(); }}>
        <div className="form-group">
          <label>Transaction Hash</label>
          <input type="text" className="form-control" value={txHash} onChange={(e) => setTxHash(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Get Transaction Details</button>
      </form>
      {transaction && (
        <div className="mt-3">
          <h3>Transaction Details</h3>
          <p><strong>Hash:</strong> {transaction.hash}</p>
          <p><strong>Block Number:</strong> {transaction.blockNumber}</p>
          <p><strong>From:</strong> {transaction.from}</p>
          <p><strong>To:</strong> {transaction.to}</p>
          <p><strong>Value:</strong> {web3.utils.fromWei(transaction.value, 'ether')} ETH</p>
          <p><strong>Gas Price:</strong> {web3.utils.fromWei(transaction.gasPrice, 'gwei')} Gwei</p>
        </div>
      )}
    </div>
  );
};

export default App;
