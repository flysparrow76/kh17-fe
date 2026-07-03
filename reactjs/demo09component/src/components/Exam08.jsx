import { useCallback, useEffect, useState } from "react";
import Jumbotron from "./Jumbotron";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";


function Exam08(){
    //state
    const [lectureList, setLectureList] = useState([]);//초기값이 중요
    //effect
    useEffect (()=>{
        axios({
            url : "http://localhost:8080/api/lecture/list",
            method : "get"
        })
        .then(response =>{
            console.log("대기",response)
            setLectureList(response.data);
        });
    },[])

    const deleteLecture = useCallback((target)=>{

        Swal.fire({
            title:"삭제하시겠습니까?",
            text:"삭제 후에는 복구 불가능합니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소"
        })
        .then(result=>{
            if(result.isConfirmed){
                setLectureList(
                    lectureList.filter((lecture)=> lecture.lectureNo !== target.lectureNo)
                );
                toast.success("삭제가 완료되었습니다.")
            }
        })
    },[lectureList])

    return(<>
    <Jumbotron title="강의 목록"/>
      <div className="row mt-4">
        <div className="col">
            <div className="text-nowrap table-responsive">
                <table className="table table-hover table-striped">
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
                        {lectureList.map((lecture)=>(
                            <tr key={lecture.lectureNo}>
                                <td>{lecture.lectureTitle}</td>
                                <td>{lecture.lectureCategory}</td>
                                <td className="text-end">{lecture.lectureDuration.toLocaleString}</td>
                                <td className="text-end">{lecture.lecturePrice.toLocaleString}</td>
                                <td>{lecture.lectureType}</td>                                
                                <td><FaTrash className="text-danger" 
                                    onClick={e=>deleteLecture(lecture)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    </div>
    </>)
}

export default Exam08;
