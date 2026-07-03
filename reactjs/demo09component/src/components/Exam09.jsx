import { useEffect, useState } from "react";
import Jumbotron from "./Jumbotron";
import axios from "axios";
import Swal from "sweetalert2";


function Exam09(){
    //state
    const [bookList, setBookList] = useState([]);//초기값이 중요
    //effect
    useEffect (()=>{
        axios({
            url : "http://localhost:8080/api/book/list",
            method : "get"
        })
        .then(response =>{
            setBookList(response.data);
        });
    },[])

    // const deleteBook = useCallback((target)=>{

    //     Swal.fire({
    //         title:"삭제하시겠습니까?",
    //         text:"삭제 후에는 복구 불가능합니다.",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "삭제",
    //         cancelButtonText: "취소"
    //     })
    //     .then(result=>{
    //         if(result.isConfirmed){
    //             setLectureList(
    //                 lectureList.filter((lecture)=> lecture.lectureNo !== target.lectureNo)
    //             );
    //             toast.success("삭제가 완료되었습니다.")
    //         }
    //     })
    // },[lectureList])
    return(<>
        <Jumbotron title="도서 목록"/>    
        
        <div className="row mt-4">
            <div className="col">
                <ul className="list-group">
                    {bookList.map(book=>(
                    <li className="list-group-item" key={book.bookId}>
                        <p className="text-muted">
                            <span>{book.bookGenre}</span>
                        </p>
                        <h3>{book.bookTitle}</h3>
                        {/* ??는 앞 항목이 null,underfined 등 확실하게 없는경우 다음을 실행 */}
                        {/* ||는 앞 항목이 null,underfined,false,0,""부정적인 경우 다음을 실행 */}
                        
                        <div>지은이 : {book.bookAuthor ?? "없음"}</div>
                        <div>출판사 : {book.bookPublisher ?? "없음"}</div>

                        <div className="my-4">
                            책에 대한 설명...
                        </div>

                        <div className="my-2">
                            {book.bookPrice.toLocaleString()}원
                        </div>
                        <div className="my-2">
                            {book.bookPageCount.toLocaleString()}p
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    </>)
}

export default Exam09;
