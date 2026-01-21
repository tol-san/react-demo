import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Posts {
    id: number;
    title: string;
    userId: number;
}

interface PostQuery {
    pageSize: number;
}

const usePosts = ( query: PostQuery) => useInfiniteQuery<Posts[], Error>({
    queryKey: ['page', query],
    queryFn: ({pageParam}) => axios.get<Posts[]>('https://jsonplaceholder.typicode.com/posts', {
        params: {
            _start: ((pageParam as number) - 1)  * query.pageSize,
            _limit: query.pageSize
        }
    }).then(res => res.data),
    staleTime: 1 * 60 * 1000,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
        return lastPage.length > 0 ? allPage.length + 1 : undefined
    }
})


export default usePosts;