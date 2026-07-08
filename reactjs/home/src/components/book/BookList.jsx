import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../../templates/Jumbotron";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { FaChevronDown, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import axios from "axios";

export default function BookList() {
    //state
    const [bookList, setBookList] = useState([]);
    const [last, setLast] = useState(false);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState(false);

    //effect
    useEffect(()=>{
        loadMoreList();
    }, []);

    //callback
    const loadMoreList = useCallback(()=>{
        //이미 로딩중이면 차단
        if(loading === true) return;
        setLoading(true);

        const dataSize = bookList.length;
        const lastBookId = dataSize === 0 ? 0 : bookList[dataSize-1].bookId;

        axios({
            url:"/api/book/listForReact",
            method:"get",
            params: {//GET방식일 때
                lastBookId : lastBookId,
                size : size
            }
        })
        .then(response=>{
            setBookList([...bookList, ...response.data.list]);//이어쓰기
            setLast(response.data.last);
        })
        .finally(()=>setLoading(false));
    }, [bookList, size]);

    return (<>
        <Jumbotron title="도서 목록" content="등록된 도서의 목록을 확인하세요"/>
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

                <Button as={Link} to="/book/add" variant="success">
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
                                <th>작가</th>
                                <th>출판사</th>
                                <th>출판일</th>
                                <th className="text-end">가격</th>
                                <th className="text-end">페이지수</th>
                                <th>장르</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map(book=>(
                            <tr key={book.bookId}>
                                <td>{book.bookId}</td>
                                <td>
                                    <Link to={`/book/detail/${book.bookId}`}>
                                        {book.bookTitle}
                                    </Link>
                                </td>
                                <td>{book.bookAuthor}</td>
                                <td>{book.bookPublisher}</td>
                                <td>{book.bookPublicationDate}</td>
                                <td className="text-end">{book.bookPrice.toLocaleString()}원</td>
                                <td className="text-end">{book.bookPageCount.toLocaleString()}페이지</td>
                                <td>{book.bookGenre}</td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>

        {/* 더보기 버튼 */}
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

        {/* 로딩화면 */}
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