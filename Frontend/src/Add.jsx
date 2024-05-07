import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css';

function Add() {
  const [values, setValues] = useState({
    principal_entity_id: '',
    sender_id: '',
    template_id: '',
    template_content: '',
    created_at: '',
    updated_at: ''
  });
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/dlt', values)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.error(err));
  }

  return (
    <div className='create-container'>
      <div className='create-form'>
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="principal_entity_id">Principal Entity ID</label>
            <input type="text" id="principal_entity_id" className='form-control' 
              placeholder='Enter principal_entity_id...' 
              onChange={e => setValues({...values,principal_entity_id: e.target.value})}/>
          </div>
          <div className='form-group'>
            <label htmlFor="sender_id">Sender ID</label>
            <input type="text" id="sender_id" className='form-control' 
              placeholder='Enter sender_id...' 
              onChange={e => setValues({...values,sender_id: e.target.value})}/>
          </div>
          <div className='form-group'>
            <label htmlFor="template_id">Template ID</label>
            <input type="text" id="template_id" className='form-control' 
              placeholder='Enter template_id...' 
              onChange={e => setValues({...values,template_id: e.target.value})}/>
          </div>
          <div className='form-group'>
            <label htmlFor="template_content">Template Content</label>
            <input type="text" id="template_content" className='form-control' 
              placeholder='Enter template_content...' 
              onChange={e => setValues({...values,template_content: e.target.value})}/>
          </div>
          <div className='form-group'>
            <label htmlFor="created_at">Created At</label>
            <input type="datetime-local" id="created_at" className='form-control' 
              onChange={e => setValues({...values,created_at: e.target.value})}/>
          </div>
          <div className='form-group'>
            <label htmlFor="updated_at">Updated At</label>
            <input type="datetime-local" id="updated_at" className='form-control' 
              onChange={e => setValues({...values,updated_at: e.target.value})}/>
          </div>
          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Add;
