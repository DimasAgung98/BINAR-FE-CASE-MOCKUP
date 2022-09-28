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

    const [data, setData] = useState([]);

    //GET PRODUCTS
    const getProduts = () => {
        axios.get(`${API_URL}/v1/products`, {
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
    //HANDLE UPDATE
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);
    //HANDLE DELETE
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    useEffect(() => {
        getProduts()
    }, []);

    return (
        <>
            <Navbar />
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
                                        <div><MdOutlineEditCalendar onClick={handleShowUpdate} /></div>
                                        <div><RiDeleteBin5Line onClick={handleShowDelete} /></div>
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
                            <input type="text" className="mb-2 form-control" id="productname" placeholder='Product Name' />
                            <input type="number" className="mb-2 form-control" id="Price" placeholder='Price (Dollar USD)' />
                            <input type="text" className="mb-2 form-control" id="ImageURL" placeholder='Image URL' />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='row float-end'>
                        <div className='col-6'>
                            <button className='btn btn-dark btn-modal' onClick={handleCloseUpdate}>Back</button>
                        </div>
                        <div className='col-6'>
                            <button className='btn btn-success btn-modal'>Update</button>
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
                    Bycyle Giant Reign ?
                </Modal.Body>
                <Modal.Footer className='footer-delete'>
                    <div className='row'>
                        <div className='col-6'>
                            <button className='btn btn-dark btn-delete' onClick={handleCloseDelete}>No</button>
                        </div>
                        <div className='col-6'>
                            <button className='btn btn-danger btn-delete'>Yes, delete it</button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
            <Footer />
        </>
    )
}

export default DashboardPage;