import React, { useState, useContext } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import { productContext } from '../../App';
import { MdOutlineKeyboardReturn } from 'react-icons/md';

const EditItems = () => {
  const { data, setdata, selected_data } = useContext(productContext);
  const navigate = useNavigate();

  // State variables to hold form values
  const [formData, setFormData] = useState({
    brand: selected_data.brand,
    title: selected_data.title,
    description: selected_data.description,
    price: selected_data.price,
  });

  const returnLogin = () => {
    navigate("/Home");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editData = (e) => {
    e.preventDefault();
    // Find the index of the selected_data in the data array
    const index = data.findIndex((item) => item.id === selected_data.id);
    console.log(index);
    console.log(data);
    if (index !== -1) {
      // Update the data array with the edited values
      const updatedData = [...data];

      updatedData[index] = {
        ...updatedData[index],
        title: formData.title,
        brand: formData?.brand,
        description: formData?.description,
        price: formData?.price,
      };
      console.log(updatedData[index]);
      setdata(updatedData);
      // setselected_data(null); // Clear selected_data after edit
      toast.success(`${selected_data.title} edited successfully`); // Corrected toast message

      setTimeout(() => {
        navigate("/Home")
      }, 3000);
    }
  };

  console.log(selected_data);
  console.log(formData);

  return (
    <div>
      {/* <div className='home-top'>
        <button className='button' onClick={returnLogin}><MdOutlineKeyboardReturn /></button>
        <h1 className='heading'>PRODUCT LIST</h1>
      </div> */}
      <h3 style={{ textAlign: "center", margin: "20px", fontSize: "40px", fontFamily: "monospace" }}>Edit Product Details</h3>

      <Form className="form-head" onSubmit={editData}>
        <Form.Group as={Row} className="mb-3" controlId="formBasicBrand">
          <Form.Label column sm={3} style={{ fontSize: "30px", textAlign: "right" }}>Brand</Form.Label>
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              name="brand"
              defaultValue={selected_data.brand}
              onChange={handleInputChange}
              required
            />

          </Col>

        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicProduct">
          <Form.Label column sm={3} style={{ fontSize: "30px", textAlign: "right" }}>Product</Form.Label>
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="Enter product"
              name="title"
              defaultValue={selected_data.title}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicDescription">
          <Form.Label column sm={3} style={{ fontSize: "30px", textAlign: "right" }}>Description</Form.Label>
          <Col sm={6}>
            <Form.Control style={{ textAlign: "center" }}
              as="textarea"
              placeholder="Enter description"
              name="description"
              defaultValue={selected_data.description}
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
              defaultValue={selected_data.price}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <ToastContainer position="top-center" /> {/* Render ToastContainer once */}
      </Form>
    </div>
  );
};

export default EditItems;
