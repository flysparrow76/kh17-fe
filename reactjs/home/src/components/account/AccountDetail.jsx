import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { apiClient} from "@utils/reaxios"
import { useParams } from "react-router-dom";
import { FaCheck, FaSquarePen, FaXmark } from "react-icons/fa6";

export default function AccountDetail(){
    const { accountId } = useParams();

    const [account, setAccount] = useState(null);
    useEffect(()=>{
        loadData();
    },[]);
    
    const loadData = useCallback(async ()=>{
        const {data} = await apiClient.get(`/account/${accountId}`);
        setAccount(data);
    },[accountId])
    
    const [backup, setBackup] = useState(null);
    const [edit, setEditMode] = useState({
        accountBlock:false
    });
    //입력 함수
    const changeStringValue = useCallback(e=>{
        const {name, value} = e.target;
        setAccount({
            ...account, 
                [name] : value
            });
    }, [account]);

    const updateAccount = useCallback(async (field)=>{
        const response = await apiClient.patch(
            `/account/block/${accountId}`,
            {[field] : account[field]}
        )
    });

    const cancelUpdate = useCallback((field)=>{
            setAccount({...account, [field]: backup[field]});
            setEditMode({...editMode, [field] : false});
    
            toast.error("정보 변경이 취소되었습니다");
        }, [country, backup, editMode]);

    return(<>
        <Jumbotron title={`${account?.accountId}님의 개인 정보`}/>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">아이디</Col>
            <Col sm={9} className="text-secondary">{account?.accountId}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">닉네임</Col>
            <Col sm={9} className="text-secondary">{account?.accountNickname}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">이메일</Col>
            <Col sm={9} className="text-secondary">{account?.accountEmail}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">생년월일</Col>
            <Col sm={9} className="text-secondary">{account?.accountBirth}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">연락처</Col>
            <Col sm={9} className="text-secondary">{account?.accountContact}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">주소</Col>
            <Col sm={9} className="text-secondary"></Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">등급</Col>
            <Col sm={9} className="text-secondary">{account?.accountLevel}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">포인트</Col>
            <Col sm={9} className="text-secondary">
                {account?.accountPoint.toLocaleString()} point
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">가입일</Col>
            <Col sm={9} className="text-secondary">{account?.accountJoin}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종로그인</Col>
            <Col sm={9} className="text-secondary">{account?.accountLogin}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종변경일</Col>
            <Col sm={9} className="text-secondary">{account?.accountChange}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">상태메세지</Col>
            <Col sm={9} className="text-secondary">{account?.accountMessage}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">차단상태</Col>
            <Col sm={9} className="text-secondary">
                {editMode.accountBlock !== true ? (<>
                <span>{account.accountBlock}</span>
                    <FaSquarePen className="text-warning ms-2" 
                    onClick={e=>startUpdate("accountBlock")}/>
                </>) : (<>
                    <Form.Select className="w-auto d-inline-block" name="accountBlock"
                    value={account.accountBlock} onChange={changeStringValue}>
                        <option>Y</option>
                        <option>N</option>
                    </Form.Select>
                    <FaCheck className="text-success ms-2" onClick={e=>updateAccount("accountBlock")}/>
                    <FaXmark className="text-danger ms-2" onClick={e=>cancelUpdate("accountBlock")}/>
                </>)}
                {account?.accountBlock}
            </Col>
        </Row>

    </>)
}