import axios from "axios";
import { unstable_noStore as noStore } from 'next/cache';

export async function getStateCalls() {
    noStore();
    try {
        const fetchState = await axios.get('http://localhost:3000/api/getadminstates', { cache: 'no-store' });
        return fetchState.data
    } catch (error) {
        console.log(error);
    }

}
