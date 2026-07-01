import { useCallback, useState } from "react";
import Jumbotron from "./Jumbotron";


function Exam03() {
    const [country ,setCountry] = useState({
        countryRegion : "",
        countryName : "",
        countryCapital : "",
        countryPopulation : ""
    });
    const changeStringValue = useCallback(e=>{
        const {name, value} = e.target;
        setCountry({
            ...country, 
            [name]:value
        });
    }, [country]);
    const changeNumericValue = useCallback(e=>{
        const {name, value} = e.target;
        const regex = /[^0-9]+/g;
        const replacement = value.replace(regex,"");
        setCountry({
            ...country,
            [name]:(replacement||0)
        });
    },[country]);
    

    return (
    <>
        <Jumbotron title="국가정보 등록" content=""/>

        {/* 대륙 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">대륙명</label>
            <div className="col-sm-9">
                <input type="text" name="countryRegion"
                    value={country.countryRegion} onChange={changeStringValue}                    
                    className="form-control"/>
                    <div className="invalid-feedback">필수 항목입니다.</div>
            </div>
        </div>
        {/* 이름 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">이름</label>
            <div className="col-sm-9">
                <input type="text" name="countryName"
                    value={country.countryName} onChange={changeStringValue}
                    className="form-control"/>
                    <div className="valid-feedback">올바른 형식의 아이디입니다.</div>
                    <div className="invalid-feedback">한글 10글자 이내로만 작성가능합니다.</div>
            </div>
        </div>
        {/* 수도 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">수도</label>
            <div className="col-sm-9">
                <input type="text" name="countryCapital"
                    value={country.countryCapital} onChange={changeStringValue}                   
                    className="form-control"/>
                    <div className="invalid-feedback">미입력이거나 허용 크기를 초과했습니다</div>
            </div>
        </div>
        {/* 인구 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">인구</label>
            <div className="col-sm-9">
                <input type="text" inputMode="numeric" name="countryPopulation"
                    value={country.countryPopulation} onChange={changeNumericValue}                        
                    className="form-control"/>
                    <div className="invalid-feedback">0보다 큰 숫자만 가능합니다</div>
            </div>
        </div>
    </>
    );
}

export default Exam03;