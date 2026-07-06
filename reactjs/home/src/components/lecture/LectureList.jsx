import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../../templates/Jumbotron";
import axios from "axios";
import { FaChevronDown, FaPlus } from "react-icons/fa6";
import { ClockLoader } from "react-spinners";
import { Button, Col, Row, Table,Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LectureList() {

    //state
    const [lectureList , setLectureList] = useState([]);
    const [last , setLast] = useState(false);
    const [size , setSize] = useState(10);
    const [loading , setLoading] = useState(false);

    //effect
    useEffect(()=>{
        loadMoreList();
    },[]);

    //callback
    const loadMoreList = useCallback(()=>{
        if(loading === true)return;
        setLoading(true);

        const dataSize = lectureList.length;
        const lastLectureNo = dataSize === 0 ? 0 : lectureList[dataSize-1].lectureNo;

        axios({
            url : "http://localhost:8080/api/lecture/listForReact",
            method : "get",
            params : {
                lastLectureNo : lastLectureNo,
                size : size
            }
        })
        .then(response=>{
            setLectureList([...lectureList, ...response.data.list])
            setLast(response.data.last);
        })
        .finally(()=>setLoading(false));
    },[lectureList,size])

    return (<>
        <Jumbotron title="강의 목록" content="등록된 국가의 목록을 확인하세요"/>
        {/* <Row className="mt-5">
            <Col>
                <Table nowrap>

                </Table>
            </Col>
        </Row> */}
        <Row className="mt-4">
            <Col xs={6}>
                <Form.Select value={size} onChange={e=>setSize(parseInt(e.target.value))}
                        className="w-auto">
                    <option value="5">5개씩 보기</option>
                    <option value="10">10개씩 보기</option>
                    <option value="20">20개씩 보기</option>
                    <option value="50">50개씩 보기</option>
                </Form.Select>
            </Col>
            <Col xs={6} className="text-end">
                <Button as={Link} to="/lecture/add" variant="success">
                    <FaPlus/>
                    <span className="ms-2">신규등록</span>
                </Button>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col className="text-nowrap">
                <div className="text-nowrap table-responsive">
                    <Table hover responsive striped>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>분류</th>
                                <th className="text-end">시간</th>
                                <th className="text-end">가격</th>
                                <th>형태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lectureList.map(lecture=>(
                                <tr key={lecture.lectureNo}>
                                    <td>{lecture.lectureNo}</td>
                                    <td>
                                        <Link to={`/lecture/detail/${lecture.lectureNo}`}>
                                            {lecture.lectureTitle}
                                        </Link>
                                    </td>
                                    <td>{lecture.lectureCategory}</td>
                                    <td>{lecture.lectureDuration}</td>
                                    <td className="text-end">{lecture.lecturePrice.toLocaleString()}</td>
                                    <td>{lecture.lectureType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>


        { last === false && (
        <Row className="mt-2">
            <Col>
                <Button variant="outline-success" size="lg" 
                    className="w-100" onClick={loadMoreList}>
                    <FaChevronDown/>
                    <span className="mx-2">더보기</span>
                    <FaChevronDown/>
                </Button>
            </Col>
        </Row>
        ) }
        { loading === true && (
        <div className="position-fixed top-0 start-0 
                        w-100 h-100 bg-dark bg-opacity-25
                        d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column text-center">
                <ClockLoader size={75} loading={loading}/>
                <p className="mt-2">불러오는중</p>
            </div>
        </div>
        ) }
    </>)

}