import { useMutation } from "@tanstack/react-query";
import { deleteLike, postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";


function useDeleteLike(){
    return useMutation({
        mutationFn:deleteLike,
        //onMutate -> API 요청 이전에 호출되는 친구
        // UI에 바로 변경을 보여주기 위해 cache 업데이트
        onMutate:async(lp) => {
            //1. 이 게시글에 관련된 query 취소
            await queryClient.cancelQueries({
                queryKey:[QUERY_KEY.lp,lp.lpId],
            });

            //2. 현재 게시글의 데이터를 cache에서 가져온다.
            const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
                QUERY_KEY.lp, 
                lp.lpId
            ]);

            //게시글 데이터 복사
            const newLpPost = {...previousLpPost};

            //게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치 찾기
            const me = queryClient.getQueryData<ResponseMyInfoDto>([
                QUERY_KEY.myInfo,
            ]);
            const userId = Number(me?.data.id);

            const likedIndex = 
                previousLpPost?.data.likes.findIndex(
                    (like)=>like.userId===userId,
            )??-1;

            if(likedIndex>=0){
                previousLpPost?.data.likes.splice(likedIndex, 1);
            }else{
                const newLike = {userId, lpId:lp.lpId} as Likes;
                previousLpPost?.data.likes.push(newLike);
            };

            console.log(newLpPost);

            //업데이트된 데이터를 cache에 저장
            queryClient.setQueryData([QUERY_KEY.lp, lp.lpId], newLpPost);

            return {previousLpPost, newLpPost};
        },

        onError:(err, newLp, context) => {
            console.log(err, newLp);
            queryClient.setQueryData(
                [QUERY_KEY.lp, newLp.lpId],
                context?.previousLpPost?.data.id,
            );
        },

        onSettled:async(data,error,variables, context) => {
            await queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lp, variables.lpId],
            });
        },
    });
}

export default useDeleteLike;