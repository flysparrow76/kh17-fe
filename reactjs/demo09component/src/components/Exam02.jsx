import { useCallback, useMemo, useState } from "react";
import Jumbotron from "./Jumbotron";

function Exam02() {
    //state
    const [student, setStudent] = useState({
        studentName: "",
        studentKorean: "",
        studentEnglish: "",
        studentMath: "",
    });

    const changeStudent = useCallback(e => {

        const { name, value } = e.target;

        setStudent({
            ...student,//항목 유지
            [name]: value //입력값만 변경
        });
    }, [student]);

    //memo
    const total = useMemo(()=>{
        // return student.studentKorean + student.studentEnglish + student.studentMath;
        return parseInt(student.studentKorean) 
            + parseInt(student.studentEnglish) 
            + parseInt(student.studentMath);
    },[student]);
    const average = useMemo(()=>{
        return total/3;
    },[student])

  return (

        <>
          {/* 내가 만든 점보트론을 불러와서 적용 */}
            <Jumbotron title="학생 성적 계산기" content="시험 결과를 입력하시면 평균과 총점을 계산해드립니다." />

            {/* 이름 입력화면 */}
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">이름</label>
                <div className="col-sm-9">
                    <input type="text" name="studentName" className="form-control"
                      value={student.studentName}
                      onChange={changeStudent}/>
                    <div className="valid-feedback">멋진 아이디입니다!</div>
                    <div className="invalid-feedback">사용중이거나 사용할 수 없는 형식입니다</div>
                </div>
            </div>

            {/* 국어점수 입력화면 */}
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">국어점수</label>
                <div className="col-sm-9">
                    <input type="text" name="studentKorean" className="form-control"
                      value={student.studentKorean}
                      onChange={changeStudent}/>
                    <div className="valid-feedback">멋진 아이디입니다!</div>
                    <div className="invalid-feedback">사용중이거나 사용할 수 없는 형식입니다</div>
                </div>
            </div>

            {/* 영어점수 입력화면 */}
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">영어점수</label>
                <div className="col-sm-9">
                    <input type="text" name="studentEnglish" className="form-control"
                      value={student.studentEnglish}
                      onChange={changeStudent}/>
                    <div className="valid-feedback">멋진 아이디입니다!</div>
                    <div className="invalid-feedback">사용중이거나 사용할 수 없는 형식입니다</div>
                </div>
            </div>

            {/* 수학점수 입력화면 */}
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">수학점수</label>
                <div className="col-sm-9">
                    <input type="text" name="studentMath" className="form-control"
                      value={student.studentMath}
                      onChange={changeStudent}/>
                    <div className="valid-feedback">멋진 아이디입니다!</div>
                    <div className="invalid-feedback">사용중이거나 사용할 수 없는 형식입니다</div>
                </div>
            </div>       

            {/* 수학점수 입력화면 */}
            <div className="row mt-4">
                <div className="col">
                    <div className="shadow p-4 rounded bordered">
                        {student.studentName} 님의 성적은 다음과 같습니다. <br/>
                        총점은 {total}점이고, 평균은 {average.toFixed(2)}점입니다.
                    </div>
                </div>
            </div>
        </>

  )
    
}

export default Exam02;