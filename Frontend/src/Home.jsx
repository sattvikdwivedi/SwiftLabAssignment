import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import './App.css'

function Home() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [pageData, setPageData] = useState([]);   
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [keyword, setKeyword] = useState(null);

  const itemsPerPage = 5;

  const handleSearch = () => {
    if(keyword){
      axios
        .get(`http://localhost:5001/api/search?keyword=${keyword}`)
        .then((res) => {
          setSearchData(res.data);
          setTotalItems(res.data.length);
          fetchPageData(currentPage, itemsPerPage, keyword);
        })
        .catch((err) => console.log(err));
    }
  };

  const fetchPageData = (page, perPage, keyword) => {
    if (keyword) {
      axios
        .get(`http://localhost:5001/api/data?page=${page}&pageSize=${perPage}&keyword=${keyword}`)
        .then((res) => setPageData(res.data))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`http://localhost:5001/api/data?page=${page}&pageSize=${perPage}`)
        .then((res) => setPageData(res.data))
        .catch((err) => console.log(err));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if(!keyword){
      fetchPageData(page, itemsPerPage)
    } else {
      fetchPageData(page, itemsPerPage, keyword);
    }
  };

  useEffect(() => {
    if(!keyword){
      axios
        .get(`http://localhost:5001/`)
        .then((res) => {
          setData(res.data);
          setTotalItems(res.data.length);
          fetchPageData(currentPage, itemsPerPage);
        })
        .catch((err) => console.log(err));
    }
  }, [currentPage, itemsPerPage, keyword]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5001/delete/${id}`)
      .then((res) => {
        // Update data after delete
        setData(data.filter((item) => item.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-success justify-content-center align-items-center">
      <div className="w-10 bg-white p-3">
        <h2 className ="text-info">User List</h2>
        <div className="d-flex justify-content-end gap-3">
          <Link to="/Add" className="btn btn-success">
            Create +
          </Link>
          <input
            type="text"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="Search here..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="Secondary link">Id</th>
              <th className="Secondary link">Principal Entity Id</th>
              <th className="Secondary link">Sender Id</th>
              <th className="Secondary link">Template Id</th>
              <th className="Secondary link">Template Content</th>
              <th className="Secondary link">Created At</th>
              <th className="Secondary link">Updated At</th>
              <th className="Secondary link">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(pageData) && pageData.map((dlt, index) => (
              <tr key={index}>
                <td>{dlt.id}</td>
                <td>{dlt.principal_entity_id}</td>
                <td>{dlt.sender_id}</td>
                <td>{dlt.template_id}</td>
                <td>{dlt.template_content}</td>
                <td>{dlt.created_at}</td>
                <td>{dlt.updated_at}</td>
                <td>
                  <Link to={`/read/${dlt.id}`} className="btn btn-sm btn-info">
                    Read
                  </Link>
                  <Link to={`/edit/${dlt.id}`} className="btn btn-sm btn-primary mx-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(dlt.id)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalItems={totalItems} 
          itemsPerPage={itemsPerPage} 
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Home;
