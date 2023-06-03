
import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { Calendar2, Envelope, Grid, Person, Phone, Stopwatch } from 'react-bootstrap-icons'

import axios from '../../axios.js'
import { fetchAuthMe } from "../../redux/slices/user.js";
import { fetchSetStatus } from "../../redux/slices/order.js";

const Order = ({ order, i, userData }) => {

    const fileInputRef = React.useRef(null)

    const dispatch = useDispatch()

    const handleChooseImages = async (event) => {
        try {
            Array.from(event.target.files).forEach(async (fil, i) => {
                const formData = new FormData();
                formData.append("file", fil);
                const { data } = await axios.post(`/api/upload/order/${order?._id}`, formData);
                console.log(data.url);
            })
            await dispatch(fetchAuthMe());
            window.location.reload()
        } catch (error) {
            console.warn(error);
            alert("Тапсырыс құжатын көшіру кезінде қате шықты");
        }


    };

    const setStatus = async (status) => {
       const response = await dispatch(fetchSetStatus({
            orderId: order?._id,
            status: status && status
        }))
        alert(response?.payload?.message)
        window.location.reload()
    }

    console.log(order && order)

    console.log('userData', userData && userData?.role)

    return (<>
        <Col md={12} style={{
            border: '1px solid #4C5CE8',
            marginTop: '12px',
            padding: '24px',
            backgroundColor: 'white'
        }}>
            <div className="text-start">
                <Row>
                    <Col md={6} className="text-start"><h6 style={{ color: '#5D6EFF' }}>{`${order?._id} - тапсырыс`} </h6></Col>
                    <Col md={6} className="text-end"><p>{new Date(order?.createdAt)?.toISOString().substring(0, 19).replace('T', ' ')}</p></Col>
                </Row>

                <h5>{order?.title}</h5>
                <p><Stopwatch color="#5D6EFF" size="28px" />&nbsp;  {order?.deadline}</p>
                <p>{order?.description}</p>
                <p><Calendar2 color="#5D6EFF" size="28px" />&nbsp;&nbsp;Статусы:&nbsp;&nbsp;{order?.status}</p>
                <hr />
                <Row>
                    {
                        order?.files?.map((img, i) => (
                            <Col md={6} className="text-center" >
                                <div style={{
                                    border: '1px solid #778AFF',
                                    margin: '8px 4px',
                                    padding: '10px'
                                }}>
                                    <label style={{ color: '#5465FF', fontSize: '18px', fontWeight: '600' }}>{img?.name}</label>
                                    <br />
                                    <img src={`https://crm-mm45.onrender.com/${img?.url}`}
                                        style={{
                                            background: 'url(https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png)',
                                            backgroundSize: 'cover'
                                        }}
                                        onClick={() => window.location.assign(`https://crm-mm45.onrender.com/${img?.url}`)}
                                        className="order-img img-fluid an-img"  alt="" />
                                </div>
                            </Col>
                        ))
                    }
                </Row>

                {userData?.role == 'client' && <>
                    <br />
                    <button className="btn btn-primary" style={{ margin: '12px 0 0 0' }} onClick={() => { fileInputRef.current.click() }}>Құжат көшіру</button>
                    <input type="file" className="btn btn-primary" multiple hidden name="sacasc" ref={fileInputRef} onChange={handleChooseImages} />
                    
                </>
                }
                <hr />

            </div>
            <Row>
                <Col md={6}>
                    <div className="text-start">
                        <h6>{order?.customer?.lastname} {order?.customer?.firstname} {order?.customer?.patronymic}</h6>
                        <p><Person color="#5D6EFF" size="28px" />  &nbsp;Клиент </p>
                        <p><Envelope color="#5D6EFF" size="28px" />&nbsp;&nbsp;{order?.customer?.email}  </p>
                        <p><Phone color="#5D6EFF" size="28px" />&nbsp;&nbsp;{order?.customer?.phone}  </p>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="text-end">
                        <h6>{order?.performer?.lastname} {order?.performer?.firstname} {order?.performer?.patronymic}</h6>
                        <p>Менеджер &nbsp; <Person color="#5D6EFF" size="28px" /></p>
                        <p> {order?.performer?.email} &nbsp;&nbsp;<Envelope color="#5D6EFF" size="28px" /> </p>
                        <p> {order?.performer?.phone} &nbsp;&nbsp;<Phone color="#5D6EFF" size="28px" /> </p>
                    </div>
                </Col>
                <Col md={12}><hr /></Col>
                <Col md={12}>
                {
                    userData?.role == 'manager' && <>
                    <Button className="btn btn-primary btn-btn-btn" onClick={() => setStatus('Тапсырыс қабылданды')}>Тапсырысты қабылдау</Button>
                    <Button className="btn btn-primary btn-btn-btn" onClick={() => setStatus('Тапсырыс орындауда')}>Тапсырысты орындауға кірісу</Button>
                    <Button className="btn btn-primary btn-btn-btn" onClick={() => setStatus('Тапсырыс аяқталды')}>Тапсырысты аяқтау</Button>
                    </>
                }
                </Col>
            </Row>


        </Col>
    </>)
}

export default Order