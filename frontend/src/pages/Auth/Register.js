import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";


function Register() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('');
    const [answer,setAnswer] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
          const res = await axios.post("/api/v1/auth/register",{
            name,email,password,phone,address,answer
          });
          if(res.data.success){
            toast.success("Register Successfully Please Login");
            navigate('/login')
          }
          else{
            toast.error(res.data.message)
          }
          
        } catch (error) {
          console.log(error)
          toast.error('Sorry Wrong')
        }
    };




  return (
    <Layout title={"Register - Ecommer App"}>
      <div className="form-container">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter a Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
     </div>
    <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter a Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            </div>

    <div className="mb-3">
    
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter a Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter a Phone"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />
        </div>

        <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter a Address"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
            />
            </div>

            <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="What is your Favorite sports"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
            />
            </div>
        
            <div className="mb-3 form-check">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
