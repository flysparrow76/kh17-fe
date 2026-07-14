import Jumbotron from "@templates/Jumbotron";
import { useCallback, useState } from "react";
import { FaAsterisk, FaPlus } from "react-icons/fa6";
import { Col,Form,Row } from "react-bootstrap";

export default function(){

    //state
    const [account, setAccount] = useState({
        accountId : "",
        accountPassword : "",
        accountPassword2 : "",
        accoutEmail : "",
        accountNickname : "",
        accountBrith: "",
        accountContact: "",
        accountPost: "",
        accountAddress1: "",
        accountAddress2: "",
        accountMessage: ""
    });

    const[result,setResult] = useState({
        accountId : null,
        accountPassword : null,
        accountPassword2 : null,
        accoutEmail : null,
        accountNickname : null,
        accountBrith: null,
        accountContact: null,
        accountPost: null,
        accountAddress1: null,
        accountAddress2: null,
        accountMessage: null
    });

    //callback
    //-입력
    const changeStringValue = useCallback(e=>{
        const {name,value} = e.target;
        setAccount(prev=>({
            ...prev,
            [name]:value
        }));
    },[])

    //-검사
    const checkAccountId = useCallback(e=>{
        const regex = /^[a-z][a-z0-9]{4,19}$/;
        const valid = regex.test(account.accountId);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev=>({...prev,accountId : clazz}));
    },[account]);

    //view
    return(<>
        <Jumbotron title = "가입정보 입력" content="부정확한 정보 입력이 확인된 경우 계정이용이 정지될 수 있습니다."/>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>아이디</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountId"
                    value={account.accountId} onChange={changeStringValue}
                    placeholer="알파벳 소문자 시작,숫자 포함 5~20자 이내"
                    onBlur={checkAccountId} 
                    className={result.accountId}/>
                <div className="valid-feedback">아이디 설정완료</div>
                <div className="invalid-feedback">형식오류 or 사용중</div>
            </Col>
        </Row>
    </>)
}