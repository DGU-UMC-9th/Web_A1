import CommentSkeleton from "./CommentSkeleton";

interface Props {
  count?: number;
}

const CommentSkeletonList = ({ count = 5 }: Props) => {
  return (
    <div className="flex flex-col gap-3 mt-2">
      {Array.from({ length: count }).map((_, idx) => (
        <CommentSkeleton key={idx} />
      ))}
    </div>
  );
};

export default CommentSkeletonList;