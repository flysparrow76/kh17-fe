import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import Jumbotron from "../../templates/Jumbotron";
import Swal from "sweetalert2";
import { Button, Col, Row } from "react-bootstrap";
import { FaList, FaPenToSquare, FaTrash } from "react-icons/fa6";

export default function LectureDetail(){
    
    const { lectureNo } = useParams();

    if(/^[0-9]+$/.test(lectureNo) === false) {//숫자가 아니면
            return <Navigate to="/lecture/list" replace/>;
    }

    const navigate = useNavigate();
    
    const [lecture, setLecture] = useState(null);
    useEffect(()=>{
        axios({
            url : "http://localhost:8080/api/lecture/detail",
            method : "get",
            params : {lectureNo : lectureNo}
        })
        .then(response=>{
            console.log(response);
            console.log(response.status);
            console.log(response.data);
            setLecture(response.data);
        })
    },[])

    const deleteLecture = useCallback(()=>{
            // const choice = window.confirm("정말 삭제하시겠습니까?\n삭제 후에는 복구가 안됩니다");
            // if(choice === false) return;
            Swal.fire({
                title:"정말 삭제하시겠습니까?",
                text:"삭제한 데이터는 복구하실 수 없습니다",
                icon:"warning",
                showCancelButton:true,
                confirmButtonText:"삭제",
                cancelButtonText:"취소",
                confirmButtonColor:"#d63031",
                cancelButtonColor:"#b2bec3"
            })
            .then(result=>{
                if(result.isConfirmed){
                    axios({
                        url : "http://localhost:8080/api/lecture/delete",
                        method : "get",
                        params : {lectureNo : lectureNo}
                    })
                    .then(response=>{
                        toast.error("강의 삭제가 완료되었습니다.");
                        navigate("/lecture/list");
                    });
                }
            });
    },[lectureNo]);
    return(<>
        <Jumbotron title="강의 상세 정보" content={`${lectureNo}번 국가의 상세 정보 화면입니다`}/>
        { lecture === null ? (
            <h1>로딩중입니다...</h1>
        ) : (<>
        <Row className="mt-4 fs-4">
            <Col sm={3} className="text-info fw-bold">
                강의명
            </Col>
            <Col sm={9}>
                {lecture.lectureTitle}
            </Col>
        </Row>
        <Row className="mt-4 fs-4">
            <Col sm={3} className="text-info fw-bold">
                분류
            </Col>
            <Col sm={9}>
                {lecture.lectureCategory}
            </Col>
        </Row>
        <Row className="mt-4 fs-4">
            <Col sm={3} className="text-info fw-bold">
                시간
            </Col>
            <Col sm={9}>
                {lecture.lectureDuration}
            </Col>
        </Row>
        <Row className="mt-4 fs-4">
            <Col sm={3} className="text-info fw-bold">
                가격
            </Col>
            <Col sm={9}>
                {lecture.lecturePrice.toLocaleString()}
            </Col>
        </Row>
        <Row className="mt-4 fs-4">
            <Col sm={3} className="text-info fw-bold">
                형태
            </Col>
            <Col sm={9}>
                {lecture.lectureType}
            </Col>
        </Row>

        <Row className="mt-5">
            <Col className="text-end">
                <Button className="ms-2" variant="danger" onClick={deleteLecture}>
                    <FaTrash className="me-2"/>
                    <span>삭제하기</span>
                </Button>
                <Button className="ms-2" variant="warning">
                    <FaPenToSquare className="me-2"/>
                    <span>수정하기</span>
                </Button>
                <Button className="ms-2" variant="secondary"
                        as={Link} to="/lecture/list">
                    <FaList className="me-2"/>
                    <span>목록으로</span>
                </Button>
            </Col>
        </Row>

        </>) }
    </>)
}