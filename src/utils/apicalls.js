
import axios from "axios";

export async function stateDate(){
    try {
        const fetchState = await axios.get('http://localhost:3000/api/getadminstates');
        console.log("server started",fetchState);

        // Parse the response body as JSON
        // const data = await fetchState.json();
        
        // Log the data received from the server
        // console.log("Data received:", data);
        return fetchState;
    } catch (error) {
        console.error("Error occurred while fetching state:", error);
        throw error;
    }
}
