import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import * as fetchDep from "../redux/slices/department.js";
import * as fetchUser from "../redux/slices/user.js";

import { BookFill, Calendar, Calendar2, Calendar2Date, Diagram3, Envelope, GenderAmbiguous, GenderFemale, GenderMale, Grid, Person, PersonAdd, PersonVcard, Phone, Stopwatch } from 'react-bootstrap-icons'
import Profile from "./Profile.jsx";
import { fetchCreateDepartment } from "../redux/slices/department.js";
import { useParams } from "react-router-dom";

const AddEmployee = () => {

    const dispatch = useDispatch()

    const { id } = useParams()

    const { data, all_users } = useSelector(state => state.user)

    const { departments } = useSelector(state => state.department)

    const [employee, setEmployee] = React.useState()

    React.useEffect(() => {
        dispatch(fetchUser.fetchGetAll())
        dispatch(fetchDep.fetchGetAll())

    }, [])

    const employees = []

    const employeeOptions = [
        { value: 0, text: "--Қызметкерді таңдаңыз --", id: '' }
    ];

    all_users?.items?.forEach((user, i) => {
        if (user?.role == 'employee') {
            employeeOptions.push({
                value: i + 1,
                text: `${user?.lastname} ${user?.firstname} ${user?.patronymic} - ${user?.email}`,
                id: user?._id
            })
        }
    })

    console.log(employeeOptions && employeeOptions)

    console.log(employee && employee)

    const addEmp = async () => {
        await dispatch(
            fetchDep.fetchSetEmp({
                department_id: id,
                employee_id: employee && employee 
            })
        );
        window.location.assign(`https://phenomenal-figolla-efe241.netlify.app/departments/${id}`)
    };

    console.log(departments && departments)

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
                }}>Бөлімдер &nbsp; <Diagram3 color="#5566FF" style={{
                    fontWeight: '600px'
                }} size={42} /> &nbsp; Қызметкер қосу</h4>

                {
                    departments?.items?.map((dep, i) => dep?._id == id &&  (
                        <h3 style={{marginBottom: '24px'}}>{dep?.department}</h3>
                    ))
                }

                <Row>
                    <Col md={8}>
                        <select
                            selected={employee}
                            onChange={event => { setEmployee(event.target.value) }}
                            className="form-control-input select-input flex-fill d-block w-100"
                            style={{
                                backgroundColor: 'white'
                            }}>
                            {employeeOptions?.map((option, i) => (
                                <option key={i} value={option?.id}>
                                    {option?.text}
                                </option>
                            ))}
                        </select>
                    </Col>

                    <Col md={4} className="text-end">
                        <button className="signup-btn flex-fill d-block w-100" disabled={!employee} onClick={addEmp} style={{
                            padding: '8px 24px'
                        }}>
                            <PersonAdd size="24px" /> &nbsp; Қызметкерді қосу
                        </button>
                    </Col>
                </Row>

                <Row style={{ margin: '24px 0 0 0' }}>

                    {
                        departments?.items?.map((dep, i) => dep?._id == id && (
                            dep?.employees?.map((mes, i) => 
                            <Col md={3} style={{ margin: '4px' }} >
                                <div className="d-flex row align-items-center" style={{
                                    border: '1px solid #4C5CE8',
                                    backgroundColor: 'white',
                                    padding: '12px',
                                    height: '400px'
                                }}>

                                    <Row>
                                        <Col className="">
                                            <img src={`https://crm-mm45.onrender.com/${mes?.avatar}`} width={'100px'} height={'100px'} style={{border: '1px solid blue', margin: '8px auto'}} alt="" />
                                            <h6>{mes?.lastname} {mes?.firstname} {mes?.patronymic}</h6>
                                            <hr />
                                            <p><Envelope size={'28px'} color="#5667FF" /> &nbsp;{mes?.email}</p>
                                            <p><Phone size={'28px'} color="#5667FF" /> &nbsp;{mes?.phone}</p>
                                            <p><Calendar2Date size={'28px'} color="#5667FF" /> &nbsp;{mes?.birthday?.substring(0, 10)}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                    </Row>
                                </div>

                            </Col>)
                            
                        ))
                    }
                </Row>

            </Row>
        </Container>
    </>)
}

export default AddEmployee