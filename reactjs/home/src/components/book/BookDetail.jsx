import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Jumbotron from "../../templates/Jumbotron";
import { Button, Col, Row } from "react-bootstrap";
import { FaList, FaPenToSquare, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";


export default function BookDetail(){
    const { bookId } = useParams();

    if(/^[0-9]+$/.test(bookId) === false) {//숫자가 아니면
            return <Navigate to="/book/list" replace/>;
        }
    
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    useEffect(()=>{
        axios({
            url:"/api/book/detail",
            method : "get",
            params: { bookId : bookId }
        })
        .then(response=>{
            setBook(response.data);
        });
    }, [bookId]);

    const deleteBook = useCallback(()=>{

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
            if(result.isConfirmed) {
                axios({
                    url:"/api/book/delete",
                    method:"get",
                    params:{ bookId : bookId }
                })
                .then(response=>{
                    toast.error("국가 삭제가 완료되었습니다");
                    navigate("/book/list");
                });
            }
        });
        
    }, [bookId]);
    return(<>
        <Jumbotron title="도서 상세 정보" content={`${bookId}번 도서의 상세 정보 화면입니다`}/>
        { book === null ? (
            <h1>로딩중입니다...</h1>
        ) : (<>
        <Row className="mt-4 fs-4">
            <Col sm={3} className="text-info fw-bold">
                도서명
            </Col>
            <Col sm={9}>
                {book.bookTitle}
            </Col>
        </Row>
        <Row className="mt-4 fs-4">
            <Col sm={3} className="text-info fw-bold">
                작가
            </Col>
            <Col sm={9}>
                {book.bookAuthor}
            </Col>
        </Row>
        <Row className="mt-4 fs-4">
            <Col sm={3} className="text-info fw-bold">
                출판사
            </Col>
            <Col sm={9}>
                {book.bookPublisher}
            </Col>
        </Row>
        <Row className="mt-4 fs-4">
            <Col sm={3} className="text-info fw-bold">
                출판일
            </Col>
            <Col sm={9}>
                {book.bookPublicationDate}
            </Col>
        </Row>
        <Row className="mt-4 fs-4">
            <Col sm={3} className="text-info fw-bold">
                가격
            </Col>
            <Col sm={9}>
                {book.bookPrice.toLocaleString()}원
            </Col>
        </Row>
        <Row className="mt-4 fs-4">
            <Col sm={3} className="text-info fw-bold">
                페이지 수
            </Col>
            <Col sm={9}>
                {book.bookPageCount.toLocaleString()}페이지
            </Col>
        </Row>
        <Row className="mt-4 fs-4">
            <Col sm={3} className="text-info fw-bold">
                장르
            </Col>
            <Col sm={9}>
                {book.bookGenre}
            </Col>
        </Row>

        <Row className="mt-5">
            <Col className="text-end">
                <Button className="ms-2" variant="danger" onClick={deleteBook}>
                    <FaTrash className="me-2"/>
                    <span>삭제하기</span>
                </Button>
                <Button className="ms-2" variant="warning">
                    <FaPenToSquare className="me-2"/>
                    <span>수정하기</span>
                </Button>
                <Button className="ms-2" variant="secondary"
                        as={Link} to="/book/list">
                    <FaList className="me-2"/>
                    <span>목록으로</span>
                </Button>
            </Col>
        </Row>

        </>) }
    </>)
}