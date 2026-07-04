import { useCallback, useEffect, useState } from "react";
import Jumbotron from "./Jumbotron";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa6";
import { ClockLoader } from "react-spinners";

function Exam11(){

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
            console.log(response.data);
            setLectureList([...lectureList, ...response.data.list])
            setLast(response.data.last);
        })
        .finally(()=>setLoading(false));
    },[lectureList,size])

    return (<>
        <Jumbotron title="강의 더보기 방식의 목록"/>
        <div className="row mt-5">
            <div className="col">
                <div className="text-nowrap table-responsive">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>분류</th>
                                <th>시간</th>
                                <th>가격</th>
                                <th>형태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lectureList.map(lecture=>(
                                <tr key={lecture.lectureNo}>
                                    <td>{lecture.lectureNo}</td>
                                    <td>{lecture.lectureTitle}</td>
                                    <td>{lecture.lectureCategory}</td>
                                    <td>{lecture.lectureDuration}</td>
                                    <td className="text-end">{lecture.lecturePrice.toLocaleString()}</td>
                                    <td>{lecture.lectureType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {last === false && (
            <div className="row mt-2">
                <div className="col">
                    <button type="button" onClick={loadMoreList}
                            className="btn btn-success btn-lg w-100">
                        <FaChevronDown/>
                        <span className="mx-2">더보기</span>
                        <FaChevronDown/>    
                    </button>
                </div>
            </div>
        )}
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

export default Exam11;