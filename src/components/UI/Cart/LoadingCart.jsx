const LoadingCart = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Đang tải giỏ hàng của bạn, vui lòng đợi...
        </p>
      </div>
    </main>
  );
};

export default LoadingCart;
