import { useCallback, useState } from "react";
import Jumbotron from "./Jumbotron";


function Exam03() {
    const [country ,setCountry] = useState({
        countryRegion = "",
        countryName = "",
        countryCapital = "",
        countryPopulation = ""
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
    });

    return (
    <>
        <Jumbotron title="국가정보 등록" content=""/>

        {/* 대륙 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">대륙명</label>
            <div className="col-sm-9">
                <input type="text" name="countryRegion"
value={country.countryRegion} onChange={}                    
                    className="form-control"/>
            </div>
        </div>
        {/* 이름 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">이름</label>
            <div className="col-sm-9">
                <input type="text" name="countryName"
value={country.countryName} onChange={}
                    className="form-control"/>
            </div>
        </div>
        {/* 수도 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">수도</label>
            <div className="col-sm-9">
                <input type="text" name="countryCapital"
value={country.countryCapital} onChange={}                   
                    className="form-control"/>
            </div>
        </div>
        {/* 인구 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">인구</label>
            <div className="col-sm-9">
                <input type="text" inputMode="numeric" name="countryPopulation"
value={country.countryPopulation} onChange={}                        
                    className="form-control"/>
            </div>
        </div>
    </>
    );
}

export default Exam03;