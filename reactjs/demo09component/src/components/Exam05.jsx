import { useCallback, useEffect, useMemo, useState } from "react";
import Jumbotron from "./Jumbotron";
import axios from "axios";
import Swal from "sweetalert2";
import { FaAsterisk, FaPlus } from "react-icons/fa6";

function Exam05() {
    //state
    const [book, setBook] = useState({
        bookTitle : "",
        bookAuthor : "",
        bookPublisher : "",
        bookPublicationDate : "",
        bookPrice : "",
        bookPageCount : "",
        bookGenre : ""
    });
    const [result, setResult] = useState({
        bookTitle : null,
        bookAuthor : null,
        bookPublisher : null,
        bookPublicationDate : null,
        bookPrice : null,
        bookPageCount : null,
        bookGenre : null
    });

    //callback
    //- 입력함수들
    const changeStringValue = useCallback(e=>{
        const { name, value } = e.target;
        setBook({
             ...book,
              [name] : value 
        });
    }, [book]);

    const changeNumericValue = useCallback(e=>{
        const { name, value } = e.target;
        const regex = /[^0-9]/g;
        const replacement = value.replace(regex, "");
        if(replacement.length === 0) {
            setBook({
                 ...book,
                [name] : replacement
             })
        }
        else {
            setBook({
                 ...book, 
                 [name] : parseInt(replacement) 
            });
        }
    }, [book]);

    //- 검사함수들
    const checkBookTitle = useCallback(()=>{
        const valid = book.bookTitle.length > 0;
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({
             ...result,
            bookTitle : clazz 
        });
    }, [book, result]);

    const checkBookAuthor = useCallback(()=>{
        const regex = /^[^!@#$]+$/;
        const valid = book.bookAuthor.length > 0 || regex.test(book.bookAuthor);
        const clazz = valid ? "is-valid" : "is-invalid"
        setResult({
            ...result,
            bookAuthor : clazz 
        });
    }, [book, result]);

    const checkBookPublisher = useCallback(()=>{
        setResult({
            ...result, 
            bookPublisher : "is-valid"
        });
    }, [book, result]);

    const checkBookPublicationDate = useCallback(()=>{
        const regex = /^([0-9]{4})-(((02)-(0[1-9]|1[0-9]|2[0-9]))|((0[469]|11)-(0[1-9]|1[0-9]|2[0-9]|30))|((0[13578]|1[02])-(0[1-9]|1[0-9]|2[0-9]|3[01])))$/;
        const valid = book.bookPublicationDate.length === 0 
                        ||regex.test(book.bookPublicationDate);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({
            ...result,
            bookPublicationDate : clazz
        });
    }, [book, result]);

    const checkBookPrice = useCallback(()=>{
        const valid = book.bookPrice !== ""
                        && book.bookPrice >=0;
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({
             ...result,
            bookPrice : clazz
            });
    }, [book, result]);

    const checkBookPageCount = useCallback(()=>{
        const valid = book.bookPageCount !==""
                        && book.bookPageCount > 0;
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({
            ...result, 
            bookPageCount : clazz 
        });
    }, [book, result]);

     const checkBookGenre = useCallback(()=>{
        const valid = ['판타지','교양','소설','역사','과학','추리소설','자기계발','수험서']
                        .includes(book.bookGenre);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({
             ...result,
            bookGenre : clazz
            });
    }, [book, result]);

    // -데이터 전송(등록)
    const send = useCallback(()=>{
        axios({
            url:"http://localhost:8080/api/book/insert",
            method:"post",
            data:book,

        })
        .then(response=>{
            //console.log("등록완료");
            // toast.success('등록완료!');
            Swal.fire({
                title: "등록완료!",
                icon: "success"
            });

            //입력값 정리
            setBook({
                bookTitle : "",
                bookAuthor : "",
                bookPublisher : "",
                bookPublicationDate : "",
                bookPrice : "",
                bookPageCount : "",
                bookGenre : ""
            })
            //검사 결과 정리
            setResult({
                bookTitle : "",
                bookAuthor : "",
                bookPublisher : "",
                bookPublicationDate : "",
                bookPrice : "",
                bookPageCount : "",
                bookGenre : ""
            })
        });

    },[book]);

    //memo
    const allValid = useMemo(()=>{
        if(result.bookTitle !== "is-valid") return false;
        if(result.bookAuthor === "is-invalid") return false;
        if(result.bookPublisher === "is-invalid") return false;
        if(result.bookPublicationDate === "is-invalid") return false;
        if(result.bookPrice !== "is-valid") return false;
        if(result.bookPageCount !== "is-valid") return false;
        if(result.bookGenre !== "is-valid") return false;

        return true;
    }, [result]);

    //effect
    useEffect(()=>{
        if(result.bookGenre === null && book.bookGenre === "")return;
        checkBookGenre();
    },[result.bookGenre, book.bookGenre]);

    //view
    return (
    <>
        <Jumbotron title="도서정보등록 화면" content="수업 실습 예제"/>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>도서명</span><FaAsterisk className="text-danger"/>
            </label>
            <div className="col-sm-9">
                <input type="text" name="bookTitle" value={book.bookTitle}
                    onChange={changeStringValue} className={`form-control ${result.bookTitle}`}
                    onBlur={checkBookTitle}
                    placeholder="e.g.,백만장자"/>
                <div className="valid-feedback">도서 설정되었습니다</div>
                <div className="invalid-feedback">필수 입력 항목입니다</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>작가</span>    
            </label>
            <div className="col-sm-9">
                <input type="text" name="bookAuthor" value={book.bookAuthor}
                    onChange={changeStringValue}
                    onBlur={checkBookAuthor}
                    className={`form-control ${result.bookAuthor}`}
                    placeholder="e.g.,홍길동"/>
                <div className="valid-feedback">이름 설정되었습니다</div>
                <div className="invalid-feedback">필수 입력 항목입니다</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>출판사</span>    
            </label>
            <div className="col-sm-9">
                <input type="text" name="bookPublisher" value={book.bookPublisher}
                    onChange={changeStringValue} 
                    onBlur={checkBookPublisher}
                    className={`form-control ${result.bookPublisher}`}
                    placeholder="e.g.,출판사"/>
                <div className="valid-feedback">이름 설정되었습니다.</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>출판일</span><FaAsterisk className="text-danger"/>    
            </label>
            <div className="col-sm-9">
                <input type="date" name="bookPublicationDate" value={book.bookPublicationDate}
                    onChange={changeStringValue} 
                    onBlur={checkBookPublicationDate}
                    className={`form-control ${result.bookPublicationDate}`}/>
                <div className="valid-feedback">날짜 설정되었습니다.</div>
                <div className="invalid-feedback">필수 입력 항목입니다.</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>가격</span><FaAsterisk className="text-danger"/>    
            </label>
            <div className="col-sm-9">
                <input type="text" name="bookPrice" value={book.bookPrice}
                    onChange={changeNumericValue} 
                    onBlur={checkBookPrice}
                    className={`form-control ${result.bookPrice}`}
                    placeholder="0 이상으로만 설정 가능"/>
                <div className="valid-feedback">도서가격이 올바르게 설정되었습니다</div>
                <div className="invalid-feedback">가격은 0 이상으로만 설정 가능합니다</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>페이지 수</span><FaAsterisk className="text-danger"/>    
            </label>
            <div className="col-sm-9">
                <input type="text" name="bookPageCount" value={book.bookPageCount}
                    onChange={changeNumericValue} 
                    onBlur={checkBookPageCount}
                    className={`form-control ${result.bookPageCount}`}
                    placeholder="0 이상으로만 설정 가능"/>
                <div className="valid-feedback">올바르게 설정되었습니다</div>
                <div className="invalid-feedback">페이지 수 0 이상으로만 설정 가능합니다</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>장르</span><FaAsterisk className="text-danger"/>    
            </label>
            <div className="col-sm-9">
                <select name="bookGenre" 
                    className={`form-select ${result.bookGenre}`}
                    value={book.bookGenre} onChange={changeStringValue}>
                    <option value="">선택하세요</option>                        
                    <option>판타지</option>
                    <option>교양</option>
                    <option>소설</option> 
                    <option>역사</option> 
                    <option>과학</option> 
                    <option>추리소설</option> 
                    <option>자기계발</option> 
                    <option>수험서</option> 
                </select>
                <div className="invalid-feedback">필수 선택 항목입니다</div>
            </div>
        </div>

        <div className="row mt-5">
            <div className="col text-end">
                <button type="button" className="btn btn-lg btn-success" 
                    disabled={!allValid} onClick={send}><FaPlus/>
                    <span>신규 등록하기</span>
                </button>
            </div>
        </div>
    </>
    )
}


export default Exam05;