import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import './Home.css';
import { MdDelete, MdKeyboardReturn, MdOutlineKeyboardReturn, MdSearch } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { productContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const { data, setdata, selected_data, setselected_data } = useContext(productContext);

  const [pid, setpid] = useState(null);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [searchdata, setsearchdata] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);  //state to save filtered items

  useEffect(() => {
    setFilteredUsers(data);
  }, [data]);

  const getSearchData = (e) => {
    const searchText = e.target.value;
    setsearchdata(searchText);

  // const getSearchData=(e)=>{
  //     setsearchdata(e.target.value)

    const filteredItems = data.filter((item) =>
      item.brand.toLowerCase().includes(searchText.toLowerCase())
    );

    // console.log(filteredItems); 

    setFilteredUsers(filteredItems);
  };

  const handleClose = () => {
    setShow(false);
    setshowDeleteModal(false);
  };

  const handleShow = (item) => {
    setShow(true);
    setpid(item);
  };

  const handleModal = (item) => {
    setpid(item);
    setshowDeleteModal(true);
  };

  const handleDelete = () => {
    if (!pid) return;

    const updatedData = data.filter((item) => item.id !== pid.id);
    setdata(updatedData);
    setTimeout(() => {
      handleClose();
    }, 2000);
    toast.success(`${pid.title} deleted successfully`);
  };

  const navigate = useNavigate();
  const returnLogin = () => {
    navigate("/");
  };

  const Get_Add = () => {
    navigate('/AddItems');
  };

  const Get_Edit = (item) => {
    setselected_data(item);
    navigate('/EditItems');
  };

  return (
    <div className='home-head'>
      <div className='navbar'>
        <div className='nav-left'>
          <button className='return-button' onClick={returnLogin}>
            <MdKeyboardReturn />
          </button>
        </div>
        <div className='nav-center'>
          <h1 className='heading'>PRODUCT LIST</h1>
        </div>
        <div className='nav-right'>
          <div className='search-container'>
            <input type='text' className='search-input' placeholder='Search...' onChange={getSearchData} />
            <button className='search-button'>
              <MdSearch />
            </button>
          </div>
        </div>
      </div>

      <div className='table'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Brand</th>
              <th>Product</th>
              <th>Description</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.brand}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                {item && item.images && <td><img src={item.images[0]} style={{ width: "100px", height: "50px" }} alt="" /></td>}
                <td>{item.price}</td>
                <td>
                  <FaEye style={{ fontSize: "15px", marginRight: "5px" }} onClick={() => handleShow(item)} />
                  <MdEdit style={{ fontSize: "15px", color: "green", marginRight: "5px" }} onClick={() => Get_Edit(item)} />
                  <MdDelete style={{ fontSize: "15px", color: "red" }} onClick={() => handleModal(item)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <button className="custom-button" onClick={Get_Add}>Add item</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#333", color: "#fff", textAlign: "center" }}>
          <Modal.Title><b>{pid && pid.title}</b></Modal.Title>
        </Modal.Header>
        {pid && pid.images && <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}><img src={pid?.images[0]} alt='' style={{ width: "80%", height: "150px", borderRadius: "8px" }} /></div>}
        <Modal.Body>
          <table>
            <tbody>
              <tr>
                <th style={{ width: "30%", textAlign: "right", verticalAlign: "top" }}>Brand:</th>
                <td style={{ width: "70%", paddingLeft: "10px" }}>{pid && pid.brand}</td>
              </tr>
              <tr>
                <th style={{ width: "30%", textAlign: "right", verticalAlign: "top" }}>Title:</th>
                <td style={{ width: "70%", paddingLeft: "10px" }}>{pid && pid.title}</td>
              </tr>
              <tr>
                <th style={{ width: "30%", textAlign: "right", verticalAlign: "top" }}>Description:</th>
                <td style={{ width: "70%", paddingLeft: "10px" }}>{pid && pid.description}</td>
              </tr>
              <tr>
                <th style={{ width: "30%", textAlign: "right", verticalAlign: "top" }}>Price:</th>
                <td style={{ width: "70%", paddingLeft: "10px" }}>{pid && pid.price}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center", backgroundColor: "#333" }}>
          <Button style={{ backgroundColor: "#f00", color: "#fff" }} variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{pid && pid.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <ToastContainer position="top-center" />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
