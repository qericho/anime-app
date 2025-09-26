const ErrorPage = ({ error }) => {
  return (
    <div className="fixed top-0 left-0 w-full flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-5xl font-bold mb-4">Error</h1>
      <p className="text-lg mb-6">{error}.</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-colors"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorPage;
