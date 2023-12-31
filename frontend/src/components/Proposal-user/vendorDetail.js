import React, { useEffect, useState } from 'react'
import "./vendorDetails.css"
import vendorImage from"../../images/vendor-1.jpg";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Deatils = () => {
  const {id} = useParams()
  const [data,setData]= useState([])
  const [imgUrl,setImgUrl]=useState("")
  const [name,setName] =useState("")
  const [email,setEmail] = useState("")
  const [photos,setPhotos] = useState([])
  const navigate = useNavigate()
  console.log(photos);
  useEffect(()=>{
    const data = async ()=>{
      await fetch(`https://eventpro.onrender.com/proposal/${id}`,{
      })
      .then(res=>res.json())
      .then(data=>{
     setImgUrl(data.data.images[0].array[0])
        setData(data.data);
        setName(data.data.postedBy.name)
        setEmail(data.data.postedBy.email)
        setPhotos(data.data.images[0].array)
        console.log(data.data);
      })
    }
    data();
  },[id])
  
  const selectProposal =()=>{
    localStorage.setItem("vendorDetail",JSON.stringify(data));
    navigate("/allProposals")
  }
  return (
    <div className="vendorDetailsMain">
      <div className='headingDiv'>
      <p id='proposalDetail'>Proposals <i className="fa fa-arrow-right fa-1x" aria-hidden="true"></i> <span id='vendorName'>{name} Contract</span></p>
      <button onClick={()=>selectProposal()}>Select</button>
      </div>
      <div className="row" style={{height:"50%"}}>
        <div className="col 1stCard">
        <div className="card" >
          <img className="card-img-top" src={imgUrl} alt="vendor"/>
          <p id='ID'>ID: <span>0001</span></p>
          <div className="card-body" style={{borderBottom:"1px solid lightgray"}}>
            <p className='Lable'>Name: <span className='lableDetails'>{name}</span></p>
            <p className='Lable'>Email: <span className='lableDetails'>{email}</span></p>
          </div>
          <div className="card-body eventDate"style={{borderBottom:"1px solid lightgray"}}>
            <p className='Lable'>StartDate: <span className='lableDetails'>{data.date_from}</span></p>
            <p className='Lable'>EndDate: <span className='lableDetails'>{data.date_from}</span></p>
          </div>
          <div className="card-body eventType">
            <div>
              <h6>Event Type</h6>
              <h6 id='eventType'>{data.eventType}</h6>
            </div>
            <div>
              <h6>Event Class</h6>
              <h6>Class A</h6>
            </div>
          </div>
          
          </div>
        </div>
        <div className="col-md-5">
          <div class="card">
            <div class="card-body secondCard">
              <h5 class="card-title">Venue and Arrangements</h5>
              <p class="card-text">
               {data.description}
                </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
        <div class="card">
            <div class="card-body secondCard">
              <h5 class="card-title">Foods Prefrences</h5>
              <p class="card-text">
              {data.food}
                </p>
            </div>
          </div>
        </div>

      </div>
      <div className="row" style={{height:"350px"}}>
            <div className="col-md-3" style={{height:"350px"}}>
            <div class="card" style={{height:"275px"}} >
                <div class="card-body">
                  <h5 class="card-title">My Albums</h5>
                  <div className='imgDiv'>
                    {photos.map((item,index)=>{
                      return(
                        <img src={item} alt="vendor" style={{width:"100px",height:"100px"}} />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4" style={{width:"570px",height:"250px"}}>
            <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Contacts|12</h5>
                  <div style={{display:"flex",padding:"15px",justifyContent:"space-between",margin:"auto"}}>
                    <div>
                      <div style={{width:"80px",height:"80px",border:"1px solid lightGray",borderRadius:"48.5px",display:"flex",flexDirection:"column",marginLeft:"34px"}}></div>
                      <h5 className='contactName'>Contact 1</h5>
                      <h6 className='contactDetails'>+91 XXXXXXXXXX</h6>
                    </div>
                    <div>
                      <div style={{width:"80px",height:"80px",border:"1px solid lightGray",borderRadius:"48.5px",display:"flex",flexDirection:"column",marginLeft:"34px"}}></div>
                      <h5 className='contactName'>Contact 1</h5>
                      <h6 className='contactDetails'>+91 XXXXXXXXXX</h6>
                    </div>
                    <div>
                      <div style={{width:"80px",height:"80px",border:"1px solid lightGray",borderRadius:"48.5px",display:"flex",flexDirection:"column",marginLeft:"34px"}}></div>
                      <h5 className='contactName'>Contact 1</h5>
                      <h6 className='contactDetails'>+91 XXXXXXXXXX</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col md-4" style={{width:"605px",height:"304px"}}>
            <div class="card" style={{height:"275px"}}>
                <div class="card-body" style={{textAlign:"left"}}>
                  <h4 class="card-title">Events</h4>
                  <p>{data.events}</p>

                </div>
              </div>
            </div>
      </div>

      
    </div>
  )
}

export default Deatils