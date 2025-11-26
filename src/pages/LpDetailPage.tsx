import { useActionData, useParams } from "react-router-dom"
import useGetLpDetail from "../hooks/queries/useGetLpDetail.ts";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";
import { useAuth } from "../context/AuthContext";
import { deleteLike, postLike } from "../apis/lp";
import usePostLike from "../hooks/mutation/usePostLike.ts";
import useDeleteLike from "../hooks/mutation/useDeleteLike.ts";

const LpDetailPage = () =>{
  const {lpId} = useParams();
  const{accessToken} = useAuth();
  const{data:lp,
     isPending,
      isError} = useGetLpDetail({lpId:Number(lpId)});


  const{data:me} = useGetMyInfo(accessToken);

  const {mutate:likeMutate} = usePostLike();
  const {mutate:disLikeMutate} = useDeleteLike();

  // const isLiked = lp?.data.likes.map((like)=>like.userId).includes(me?.data.id as number);

  const isLiked = lp?.data.likes.some((like)=>like.userId===me?.data.id);
  const handleLikeLp = () =>{
    likeMutate({lpId:Number(lpId)});
  }

  const handleDisLikeLp = ()=>{
    disLikeMutate({lpId:Number(lpId)});
  }


  if(isPending && isError){
    return<></>;
  };

  return( <div className={"mt-12"}>
    <h1>{lp?.data.title}</h1>
    <img src={lp?.data.thumbnail} alt={lp?.data.title}/>
    <p>{lp?.data.content}</p>

    <button onClick={isLiked? handleDisLikeLp : handleLikeLp}>
      <Heart color={isLiked?"red":"black"} fill={isLiked?"red":"white"}/>
    </button>
  </div>
  );
};

export default LpDetailPage;