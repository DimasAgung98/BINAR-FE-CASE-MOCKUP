import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Modal, Card } from 'react-bootstrap';
import { API_URL } from '../config/baseurl';
import auth from '../utils/auth';

function DashboardPage() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const authData = localStorage.getItem('token');
        if (authData) {
            navigate('/dashboard')
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Notification',
                text: 'Please Login First',
                confirmButtonColor: '#dc3545',
            })
            navigate('/')
        }
    }, [navigate])

    //GET PRODUCTS
    const getProducts = () => {
        axios.get(`${API_URL}v1/products`, {
            headers: {
                'Authorization': `token ${auth()}`
            }
        })
            .then(res => {
                setData(res.data.result)
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
    }

    const [selectedItem, setSelectedItem] = useState({});
    //HANDLE UPDATE
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = (item) => {
        setSelectedItem(item);
        setShowUpdate(true);
    }

    const updateProduct = (id) => {
        axios.put(`${API_URL}v1/products/${id}`, {
            name: selectedItem.name,
            price: selectedItem.price,
            imageurl: selectedItem.imageurl
        }, {
            headers: { 'Authorization': `token ${auth()}` }
        }).then((response) => {
            if (response.data.status === 'OK') {
                Swal.fire({
                    icon: 'info',
                    title: 'Update Product Success',
                    confirmButtonColor: '#dc3545',
                })
                handleCloseUpdate()
                getProducts()
            }
        })
    }

    //HANDLE DELETE
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (item) => {
        console.log(item);
        setSelectedItem(item);
        setShowDelete(true);
    }

    const deleteProduct = (id) => {
        axios.delete(`${API_URL}v1/products/${id}`, {
            headers: { 'Authorization': `token ${auth()}` }
        }).then((response) => {
            if (response.data.status === 'OK') {
                Swal.fire({
                    icon: 'info',
                    title: 'Delete Success',
                    confirmButtonColor: '#dc3545',
                })
                handleCloseDelete()
                getProducts()
            }
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getProducts()
    }, []);

    return (
        <>
            <Navbar getProducts={getProducts} />
            <section id='card-product'>
                <div className='container mt-5'>
                    <div className='row'>
                        {
                            data.map(item => (
                                <div key={item} className='col-4 mb-5 card-container'>
                                    <Card className='text-center shadow h-100'>
                                        <div className='card-image-area'>
                                            <Card.Img variant='top' src={item.imageurl} className='card-image' />
                                        </div>
                                        <Card.Body className='text-start'>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>$ {item.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <div className='action-card'>
                                        <div><MdOutlineEditCalendar onClick={() => handleShowUpdate(item)} /></div>
                                        <div><RiDeleteBin5Line onClick={() => handleShowDelete(item)} /></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* MODAL EDIT */}
            <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>EDIT PRODUCT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='row align-items-center justify-content-center'>
                            <input type="text" className="mb-2 form-control" id="productname" placeholder='Product Name' defaultValue={selectedItem.name}
                                onChange={(e) => setSelectedItem((prevItem) => {
                                    return {
                                        ...prevItem,
                                        name: e.target.value
                                    }
                                })}
                            />
                            <input type="number" className="mb-2 form-control" id="Price" placeholder='Price (Dollar USD)' defaultValue={selectedItem.price}
                                onChange={(e) => setSelectedItem((prevItem) => {
                                    return {
                                        ...prevItem,
                                        price: e.target.value
                                    }
                                })}
                            />
                            <input type="text" className="mb-2 form-control" id="ImageURL" placeholder='Image URL' defaultValue={selectedItem.imageurl}
                                onChange={(e) => setSelectedItem((prevItem) => {
                                    return {
                                        ...prevItem,
                                        imageurl: e.target.value
                                    }
                                })} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='row float-end'>
                        <div className='col-6'>
                            <button className='btn btn-dark btn-modal' onClick={handleCloseUpdate}>Back</button>
                        </div>
                        <div className='col-6'>
                            <button className='btn btn-success btn-modal' onClick={() => updateProduct(selectedItem.id)}>Update</button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

            {/* MODAL DELETE */}
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>DELETE</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    Are you sure want to delete <br></br>
                    <div className='fw-bold'>"{selectedItem.name}"</div>
                </Modal.Body>
                <Modal.Footer className='footer-delete'>
                    <div className='row'>
                        <div className='col-6'>
                            <button className='btn btn-dark btn-delete' onClick={handleCloseDelete}>No</button>
                        </div>
                        <div className='col-6'>
                            <button className='btn btn-danger btn-delete' onClick={() => deleteProduct(selectedItem.id)}>Yes, delete it</button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
            <Footer />
        </>
    )
}

export default DashboardPage;