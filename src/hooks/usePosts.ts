import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Posts {
    id: number;
    title: string;
    userId: number;
}

const usePosts = ( userId: number | undefined) => useQuery<Posts[], Error>({
    queryKey: userId ?  ['users', userId, 'posts'] : ['posts'],
    queryFn: () => axios.get<Posts[]>('https://jsonplaceholder.typicode.com/posts', {
        params: {
            userId 
        }
    }).then(res => res.data)
})


export default usePosts;