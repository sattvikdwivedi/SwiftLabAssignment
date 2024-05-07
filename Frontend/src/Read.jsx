import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Read() {
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

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <div className='p-2'>
          <h2>Client Details</h2>
          <h2>{client && client.principal_entity_id}</h2>
          <h2>{client && client.sender_id}</h2>
          <h2>{client && client.template_id}</h2>
          <h2>{client && client.template_content}</h2>
          <h2>{client && client.created_at}</h2>
          <h2>{client && client.updated_at}</h2>
        </div>
        <Link to="/" className='btn btn-primary me-2'>Back</Link>
        <Link to={`/edit/${id}`} className='btn btn-primary'>Edit</Link>
      </div>
    </div>
  );
}

export default Read;
