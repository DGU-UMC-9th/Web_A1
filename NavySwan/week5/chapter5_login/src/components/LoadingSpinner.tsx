export const LoadingSpinner = () => {
    return (
        <div className="w-12 h-12 animate-spin rounded-full border-4 border-t-transparent border-[#b2dab1]" role="status">
            <span className="sr-only">로딩 중...</span>
        </div>
    );
}