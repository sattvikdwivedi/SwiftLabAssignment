import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';


function Update() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  
  useEffect(() => {
    axios.get(`http://localhost:5001/read/${id}`)
      .then(res => {
        console.log(res);
        setClient(res.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  const [values, setValues] = useState({
    principal_entity_id: '',
    sender_id: '',
    template_id: '',
    template_content: '',
    created_at: '',
    updated_at: ''
  });

  useEffect(() => {
    if (client) {
      setValues({
        principal_entity_id: client.principal_entity_id,
        sender_id: client.sender_id,
        template_id: client.template_id,
        template_content: client.template_content,
        created_at: client.created_at,
        updated_at: client.updated_at
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const nevigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5001/edit/`+id, values)
    .then(res => {
      console.log(res);
      nevigate('/');
    }).catch(err => console.log(err));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Update User</h2>
          <div className='mb-2'>
            <label htmlFor="">principal_entity_id</label>
            <input 
              type="text" 
              name="principal_entity_id"
              placeholder='Enter updated principal_entity_id...' 
              className='form-control' 
              value={values.principal_entity_id}
              onChange={handleChange}
            />
            <label htmlFor="">sender_id</label>
            <input 
              type="text" 
              name="sender_id"
              placeholder='Enter updated sender_id...' 
              className='form-control' 
              value={values.sender_id}
              onChange={handleChange}
            />
            <label htmlFor="">template_id</label>
            <input 
              type="text" 
              name="template_id"
              placeholder='Enter updated template_id...' 
              className='form-control' 
              value={values.template_id}
              onChange={handleChange}
            />
            <label htmlFor="">template_content</label>
            <input 
              type="text" 
              name="template_content"
              placeholder='Enter updated template_content...' 
              className='form-control' 
              value={values.template_content}
              onChange={handleChange}
            />
            <label htmlFor="">created_at</label>
            <input 
              type="datetime-local" 
              name="created_at"
              className='form-control' 
              value={values.created_at}
              onChange={handleChange}
            />
            <label htmlFor="">updated_at</label>
            <input 
              type="datetime-local" 
              name="updated_at"
              className='form-control' 
              value={values.updated_at}
              onChange={handleChange}
            />
          </div>
          <button className='btn btn-success'> Update </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
