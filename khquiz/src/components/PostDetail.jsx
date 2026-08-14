import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Badge, Button, Col, Row , Form } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import { Link } from "react-router-dom";
dayjs.locale("ko");//한국어로 설정

export default function PostDetail(){

    const { postNo } =useParams();
    
    if(/^[0-9]+$/.test(postNo) === false) {//숫자가 아니면
        return <Navigate to="/" replace/>;
    }

    const navigate = useNavigate();

    const [ post,setPost ] = useState(null);
    useEffect(()=>{
        loadData();
    },[]);

    const loadData = useCallback(async ()=>{
        const response = await axios.get(`http://localhost:8080/api/post/${postNo}`)
        setPost(response.data);
        // console.log(response.data);
    }, []);

    const deletePost = useCallback(async ()=>{
        // const choice = window.confirm("정말 삭제하시겠습니까?\n삭제 후에는 복구가 안됩니다");
        // if(choice === false) return;
        const result = await Swal.fire({
            title:"정말 삭제하시겠습니까?",
            text:"삭제한 데이터는 복구하실 수 없습니다",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"삭제",
            cancelButtonText:"취소",
            confirmButtonColor:"#d63031",
            cancelButtonColor:"#b2bec3"
        });

        if(result.isConfirmed === false) return;

        const response = await axios.delete(`http://localhost:8080/api/post/${postNo}`);
        toast.error("게시글 삭제가 완료되었습니다");
        navigate("/");

    }, [postNo]);


    return(<>
        {post === null ? (<> 
            <h1>로딩중입니다...</h1>
        </>):(<>
            <Row className="mt-4 fs-4">
                <Col sm={3} className="text-info fw-bold">
                    번호
                </Col>
                <Col sm={9}>
                    {post.postNo}
                </Col>
            </Row>

            <Row className="mt-4 fs-4">
                <Col sm={3} className="text-info fw-bold">
                    제목
                </Col>
                <Col sm={9}>
                    {post.postTitle}
                </Col>
            </Row>

            <Row className="mt-4 fs-4">
                <Col sm={3} className="text-info fw-bold">
                    본문
                </Col>
                <Col sm={9}>
                    {post.postContent}
                </Col>
            </Row>

             <Row className="mt-4 fs-4">
                <Col sm={3} className="text-info fw-bold">
                    작성일
                </Col>
                <Col sm={9}>
                    {dayjs(post.postCtime).format("A h:mm:ss")}
                </Col>
            </Row>

            <Row className="mt-5">
                <Col className="text-end">
                    <Button className="ms-2" variant="danger" onClick={deletePost}>삭제하기</Button>
                    <Button className="ms-2" variant="warning" as={Link} to={`/annoymous/${post.postNo}/edit`}>수정하기</Button>
                    <Button className="ms-2" variant="secondary" as={Link} to={"/"}>목록으로</Button>
                </Col>
            </Row>
        </>)}
    </>)
}