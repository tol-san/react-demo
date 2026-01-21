import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Posts {
    id: number;
    title: string;
    userId: number;
}

interface PageQuery {
    page: number;
    pageSize: number;
}

const usePosts = ( pageQuery: PageQuery) => useQuery<Posts[], Error>({
    queryKey: ['page', pageQuery],
    queryFn: () => axios.get<Posts[]>('https://jsonplaceholder.typicode.com/posts', {
        params: {
            _start: (pageQuery.page - 1)  * pageQuery.pageSize,
            _limit: pageQuery.pageSize
        }
    }).then(res => res.data),
    staleTime: 1 * 60 * 1000,
    placeholderData: keepPreviousData,
})


export default usePosts;