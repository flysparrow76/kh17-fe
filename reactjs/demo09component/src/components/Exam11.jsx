import Jumbotron from "./Jumbotron";

function Exam11(){
    return (<>
        <Jumbotron title="강의 더보기 방식의 목록"/>
        <div className="row mt-5">
            <div className="col">
                <div className="text-nowrap table-responsive">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>분류</th>
                                <th>시간</th>
                                <th>가격</th>
                                <th>형태</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>)
}

export default Exam11;