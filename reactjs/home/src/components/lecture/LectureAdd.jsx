import { useCallback, useEffect, useMemo, useState } from "react";
import Jumbotron from "../../templates/Jumbotron";
import { Button, Col, Row, Form } from "react-bootstrap";
import { FaAsterisk, FaPlus } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export default function LectureAdd(){
    //state
    const [lecture, setLecture] = useState({
        lectureTitle: "",
        lectureCategory: "",
        lectureDuration: "",//숫자이지만 미입력상태로 설정
        lecturePrice: "",//숫자이지만 미입력상태로 설정
        lectureType: ""
    });
    const [result, setResult] = useState({
        lectureTitle: "",
        lectureCategory: "",
        lectureDuration: "",
        lecturePrice: "",
        lectureType: ""
    });

    const navigate = useNavigate();
    //callback
    //- 입력함수들
    const changeStringValue = useCallback(e=>{
        const { name, value } = e.target;
        setLecture({
             ...lecture,
              [name] : value 
        });
    }, [lecture]);
    const changeNumericValue = useCallback(e=>{
        const { name, value } = e.target;
        const regex = /[^0-9]/g;
        const replacement = value.replace(regex, "");
        if(replacement.length === 0) {
            setLecture({
                 ...lecture,
                [name] : replacement
             })
        }
        else {
            setLecture({
                 ...lecture, 
                 [name] : parseInt(replacement) 
            });
        }
    }, [lecture]);

    //- 검사함수들
    const checkLectureTitle = useCallback(()=>{
        const valid = lecture.lectureTitle.length > 0;
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({
             ...result,
            lectureTitle : clazz 
        });
    }, [lecture, result]);
    const checkLectureCategory = useCallback(()=>{
        //const regex = /^(이론|실습|시험)$/;
        //const valid = regex.test(lecture.lectureCategory);
        const valid = ['이론','실습','시험'].includes(lecture.lectureCategory);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({
            ...result,
            lectureCategory : clazz 
        });
    }, [lecture, result]);
    const checkLectureDuration = useCallback(()=>{
        const valid = lecture.lectureDuration !== "" 
                        && lecture.lectureDuration % 30 === 0
                        && lecture.lectureDuration > 0
                        && lecture.lectureDuration <= 300;
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({
            ...result, 
            lectureDuration : clazz 
        });
    }, [lecture, result]);
    const checkLecturePrice = useCallback(()=>{
        const valid = lecture.lecturePrice !== "" 
                        && lecture.lecturePrice >= 0;
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({
            ...result,
            lecturePrice : clazz
        });
    }, [lecture, result]);
    const checkLectureType = useCallback(()=>{
        //const regex = /^(오프라인|온라인|혼합)$/;
        //const valid = regex.test(lecture.lectureType);
        const valid = ['오프라인','온라인','혼합'].includes(lecture.lectureType);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({
             ...result,
            lectureType : clazz
            });
    }, [lecture, result]);

    //memo
    const valid = useMemo(()=>{
        if(result.lectureTitle !== "is-valid") return false;
        if(result.lectureCategory !== "is-valid") return false;
        if(result.lectureDuration !== "is-valid") return false;
        if(result.lecturePrice !== "is-valid") return false;
        if(result.lectureType !== "is-valid") return false;

        return true;
    }, [result]);

    //effect
    useEffect(()=>{
        if(lecture.lectureCategory === "" && result.lectureCategory === "")
            return;
        checkLectureCategory();
    }, [lecture.lectureCategory, result.lectureCategory]);
    useEffect(()=>{
        if(lecture.lectureType === "" && result.lectureType === "") return;
        checkLectureType();        
    }, [lecture.lectureType, result.lectureType]);

    const send = useCallback(()=> {
        axios({
            url : "http://localhost:8080/api/lecture/insert",
            method: "post",
            data: lecture
        })
        .then(response=>{
            toast.success("강의가 등록이 완료되었습니다.");
            navigate("/lecture/list");
        })
    },[lecture]);

    return (
    <>
        <Jumbotron title="강좌 정보 등록 화면" content="수업 실습 예제"/>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>강의명</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="lectureTitle" value={lecture.lectureTitle}
                    onChange={changeStringValue} className={result.lectureTitle}
                    onBlur={checkLectureTitle}
                    placeholder="e.g.,정보처리 산업기사 필기"/>
                <div className="valid-feedback">과정 이름이 설정되었습니다</div>
                <div className="invalid-feedback">필수 입력 항목입니다</div>
            </Col>

        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>분류</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Select name="lectureCategory" className={result.lectureCategory}
                    value={lecture.lectureCategory} onChange={changeStringValue}>
                    <option value="">선택하세요</option>                        
                    <option>이론</option>
                    <option>실습</option>
                    <option>시험</option>
                </Form.Select>
                <div className="invalid-feedback">필수 선택 항목입니다</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>강의시간</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="lectureDuration" value={lecture.lectureDuration}
                    onChange={changeNumericValue}
                    onBlur={checkLectureDuration}
                    className={result.lectureDuration}
                    placeholder="30시간 단위로만 설정 가능"/>
                <div className="valid-feedback">강의시간이 올바르게 설정되었습니다</div>
                <div className="invalid-feedback">강의시간은 30시간 단위로만 설정 가능합니다</div>
            </Col>


        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>수강료</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="lecturePrice" value={lecture.lecturePrice}
                    onChange={changeNumericValue} 
                    onBlur={checkLecturePrice}
                    className={result.lecturePrice}
                    placeholder="0 이상으로만 설정 가능"/>
                <div className="valid-feedback">수강료가 올바르게 설정되었습니다</div>
                <div className="invalid-feedback">수강료는 0 이상으로만 설정 가능합니다</div>
            </Col>


        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>수업방식</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm ={9}>
                <Form.Select name="lectureType" 
                    className={`form-select ${result.lectureType}`}
                    value={lecture.lectureType} onChange={changeStringValue}>
                    <option value="">선택하세요</option>                        
                    <option>온라인</option>
                    <option>오프라인</option>
                    <option>혼합</option> 
                </Form.Select>
                <div className="invalid-feedback">필수 선택 항목입니다</div>
            </Col>
        </Row>


        <Row className="mt-5">
            <Col>
                <Button type="button" variant="success" className="w-100" 
                    disabled={valid === false} onClick={send}>
                    <FaPlus className="me-2"/>
                    <span>등록하기</span>
                </Button>
            </Col>
        </Row>

    </>
    )
}