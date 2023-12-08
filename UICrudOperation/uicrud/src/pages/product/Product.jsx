import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./Product.scss";
import { ModalAddProduct } from "../../components/modals/Modal";
// import ProductJson from "./ProductJson.json";
import { Consumer } from "../../utils/Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Product() {
  const [modalShow, setModalShow] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  // const { pname, brand, category, price } = props.data;
  const [idEdit, setIdEdit] = useState("");
  const [pnameEdit, setPnameEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [pdescriptionEdit, setDescriptionEdit] = useState("");
  const [brandEdit, setBrandEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [costEdit, setCostEdit] = useState("");
  const [quantityEdit, setQuantityEdit] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    handleUpdate();
  }, []);

  const handleEdit = (id) => {
    axios
      .get(`api/CrudOperation/GetProductList/${id}`)
      .then((res) => {
        setPnameEdit(res.data.productName);
        setPriceEdit(res.data.price);
        setDescriptionEdit(res.data.productDescription);
        setBrandEdit(res.data.brand);
        setCategoryEdit(res.data.category);
        setCostEdit(res.data.cost);
        setQuantityEdit(res.data.quantityinStock);
        setIdEdit(id);
      })
      .catch((err) =>
        toast.error(err, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
    // console.log(data);
    clear();

    setModalEdit(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const url = `api/CrudOperation/UpdateProductById/${idEdit}`;
    const data = {
      productId: idEdit,
      productName: pnameEdit,
      price: priceEdit,
      productDescription: pdescriptionEdit,
      brand: brandEdit,
      category: categoryEdit,
      cost: costEdit,
      quantityinStock: quantityEdit,
    };

    await axios
      .put(url, data)
      .then((res) => console.log(res.data))
      .catch((err) =>
        toast.error(err, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
    console.log(data);
    clear();
    toast.success("Product updated successfully..", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const clear = () => {
    setPnameEdit("");
    setPriceEdit("");
    setDescriptionEdit("");
    setBrandEdit("");
    setCategoryEdit("");
    setCostEdit("");
    setQuantityEdit("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this product ?") == true) {
      await axios
        .delete(`api/CrudOperation/DeleteProductById/${id}`)
        .then((res) => {
          if (res.status === 200) {
            toast.warning("Product deleted successfully..", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((err) =>
          toast.error(err, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        );
    }
  };

  return (
    <>
      <div className="list__layout">
        <div className="list__layout__header">
          <h3>Product List</h3>
          <button
            type="button"
            className="btn btn-primary addproductbtn"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Product
          </button>
        </div>
        <hr />
        <ToastContainer />
        <Consumer>
          {(value) => (
            <div className="list__layout__body">
              <Table
                striped
                bordered
                className="list__layout__body__tablelayout"
              >
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {value.Products.map((productrecord) => (
                    <tr key={productrecord.productId}>
                      <td>{productrecord.productName}</td>
                      <td>{productrecord.brand}</td>
                      <td>{productrecord.category}</td>
                      <td>{productrecord.price}</td>
                      <td>
                        <a
                          href="#"
                          className="btn btn-primary editBtn"
                          style={{ marginRight: "10px" }}
                          onClick={() => handleEdit(productrecord.productId)}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="btn btn-danger deleteBtn"
                          onClick={() => handleDelete(productrecord.productId)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Consumer>
      </div>
      <ModalAddProduct
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          window.location.reload(false);
          navigate("/product");
        }}
      />

      <Modal
        show={modalEdit}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <ToastContainer />
        <Consumer>
          {(value) => {
            const onHide = () => {
              setModalEdit(false);
              window.location.reload(false);
              navigate("/product");
            };
            return (
              <Form onSubmit={handleUpdate}>
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Edit Product
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Product Name"
                          value={pnameEdit}
                          onChange={(e) => setPnameEdit(e.target.value)}
                          autoFocus
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Product Price"
                          autoFocus
                          value={priceEdit}
                          onChange={(e) => setPriceEdit(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={pdescriptionEdit}
                          onChange={(e) => setDescriptionEdit(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Product Brand"
                          autoFocus
                          value={brandEdit}
                          onChange={(e) => setBrandEdit(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Category"
                          autoFocus
                          value={categoryEdit}
                          onChange={(e) => setCategoryEdit(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Cost</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Product Cost"
                          autoFocus
                          value={costEdit}
                          onChange={(e) => setCostEdit(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Quantity in Stock</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Product Quantity in Stock"
                          autoFocus
                          value={quantityEdit}
                          onChange={(e) => setQuantityEdit(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={onHide}>
                    Close
                  </Button>
                  <Button type="submit" variant="success">
                    Update
                  </Button>
                </Modal.Footer>
              </Form>
            );
          }}
        </Consumer>
      </Modal>
    </>
  );
}

export default Product;
