import axios from "axios";

export async function getStateCalls(){
    const fetchState = await axios.get('http://localhost:3000/api/getadminstates')
    console.log("server startred")
    return fetchState;
}