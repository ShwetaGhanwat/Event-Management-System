import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import "./eventList.css"
import { MdSearch } from "react-icons/md";
import { MdFilterAlt } from 'react-icons/md'
import { MdDeleteOutline } from 'react-icons/md'
import { MdModeEditOutline } from 'react-icons/md'
import { useNavigate, Link } from 'react-router-dom';
export default function ProposalList() {
  const navigate = useNavigate();
  const [proposal, setProposal] = useState([]);
  const [search, setSearch] = useState('');
  
  const searchedList = ()=>{    
    const searchData = proposal.filter((item)=>
      item.eventName.toLowerCase().includes(search.toLowerCase())
    )
    setProposal(searchData)
  }

  useEffect(() => {
    const getItem = async () => {
      try {
        const resp = await fetch('https://eventpro.onrender.com/proposals',{
          headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        })
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
    if(search!==""){
    
      searchedList()
    }
    else{
      getItem();
    }
    
    
  }, [search])
  // delete item
  const handleDelete = async (id) => {
    await fetch(`https://eventpro.onrender.com/delete/${id}`, {
      method: 'delete',
    })
      .then(res => res.json())
      .then(data => {
        setProposal(proposal.filter(proposal => proposal.id !== id));
        
      })
      window.location.reload()
  }
  return (
    <>
      <Navbar />
      <div className='container mt-3'>
        <div className='event-header'>
          <div>
            <h3>Proposals</h3>
            <MdSearch className='searchic mt-2 ms-3' />
            <input onChange={(e)=>{setSearch(e.target.value)}} value={search} className='ms-2 mt-0' style={{ border: 'none', opacity: '0.5', outline: 'none' }} type="search" placeholder='Search projects' />
          </div>
          <div>
            <span> <MdFilterAlt className='filteric mt-2' /> </span>
            <button className='create-btn' onClick={() => navigate('/createProposal')}>Create</button>
          </div>
        </div>
        {
          proposal.map((item, index) => {
            return (
              <>
                <div key={item._id} className='event-details mt-2 py-2 px-3' >
                  <div>
                    <h6>{item.eventName}</h6>
                    <p>{item.description}</p>
                  </div>
                  <div className='event-main'>
                    <div className='event-head'>
                      <div >
                        <p className='text-muted'>
                          Event Type
                        </p>
                        <p>{item.eventType}</p>
                      </div>
                      <div>
                        <p className='text-muted'>
                          Proposal Type
                        </p>
                        <p>
                          {item.proposalType}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted'>
                        From Date
                        </p>
                        <p>
                          {item.date_from}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted'>
                        To Date
                        </p>
                        <p>
                          {item.date_to}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted'>
                          Budget
                        </p>
                        <p>
                          {item.budget}
                        </p>
                      </div>
                    </div>
                    <div className='d-flex gap-4 mt-2 me-2'>
                      <Link to={"/update/"+item._id}>
                        <MdModeEditOutline className='edit' />
                      </Link>
                      <MdDeleteOutline className='dlt' onClick={() => { handleDelete(item._id) }} />
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
    </>
  )
}