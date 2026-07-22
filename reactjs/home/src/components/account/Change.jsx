// import { useState } from "react";
// import { Col, Row } from "react-bootstrap";
// import { FaAsterisk } from "react-icons/fa6";
// import { Form, useParams } from "react-router-dom";


// export default function password(){
//     const [account , setAccount] = useState({

//     });    

//     return(<>
//         <Row className="mt-4">
//             <Form.Label column sm ={3}>
//                 <span>아이디</span>
//                 <FaAsterisk className="text-danger"/>
//             </Form.Label>
//             <Col sm={9}>
//                 <Form.Control type="text" name="accountId" value={account.accountId}
//                         onChange={changeStringValue} 
//                         onBlur={checkCountryName}
//                         className={result.countryName}/>
//                 <div className="valid-feedback">국가명이 설정되었습니다</div>
//                 <div className="invalid-feedback">국가명은 한글로만 작성 가능합니다</div>
//             </Col>
//         </Row>

//         <Row className="mt-4">
//             <Col sm={3} className="fw-bold text-info">닉네임</Col>
//         </Row>

//         <Row className="mt-4">
//             <Col sm={3} className="fw-bold text-info">이메일</Col>
//         </Row>

//         <Row className="mt-4">
//             <Col sm={3} className="fw-bold text-info">생년월일</Col>
//         </Row>

//         <Row className="mt-4">
//             <Col sm={3} className="fw-bold text-info">연락처</Col>
//         </Row>

//         <Row className="mt-4">
//             <Col sm={3} className="fw-bold text-info">주소</Col>
//         </Row>

//         <Row className="mt-4">
//             <Col sm={3} className="fw-bold text-info">등급</Col>
//         </Row>

//         <Row className="mt-4">
//             <Col sm={3} className="fw-bold text-info">포인트</Col>
//         </Row>

//         <Row className="mt-4">
//             <Col sm={3} className="fw-bold text-info">가입일</Col>
//         </Row>

//         <Row className="mt-4">
//             <Col sm={3} className="fw-bold text-info">최종로그인</Col>
//         </Row>

//         <Row className="mt-4">
//             <Col sm={3} className="fw-bold text-info">최종변경일</Col>
//         </Row>

//         <Row className="mt-4">
//             <Col sm={3} className="fw-bold text-info">상태메세지</Col>
//         </Row>

        
//     </>)
// }