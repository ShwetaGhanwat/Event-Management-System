import React, { useState } from 'react'
import backgroundImage from "../../images/the-circus-hall-.png"
import ProposalCard from './Proposal-card'
import "./Proposal-user.css"
import { useEffect } from 'react'
import Navbar from '../eventList/Navbar'
const ProposalPage = () => {
  const [proposal,setProposal]= useState([])
  const item = JSON.parse(localStorage.getItem("vendorDetail"))
  
  console.log(proposal);
  useEffect(() => {
    const getItem = async () => {
      try {
        const resp = await fetch('https://eventpro.onrender.com/getProposals')
          .then(res => res.json())
          .then(data => {
            setProposal(data.data);
            console.log(data.data);
          })
      }
      catch (e) {
        console.log(e)
      }
    }
    
      getItem();
    
    
  }, [item])
  const removeItem = ()=>{
    localStorage.removeItem("vendorDetail");
    // window.location.reload()
  }
  return (
    <>
    <Navbar/>
      <div>
      <img className='bg-img' src={backgroundImage} alt="xyz" />
      </div>
      {
        (localStorage.getItem("vendorDetail")?<div>
          <div className='prp-container'>
        <h4 className='proposalsHeading'>Selected</h4>
        <div className="proposalsDiv userCard">
        <div className="card" style={{ width: "18rem" }}>
              <img className="card-img-top" src={item.images[0].array[0]} alt="vendor" />
              <div className="card-body">
                <h5 className="card-title">{item.postedBy.name}</h5>
                <p className="card-text">Place - {item.place}</p>
                <p className="card-text">Budget - {item.budget}</p>
              </div>
              <div style={{margin:"auto"}}>
          <button onClick={()=>removeItem()} className="btn btn-primary mb-1">Remove</button>
        </div>
            </div>
           
        </div>
      </div>
          <div className='prp-container'>
        <h4 className='proposalsHeading'>Proposals</h4>
        <div className="proposalsDiv userCard">
          <ProposalCard proposal={proposal}/>
        </div>
      </div>
        </div>:<div className='prp-container'>
        <h4 className='proposalsHeading'>Proposals</h4>
        <div className="proposalsDiv userCard">
          <ProposalCard proposal={proposal}/>
        </div>
      </div>)
      }
      
    </>
  )
}

export default ProposalPage