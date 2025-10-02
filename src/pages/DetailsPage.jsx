import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Fade from "../components/ui/spinner/Fade";

function DetailsPage() {
  const { id } = useParams();
  const {
    data: anime,
    loading,
    error,
  } = useFetch(`https://api.jikan.moe/v4/anime/${id}`);
  const {
    data: recommendations,
    loading: recLoading,
    error: recError,
  } = useFetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);

  const [showTrailer, setShowTrailer] = useState(false);

  if (loading) return <Fade />;

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        {error.message || "Something went wrong!"}
      </div>
    );
  }

  if (!anime?.data) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        Anime not found!
      </div>
    );
  }

  const details = anime.data;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <div className="relative h-64 w-full bg-gradient-to-r from-gray-800 to-gray-600">
        <img
          src={
            details.trailer?.images?.maximum_image_url ||
            details.images?.jpg?.large_image_url
          }
          alt={details.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            {details.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Poster */}
          <div className="flex justify-center md:justify-start">
            <img
              src={details.images?.jpg?.large_image_url}
              alt={details.title}
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-3">{details.title}</h2>
            <p className="text-gray-700 mb-4">{details.synopsis}</p>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {details.genres.map((genre) => (
                <span
                  key={genre.mal_id}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              {details.trailer?.embed_url ? (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Watch Trailer
                </button>
              ) : (
                <button
                  disabled
                  className="px-5 py-2 bg-gray-400 text-white rounded-lg shadow cursor-not-allowed"
                >
                  No Trailer Available
                </button>
              )}
              <button className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition">
                Add to Favorites
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Recommended for you</h3>
          {recLoading ? (
            <p>Loading recommendations...</p>
          ) : recError ? (
            <p className="text-red-600">Failed to load recommendations</p>
          ) : recommendations?.data?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {recommendations.data.slice(0, 10).map((rec) => (
                <Link
                  to={`/anime/${rec.entry.mal_id}`}
                  key={rec.entry.mal_id}
                  className="block bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
                >
                  <img
                    src={rec.entry.images?.jpg?.large_image_url}
                    alt={rec.entry.title}
                    className="w-full h-48 object-cover"
                  />
                  <p className="px-2 py-2 text-sm font-medium text-gray-800 truncate">
                    {rec.entry.title}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p>No recommendations found.</p>
          )}
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative w-full max-w-3xl bg-black rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-gray-400"
            >
              ✕
            </button>
            <div className="aspect-video">
              <iframe
                src={details.trailer.embed_url}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
