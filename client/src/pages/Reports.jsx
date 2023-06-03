import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { fetchGetAll, fetchSetResponse } from "../redux/slices/report.js";

import { Calendar2, Envelope, Grid, JournalCheck, Person, Phone, Stopwatch } from 'react-bootstrap-icons'
import Profile from "./Profile.jsx";
import Order from '../components/Order/Order.jsx'

const Reports = () => {

    const dispatch = useDispatch()

    const { data } = useSelector(state => state.user)

    const { items } = useSelector(state => state.report)

    const [response, setResponse] = React.useState()

    const [errorMessage, setErrorMessage] = React.useState('')

    React.useEffect(() => {
        dispatch(fetchGetAll())
    }, [])


    // const onSubmit = async (values) => {
    //     const fetchData = await dispatch(
    //         fetchUpdate({
    //         })
    //     );

    //     dispatch(fetchAuthMe())

    //     alert(fetchData.payload.message)

    //     if ("token" in fetchData.payload) {
    //         window.localStorage.setItem("token", fetchData.payload.token);
    //     }
    // };


    const resp = async (id) => {
       const data = await  dispatch(fetchSetResponse({
        reportId: id && id,
        response: response && response
       }))

       alert(data?.payload?.message)
       window.location.reload()
    }


    console.log(items && items)

    return (<>
        <Container style={{
            margin: '60px auto'
        }}>
            <br />
            <br />
            <Row>
                <h4 style={{
                    color: '#5566FF',
                    margin: '0 0 30px 0 '
                }}>{
                        'Есептер'
                    } &nbsp; <JournalCheck color="#5566FF" style={{
                        fontWeight: '600px'
                    }} size={42} /></h4>

                {data?.role == 'director' && <Col md={12} style={{
                    border: '1px solid #4C5CE8',
                    padding: '24px',
                    backgroundColor: 'white'
                }}>
                    <Row>

                        <button
                            style={{
                                padding: '8px 12px',
                                margin: '12px auto 0 auto'
                            }} className="signup-btn" onClick={() => {
                                window.location.assign(
                                    'https://phenomenal-figolla-efe241.netlify.app/reports/create'
                                )
                            }} >
                            {"Жаңа есеп құру"}
                        </button>

                        <Col md={12} className="d-flex justify-content-center">
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/report-7108510-5791726.png?f=webp" height={'300px'} alt="" />
                        </Col>
                    </Row>
                </Col>}
                <hr />
                {data?.role == 'manager' ?
                    items?.map((item, i) => (
                        <Col md={4}>
                            <div style={{border: '1px solid #5465FF', padding: '12px'}}>
                                <Row>
                                    <Col md={6} className="text-start">
                                        <p>Есеп - {(item?._id)?.substring(0,6)}</p>
                                    </Col>
                                    <Col md={6} className="text-end">
                                    <p>{new Date(item?.createdAt).toLocaleString('kk-KZ')}</p>
                                    </Col>
                                    <Col md={12}>
                                    <h5>{item?.title}</h5>
                                    </Col>
                                    <Col md={12}>
                                        <hr style={{margin: '8px auto'}}/>
                                    </Col>
                                    <Col md={12}>
                                        <p>{item?.description}</p>
                                    </Col>
                                    <Col md={12}>
                                        <hr style={{margin: '0px auto 10px auto'}}/>
                                    </Col>
                                    <Col md={12}>
                                        <h6>Жауап беруші: {item?.respondent?.lastname} {item?.respondent?.firstname} {item?.respondent?.patronymic}</h6>
                                        <textarea className="form-control" id=""  onChange={(event) => {setResponse(event.target.value)}}
                                         placeholder={item?.response ? item?.response : "Есеп беру мәтінін енгізіңіз"} cols="30" rows="10"></textarea>
                                        <div className="text-end">
                                            <Button className="btn btn-primary"
                                            onClick={() => {resp(item?._id)}}
                                             style={{borderRadius: '1px', marginTop: '10px'}}>
                                            Жауап жіберу
                                            </Button></div>
                                        
                                    </Col>
                                </Row>

                                
                            </div>
                        </Col>
                        

                    ))
                    :
                    items?.map((item, i) => item?.demander?._id == data?._id && (
                        <Col md={4}>
                            <div style={{border: '1px solid #5465FF', padding: '12px'}}>
                                <Row>
                                    <Col md={6} className="text-start">
                                        <p>Есеп - {(item?._id)?.substring(0,6)}</p>
                                    </Col>
                                    <Col md={6} className="text-end">
                                    <p>{new Date(item?.createdAt).toLocaleString('kk-KZ')}</p>
                                    </Col>
                                    <Col md={12}>
                                    <h5>{item?.title}</h5>
                                    </Col>
                                    <Col md={12}>
                                        <hr style={{margin: '8px auto'}}/>
                                    </Col>
                                    <Col md={12}>
                                        <p>{item?.description}</p>
                                    </Col>
                                    <Col md={12}>
                                        <hr style={{margin: '0px auto 10px auto'}}/>
                                    </Col>
                                    <Col md={12}>
                                        <h6>Жауап беруші: {item?.respondent?.lastname} {item?.respondent?.firstname} {item?.respondent?.patronymic}</h6>
                                        <p>{item?.response}</p>
                                        
                                    </Col>
                                </Row>

                                
                            </div>
                        </Col>
                        

                    ))
                }
            </Row>
        </Container>
    </>)
}

export default Reports
