import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Consumer } from "../../utils/Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ModalAddProduct(props) {
  const [validated, setValidated] = useState(false);
  const [pname, setPname] = useState("");
  const [price, setPrice] = useState("");
  const [pdescription, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    const url = "api/CrudOperation/PostProduct";
    const data = {
      productName: pname,
      price: price,
      productDescription: pdescription,
      brand: brand,
      category: category,
      cost: cost,
      quantityinStock: quantity,
    };

    await axios
      .post(url, data)
      .then((res) => console.log(res))
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
    toast.success("Product added successfully..", {
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
    setPname("");
    setPrice("");
    setDescription("");
    setBrand("");
    setCategory("");
    setCost("");
    setQuantity("");
    setErrors("");
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <ToastContainer />
        <Consumer>
          {(value) => {
            const { data } = value;
            return (
              <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Add Product
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
                          required
                          type="text"
                          placeholder="Product Name"
                          value={pname}
                          onChange={(e) => setPname(e.target.value)}
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
                          required
                          type="text"
                          placeholder="Product Price"
                          autoFocus
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
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
                          required
                          as="textarea"
                          rows={3}
                          value={pdescription}
                          onChange={(e) => setDescription(e.target.value)}
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
                          required
                          type="text"
                          placeholder="Product Brand"
                          autoFocus
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
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
                          required
                          type="text"
                          placeholder="Category"
                          autoFocus
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
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
                          required
                          type="number"
                          placeholder="Product Cost"
                          autoFocus
                          value={cost}
                          onChange={(e) => setCost(e.target.value)}
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
                          required
                          type="number"
                          placeholder="Product Quantity in Stock"
                          autoFocus
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={props.onHide}>
                    Close
                  </Button>
                  <Button type="submit" variant="success">
                    Add
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

// export function ModalEditProduct(props) {
//   const [idEdit, setIdEdit] = useState("");
//   const [pnameEdit, setPnameEdit] = useState("");
//   const [priceEdit, setPriceEdit] = useState("");
//   const [pdescriptionEdit, setDescriptionEdit] = useState("");
//   const [brandEdit, setBrandEdit] = useState("");
//   const [categoryEdit, setCategoryEdit] = useState("");
//   const [costEdit, setCostEdit] = useState("");
//   const [quantityEdit, setQuantityEdit] = useState("");

//   const handleEdit = (id) => {
//     axios
//       .get(`api/CrudOperation/GetProductList/${id}`)
//       .then((res) => {
//         setPnameEdit(res.data.productName);
//         setPriceEdit(res.data.price);
//         setDescriptionEdit(res.data.description);
//         setBrandEdit(res.data.brand);
//         setCategoryEdit(res.data.category);
//         setCostEdit(res.data.cost);
//         setQuantityEdit(res.data.quantity);
//         setIdEdit(id);
//       })
//       .catch((err) =>
//         toast.error(err, {
//           position: "bottom-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         })
//       );
//     console.log(data);
//     clear();
//     toast.success("Product added successfully..", {
//       position: "bottom-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   };

//   const clear = () => {
//     setPnameEdit("");
//     setPriceEdit("");
//     setDescriptionEdit("");
//     setBrandEdit("");
//     setCategoryEdit("");
//     setCostEdit("");
//     setQuantityEdit("");
//   };

//   return (
//     <>
//       <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//         backdrop="static"
//         keyboard={false}
//       >
//         <ToastContainer />
//         <Consumer>
//           {(value) => {
//             const { data } = value;
//             return (
//               <Form onSubmit={handleUpdate}>
//                 <Modal.Header closeButton>
//                   <Modal.Title id="contained-modal-title-vcenter">
//                     Edit Product
//                   </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <Form.Group
//                         className="mb-3"
//                         controlId="exampleForm.ControlInput1"
//                       >
//                         <Form.Label>Product Name</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Product Name"
//                           value={pnameEdit}
//                           onChange={(e) => setPnameEdit(e.target.value)}
//                           autoFocus
//                         />
//                       </Form.Group>
//                     </div>
//                     <div className="col-md-6">
//                       <Form.Group
//                         className="mb-3"
//                         controlId="exampleForm.ControlInput1"
//                       >
//                         <Form.Label>Price</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Product Price"
//                           autoFocus
//                           value={priceEdit}
//                           onChange={(e) => setPriceEdit(e.target.value)}
//                         />
//                       </Form.Group>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-12">
//                       <Form.Group
//                         className="mb-3"
//                         controlId="exampleForm.ControlTextarea1"
//                       >
//                         <Form.Label>Product Description</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           rows={3}
//                           value={pdescriptionEdit}
//                           onChange={(e) => setDescriptionEdit(e.target.value)}
//                         />
//                       </Form.Group>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <Form.Group
//                         className="mb-3"
//                         controlId="exampleForm.ControlInput1"
//                       >
//                         <Form.Label>Brand</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Product Brand"
//                           autoFocus
//                           value={brandEdit}
//                           onChange={(e) => setBrandEdit(e.target.value)}
//                         />
//                       </Form.Group>
//                     </div>
//                     <div className="col-md-6">
//                       <Form.Group
//                         className="mb-3"
//                         controlId="exampleForm.ControlInput1"
//                       >
//                         <Form.Label>Category</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Category"
//                           autoFocus
//                           value={categoryEdit}
//                           onChange={(e) => setCategoryEdit(e.target.value)}
//                         />
//                       </Form.Group>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <Form.Group
//                         className="mb-3"
//                         controlId="exampleForm.ControlInput1"
//                       >
//                         <Form.Label>Cost</Form.Label>
//                         <Form.Control
//                           type="number"
//                           placeholder="Product Cost"
//                           autoFocus
//                           value={costEdit}
//                           onChange={(e) => setCostEdit(e.target.value)}
//                         />
//                       </Form.Group>
//                     </div>
//                     <div className="col-md-6">
//                       <Form.Group
//                         className="mb-3"
//                         controlId="exampleForm.ControlInput1"
//                       >
//                         <Form.Label>Quantity in Stock</Form.Label>
//                         <Form.Control
//                           type="number"
//                           placeholder="Product Quantity in Stock"
//                           autoFocus
//                           value={quantityEdit}
//                           onChange={(e) => setQuantityEdit(e.target.value)}
//                         />
//                       </Form.Group>
//                     </div>
//                   </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                   <Button variant="danger" onClick={props.onHide}>
//                     Close
//                   </Button>
//                   <Button type="submit" variant="success">
//                     Update
//                   </Button>
//                 </Modal.Footer>
//               </Form>
//             );
//           }}
//         </Consumer>
//       </Modal>
//     </>
//   );
// }
