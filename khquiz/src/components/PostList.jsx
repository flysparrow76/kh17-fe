import { useCallback, useEffect, useState } from "react"
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import axios from "axios";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import { Link } from "react-router-dom";
dayjs.locale("ko");//한국어로 설정

export default function PostList() {

    //state
    const [postList, setPostList] = useState([]);

    useEffect(()=>{
        loadData();
    },[])

    const loadData = useCallback(async ()=>{
        const { data } = await axios.get("http://localhost:8080/api/post/")
    
        setPostList(data);
    })
    return (<>
        
        <h1>게시글 목록</h1>
        <Row>
            <Col>
                <Button as={Link} to="/annonymous/add" variant="success">
                    <span className="ms-2">신규 등록</span>
                </Button>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col>
                <Table responsive striped hover className="text-nowrap">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th className="text-end">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postList.map(post=>(
                            <tr key={post.postNo}>
                                <td>
                                    <Link to ={`/annonymous/${post.postNo}`}>
                                        {post.postNo}
                                    </Link>
                                </td>
                                <td>{post.postTitle}</td>
                                <td>{dayjs(post.postCtime).format("A h:mm:ss")}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>

    </>)
}