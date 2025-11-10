const CommentSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-2 bg-gray-800 p-3 rounded-lg">
      {/* 작성자 영역 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-600" />
          <div className="h-3 w-24 bg-gray-600 rounded" />
        </div>
        <div className="h-2 w-16 bg-gray-700 rounded" />
      </div>

      {/* 댓글 내용 */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="h-3 w-full bg-gray-600 rounded" />
        <div className="h-3 w-4/5 bg-gray-600 rounded" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
