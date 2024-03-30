import React, { useContext, useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { productContext } from '../../App';
import { Navigate, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardReturn } from 'react-icons/md';
// import './AddItems.css'

const AddItems = () => {
  const {data,setdata}= useContext(productContext)
  const [formData, setFormData] = useState({
    brand: '',
    title: '',
    description: '',
    price: '',
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
   setFormData({...formData,[e.target.name]:e.target.value})
  };
  const navigate = useNavigate();
  const returnLogin=()=>{
    navigate("/Home")
    }
   console.log(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    const newdata=([...data,formData])
    navigate('/Home');
    setdata(newdata)
    console.log(newdata);
    // console.log(formData);
  };
  return (
    <div>

     {/* <div className='home-top'> 
      <button className='button' onClick={returnLogin}><MdOutlineKeyboardReturn /></button>
      <h1 className='heading'>PRODUCT LIST</h1>
     </div> */}
      <h3 style={{ textAlign: "center", margin: "20px", fontSize: "40px", fontFamily: "monospace" }}>Add Product Details</h3>

      <Form className="form-head" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formBasicBrand">
          <Form.Label column sm={3} style={{ fontSize: "30px", textAlign: "right" }}>Brand</Form.Label>
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              name="brand"
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicProduct">
          <Form.Label column sm={3} style={{ fontSize: "30px", textAlign: "right" }}>title</Form.Label>
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="Enter product"
              name="title"
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicDescription">
          <Form.Label column sm={3} style={{ fontSize: "30px", textAlign: "right" }}>Description</Form.Label>
          <Col sm={6}>
            <Form.Control style={{textAlign:"center"}}
              as="textarea"
              placeholder="Enter description"
              name="description"
              onChange={handleInputChange}
              cols={50}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicPrice">
          <Form.Label column sm={3} style={{ fontSize: "30px", textAlign: "right" }}>Price</Form.Label>
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="Enter price"
              name="price"
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        {showAlert && (
          <Alert variant="success" className="mt-3">
            Form submitted successfully!
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default AddItems;
