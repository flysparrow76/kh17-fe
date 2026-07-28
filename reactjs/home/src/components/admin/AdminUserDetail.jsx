import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Col, Form, Placeholder, Row } from "react-bootstrap";
import { apiClient} from "@utils/reaxios"
import { useParams } from "react-router-dom";
import { FaCheck, FaSquarePen, FaXmark } from "react-icons/fa6";
import LoadingText from "@templates/loadingText";

export default function AccountDetail(){
    //딱 한번만 최초 시점에 그 누구보다 빠르게 불러오는 처리 담당(변경불가)
    const { accountId } = useParams();

    const [account, setAccount] = useState(null);
    
    useEffect(()=>{
        loadData();
    },[]);
    
    const loadData = useCallback(async ()=>{
        const {data} = await apiClient.get(`/account/${accountId}`);
        setAccount(data);
    },[])

    //주소를 완성해서 반환하는 메모
        const unionAddress = useMemo(()=>{
            if(account === null) return undefined;
            if(account.accountPost === null) return "";
            if(account.accountAddress1 === null) return "";
            if(account.accountAddress2 === null) return "";
            return `[${account.accountPost}] ${account.accountAddress1} ${account.accountAddress2}`;
        }, [account]);

    //로딩중일 경우의 화면을 따로 보여줄 때
    // if(account === null){
    //     return(<><h1>로딩중인 화면</h1></>)
    // }
    
    // const [backup, setBackup] = useState(null);
    // const [edit, setEditMode] = useState({
    //     accountBlock:false
    // });
    // //입력 함수
    // const changeStringValue = useCallback(e=>{
    //     const {name, value} = e.target;
    //     setAccount({
    //         ...account, 
    //             [name] : value
    //         });
    // }, [account]);

    // const updateAccount = useCallback(async (field)=>{
    //     const response = await apiClient.patch(
    //         `/account/block/${accountId}`,
    //         {[field] : account[field]}
    //     )
    // });

    // const cancelUpdate = useCallback((field)=>{
    //         setAccount({...account, [field]: backup[field]});
    //         setEditMode({...editMode, [field] : false});
    
    //         toast.error("정보 변경이 취소되었습니다");
    //     }, [account, backup, editMode]);

    return(<>
        <Jumbotron title={`${account?.accountId}님의 개인 정보`}/>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">아이디</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountId} width={100}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">닉네임</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountNickname} width={120}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">이메일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountEmail} width={200}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">생년월일</Col>
            <Col sm={9} className="text-secondary">
               <LoadingText value={account?.accountBirth} width={100}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">연락처</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountContact} width={120}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">주소</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={unionAddress} width={"100%"}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">등급</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountLevel} width={60}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">포인트</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountPoint} width={50}/>
                <span className="ms-2">point</span>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">가입일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountJoin} width={240}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종로그인</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountLogin} width={240}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종변경일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountChange} width={240}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">상태메세지</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountMessage} width="100%" line={3}/>
            </Col>
        </Row>

        {/* <Row className="mt-4">
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
        </Row> */}

    </>)
}