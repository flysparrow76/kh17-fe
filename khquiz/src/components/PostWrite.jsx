import axios from "axios";
import { useCallback, useState } from "react"
import { Col, Row, Form ,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function PostWrite(){
    //state
    const [ post, setPost] = useState({
        postTitle: "",
        postContent : "",
        postPassword : ""
    });
    const [ result, setResult] = useState({
        postTitle: "",
        postContent : "",
        postPassword : ""
    })
    const navigate = useNavigate();

    const changeStringValue = useCallback((e)=>{
        const { name , value } = e.target;

        setPost({
            ...post,//나머지는 그대로 유지하세요
            [name] : value
        });
    }, [post]);

    //데이터 전송 함수
    const send = useCallback(async ()=>{
        const {data} = await axios.post("http://localhost:8080/api/post/", post);
        toast.success("게시글 등록이 완료되었습니다");
        navigate("/");
    }, [post]);

    return(<>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>제목</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="postTitle" value={post.postTitle}
                        onChange={changeStringValue} 
                        className={result.postTitle}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>내용</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="postContent" value={post.postContent}
                        onChange={changeStringValue} 
                        className={result.postContent}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>비밀번호</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="postPassword" value={post.postPassword}
                        onChange={changeStringValue} 
                        className={result.postPassword}/>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col>
                <Button type="button" variant="success" className="w-100" 
                         onClick={send}>
                    <span>등록하기</span>
                </Button>
            </Col>
        </Row>
    </>)
}