import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Jumbotron from "../../templates/Jumbotron";
import { Button, Col, Row, Form } from "react-bootstrap";
import { FaAsterisk, FaList, FaSquarePen, FaXmark } from "react-icons/fa6";

export default function BookEdit(){

    const { bookId } = useParams();
    if(/^[0-9]+$/.test(bookId) === false) {//숫자가 아니면
            return <Navigate to="/country/list" replace/>;
        }

    const navigate = useNavigate();

    const [book , setBook] = useState({
        bookTitle:"",
        bookAuthor:"",
        bookPublisher:"",
        bookPublicationDate:"",
        bookPrice:0,
        bookPageCount:0,
        bookGenre:""
    });
    useEffect(()=>{
        loadData();
    },[]);

    const loadData = useCallback(async ()=>{
        const response = await apiClientget(`/api/book/${bookId}`)
        setBook(response.data);
    },[]);

    const [result, setResult] = useState({
        bookTitle:"",
        bookAuthor:"",
        bookPublisher:"",
        bookPublicationDate:"",
        bookPrice:"",
        bookPageCount:"",
        bookGenre:""
    });

    const valid = useMemo(()=>{
        if(result.bookTitle !== "is-valid") return false;
        if(result.bookAuthor !== "is-valid") return false;
        if(result.bookPublisher !== "is-valid") return false;
        if(result.bookPublicationDate !== "is-valid") return false;  
        if(result.bookPrice !== "is-valid") return false;  
        if(result.bookPageCount !== "is-valid") return false;  
        if(result.bookGenre !== "is-valid") return false;  
        return true;
    },[result]);

    const changeStringValue = useCallback((e)=>{
        const {name , value} = e.target;

        setBook({
            ...book,
            [name] : value
        });
    },[book]);
    const changeNumericValue = useCallback((e)=>{
        const { name , value } = e.target;
        const regex = /[^0-9]/g;
        const replacement = value.replace(regex,"");
        const result = parseInt(replacement|| 0);

        setBook({
            ...book,
            [name] : result
        });
    },[book]);

    //검사
    const checkBookTitle = useCallback(()=>{
        const valid = book.bookTitle.length > 0;
        setResult({
            ...result,
            bookTitle : valid ? "is-valid" : "is-invalid"
        })
    }, [book.bookTitle, result]);
    const checkBookPublisher = useCallback(()=>{
        setResult({
            ...result,
            bookPublisher : "is-valid"
        })
    }, [book.bookPublisher, result]);
    const checkBookAuthor = useCallback(()=>{
        const regex = /^[^!@#$]+$/;
        const valid = book.bookAuthor.length === 0 
                        || regex.test(book.bookAuthor);//없거나 형식에 맞거나
        setResult({
            ...result,
            bookAuthor : valid ? "is-valid" : "is-invalid"
        })
    }, [book.bookAuthor, result]);
    const checkBookPublicationDate = useCallback(()=>{
        const regex = /^([0-9]{4})-(((02)-(0[1-9]|1[0-9]|2[0-9]))|((0[469]|11)-(0[1-9]|1[0-9]|2[0-9]|30))|((0[13578]|1[02])-(0[1-9]|1[0-9]|2[0-9]|3[01])))$/;
        const valid = book.bookPublicationDate.length === 0
                        || regex.test(book.bookPublicationDate);
        setResult({
            ...result,
            bookPublicationDate : valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookPublicationDate, result]);
    const checkBookPrice = useCallback(()=>{
        const valid = book.bookPrice >= 0;
        setResult({
            ...result,
            bookPrice : valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookPrice, result]);
    const checkBookPageCount = useCallback(()=>{
        const valid = book.bookPageCount > 0;
        setResult({
            ...result,
            bookPageCount : valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookPageCount, result]);
    const checkBookGenre = useCallback(()=>{
        const valid = ["판타지","교양","소설","역사","과학","추리소설","자기계발","수험서"].includes(book.bookGenre);
        setResult({
            ...result,
            bookGenre: valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookGenre, result]);

    useEffect(()=>{
        if(book.bookGenre === "" && result.bookGenre === "") return;

        checkBookGenre();
    },[book.bookGenre, result.bookGenre]);

    //데이터전송
    const send = useCallback(async()=>{
        const response = await apiClientput(
            `/api/book/${bookId}`,
            book
        );
        toast.success("도서 정보 변경이 완료되었습니다");
        navigate(`/book/detail/${bookId}`);
    },[book]);
    return(<>
    <Jumbotron title="도서 수정"/>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>제목</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="bookTitle" value={book.bookTitle}
                        onChange={changeStringValue} 
                        onBlur={checkBookTitle}
                        className={result.bookTitle}/>
                <div className="valid-feedback">도서명 설정완료</div>
                <div className="invalid-feedback">도서명은 한글로만 작성 가능합니다</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>작가</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="bookAuthor" 
                        value={book.bookAuthor}
                        onChange={changeStringValue} 
                        onBlur={checkBookAuthor}
                        className={result.bookAuthor}/>
                <div className="valid-feedback">작가가 등록되었습니다.</div>
                <div className="invalid-feedback">필수 입력 항목입니다</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>출판사</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="bookPublisher" 
                        value={book.bookPublisher}
                        onChange={changeStringValue} 
                        onBlur={checkBookPublisher}
                        className={result.bookPublisher}/>
                <div className="valid-feedback">출판사가 설정되었습니다</div>
                <div className="invalid-feedback">필수 입력 항목입니다</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>출판일</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="date" name="bookPublicationDate" 
                        value={book.bookPublicationDate}
                        onChange={changeStringValue} 
                        onBlur={checkBookPublicationDate}
                        className={result.bookPublicationDate}/>
                <div className="valid-feedback">출판일이 설정되었습니다</div>
                <div className="invalid-feedback">필수 입력 항목입니다</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>가격</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="bookPrice" 
                        value={book.bookPrice}
                        onChange={changeNumericValue} 
                        onBlur={checkBookPrice}
                        className={result.bookPrice}/>
                <div className="valid-feedback">가격이 설정되었습니다</div>
                <div className="invalid-feedback">필수 입력 항목입니다</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>페이지 수</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="bookPageCount" 
                        value={book.bookPageCount}
                        onChange={changeNumericValue} 
                        onBlur={checkBookPageCount}
                        className={result.bookPageCount}/>
                <div className="valid-feedback">페이지수가 설정되었습니다</div>
                <div className="invalid-feedback">필수 입력 항목입니다</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>대륙명</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Select name="bookGenre" value={book.bookGenre}
                    onChange={changeStringValue} className={result.bookGenre}>
                    <option value="">선택하세요</option>
                    <option>판타지</option>
                    <option>교양</option>
                    <option>소설</option>
                    <option>역사</option>
                    <option>과학</option>
                    <option>추리소설</option>
                    <option>자기계발</option>
                    <option>수험서</option>
                </Form.Select>
                {/* <div className="valid-feedback"></div> */}
                <div className="invalid-feedback">필수 선택 항목입니다</div>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col className="text-end">
                <Button as={Link} to={`/book/list`} variant="secondary">
                    <FaList className="me-2"/>
                    <span>목록으로</span>
                </Button>
                <Button as={Link} to={`/book/detail/${bookId}`} variant="danger" className="ms-2">
                    <FaXmark className="me-2"/>
                    <span>취소하기</span>
                </Button>
                <Button type="button" variant="success" className="ms-2"
                    disabled={valid === false} onClick={send}>
                    <FaSquarePen className="me-2"/>
                    <span>수정하기</span>
                </Button>
            </Col>
        </Row>
    </>)
}