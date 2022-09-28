import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Modal } from 'react-bootstrap';

function DashboardPage() {
    //HANDLE UPDATE
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);
    //HANDLE DELETE
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const PRODUCTS = [
        {
            "id": 1,
            "name": "Giant Reign",
            "price": 2560,
            "imageurl": "https://www.bmtbonline.com/WebRoot/Store10/Shops/61513316/5FE0/5552/B0CC/72B2/D939/0A0C/6D0E/EF35/MarinLarkspur2_web_m.jpg",
            "created_at": "2018-01-10T12:41:55.284Z",
            "updated_at": "2018-01-10T12:41:55.284Z"
        },
        {
            "id": 2,
            "name": "Santa Cruz Nomad",
            "price": 7510,
            "imageurl": "https://www.santacruzbicycles.com/files/frame-thumbs/my18_nomad_xx1_rsv30_tan.jpg",
            "created_at": "2018-01-10T12:41:55.295Z",
            "updated_at": "2018-01-10T12:41:55.295Z"
        },
        {
            "id": 3,
            "name": "Yeti SB5",
            "price": 8715,
            "imageurl": "https://www.bmtbonline.com/WebRoot/Store10/Shops/61513316/6035/A790/5F5E/D815/0F5A/0A0C/6D12/000D/FBKrampusSilver_web_m.jpg",
            "created_at": "2018-01-10T12:41:55.298Z",
            "updated_at": "2018-01-10T12:41:55.298Z"
        },
        {
            "id": 4,
            "name": "Gestalt Basic",
            "price": 1520,
            "imageurl": "https://www.bmtbonline.com/WebRoot/Store10/Shops/61513316/5FBC/5CAE/DE80/10E8/D1E0/0A0C/6D0F/5842/FBGestaltBasic_web_m.jpg",
            "created_at": "2018-01-10T12:41:55.284Z",
            "updated_at": "2018-01-10T12:41:55.284Z"
        },
        {
            "id": 5,
            "name": "Nicasio 650",
            "price": 9510,
            "imageurl": "https://www.bmtbonline.com/WebRoot/Store10/Shops/61513316/5FCA/EB26/AB07/F631/BB61/0A0C/6D0D/6796/Nicasio650Tan_web_m.jpg",
            "created_at": "2018-01-10T12:41:55.295Z",
            "updated_at": "2018-01-10T12:41:55.295Z"
        },
        {
            "id": 6,
            "name": "Fair fax 10",
            "price": 10.125,
            "imageurl": "https://www.bmtbonline.com/WebRoot/Store10/Shops/61513316/5FE0/5592/E921/9192/7D30/0A0C/6D0C/0DFB/Fairfax1OrangeGrey_web_m.jpg",
            "created_at": "2018-01-10T12:41:55.298Z",
            "updated_at": "2018-01-10T12:41:55.298Z"
        }
    ]
    console.log(PRODUCTS);
    return (
        <>
            <Navbar />
            <section id='card-product'>
                <div className='container mt-5'>
                    <div className='row'>
                        {
                            PRODUCTS.map(item => (
                                <div className='col-4 mb-5'>
                                    <div class="card">
                                        <div className='d-flex icon'>
                                            <div className='me-3'><MdOutlineEditCalendar onClick={handleShowUpdate} /></div>
                                            <div><RiDeleteBin5Line onClick={handleShowDelete} /></div>
                                        </div>
                                        <img src={item.imageurl} className="image-product" alt="produk" />
                                        <div class="card-body">
                                            <div class="card-text">{item.name}</div>
                                            <div class="text-muted">$ {item.price}</div>
                                        </div>
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
                            <button className='btn btn-danger btn-modal' onClick={handleCloseUpdate}>Back</button>
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
                            <button className='btn btn-danger btn-delete' onClick={handleCloseDelete}>No</button>
                        </div>
                        <div className='col-6'>
                            <button className='btn btn-success btn-delete'>Yes, delete it</button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DashboardPage