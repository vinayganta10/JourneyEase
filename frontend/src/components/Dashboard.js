import React from "react";
import axios from "axios";


function Dashboard(){
    async function handlePost(e){
        await axios.get("http://localhost:4000/api/flights").then((res)=>{console.log(res)}).catch((err)=>console.log(err));
    }
    return(
        <>
            <button onClick={()=>handlePost()}>hit me</button>
        </>
    );
}

export default Dashboard;