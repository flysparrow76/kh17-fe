import { useParams } from "react-router-dom"

export default function PostEdit(){
    const { postNo } = useParams();

    return(<>
        <h1>테스트</h1>
    </>)
}