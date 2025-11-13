import { QueryClient, useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";

function usePostLike(){
    return useMutation({
        mutationFn:postLike,
        //data -> API 성공 응답 데이터
        // variables -> mutate에 전달한 값
        //context -> onmutate에서 반환한 값
        onSuccess:(data, variables, context)=>{
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lp, data.data.lpId],
                exact: true,
            },
        );
        },
        //error -> 요청 실패 시 발생한 에러
        //variables -> mutate에 전달한 값
        //context -> onmutate에서 반환한 값
        onError:(error, variables, context) =>{},
        //요청 직전에 실행
        //optimistic update를 구현할 때 유용
        onMutate:(variavles)=>{
            return 'hello';
        },
        //요청이 끝난 후 항상 실행
        onSettled:(data, error, variables)=>{},
    });
}

export default usePostLike;