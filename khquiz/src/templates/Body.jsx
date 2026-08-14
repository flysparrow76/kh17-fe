import { Route, Routes } from "react-router-dom";
import PostList from "../components/PostList";
import PostWrite from "../components/PostWrite";
import PostDetail from "../components/PostDetail";
import PostEdit from "../components/PostEdit";

export default function Body(){
    return(
        <Routes>
            <Route path="/" element={<PostList/>}/>
            <Route path="/annonymous/add" element={<PostWrite/>}/>
            <Route path="/annonymous/:postNo" element={<PostDetail/>}/>
            <Route path="/annoymous/:postNo/edit" element={<PostEdit/>}/>
        </Routes>

    )
}