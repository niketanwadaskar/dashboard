export default function ErrorUI({ error }: { error: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl text-red-600 font-bold mb-2">Error</h2>
      <p className="text-gray-700 mb-4">{error}</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
}
