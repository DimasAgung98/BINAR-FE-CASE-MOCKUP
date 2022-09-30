import axios from 'axios';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_URL } from '../config/baseurl';
import auth from '../utils/auth';

function Navbar(props) {
    const { getProducts } = props;
    const navigate = useNavigate();

    //HANDLE LOGOUT
    const handleLogout = () => {
        Swal.fire({
            icon: 'success',
            title: 'LOG OUT',
            text: 'LOG OUT SUCCESSFULLY',
            confirmButtonColor: '#dc3545',
        })
        localStorage.clear('token')
        navigate('/')
    }

    //MODAL HANDLE CREATE
    const [showCreate, setShowCreate] = useState(false);
    const handleShowCreate = () => setShowCreate(true);
    const handleCloseCreate = () => setShowCreate(false);
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [imageurl, setImageUrl] = useState('')

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        try {
            axios.post(`${API_URL}/v1/products/`, {
                name: name,
                price: price,
                imageurl: imageurl,
            }, {
                headers: {
                    'Authorization': `token ${auth()}`
                }
            }).then((response) => {
                console.log(response);
                if (response.data.status === 'OK') {
                    Swal.fire({
                        icon: 'success',
                        title: 'SUCCESS',
                        text: 'Create Product Success',
                        confirmButtonColor: '#dc3545',
                    })
                    handleCloseCreate();
                    getProducts();
                }
            })
        }
        catch (err) {
            alert(err.toString())
            console.log(err)
        }
    }
    return (
        <>
            <section id='Navbar'>
                <header className='mx-5'>
                    <div className='d-flex align-items-center'>
                        <h3 className='me-5'>Product List</h3>
                        <button onClick={handleShowCreate} className='btn btn-primary'>Create new</button>
                    </div>
                    <div className='btn-logout' onClick={handleLogout}>Logout</div>
                </header>
                <hr></hr>
            </section>

            {/* MODAL CREATE NEW PRODUCT */}
            <Modal show={showCreate} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>CREATE NEW</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method='post'>
                        <div className='row align-items-center justify-content-center'>
                            <input type="text" className="mb-2 form-control" id="productname" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="number" className="mb-2 form-control" id="Price" placeholder='Price (Dollar USD)' value={price} onChange={(e) => setPrice(e.target.value)} />
                            <input type="text" className="mb-2 form-control" id="ImageURL" placeholder='Image URL' value={imageurl} onChange={(e) => setImageUrl(e.target.value)} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='row float-end'>
                        <div className='col-6'>
                            <button className='btn btn-dark btn-modal' onClick={handleCloseCreate}>Back</button>
                        </div>
                        <div className='col-6'>
                            <button className='btn btn-primary btn-modal' onClick={handleSubmitCreate}>Create</button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Navbar;