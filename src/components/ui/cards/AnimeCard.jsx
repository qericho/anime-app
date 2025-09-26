const sampleIMG =
  "https://i.pinimg.com/474x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg";

const AnimeCard = ({ anime, id }) => {
  return (
    <div className="w-full xl:w-60 h-auto border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="w-full h-40 relative overflow-hidden">
        <img
          src={anime.images?.jpg?.image_url || sampleIMG}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md shadow">
          {anime.type}
        </span>
      </div>

      {/* Content */}
      <div className="px-3 py-2 text-gray-800">
        <p className="text-base font-semibold truncate">{anime.title}</p>

        {/* Rating */}
        <p className="flex items-center text-sm text-yellow-600 mt-1">
          Rating: {anime.score || "N/A"}
        </p>

        <p className="mt-2 text-xs text-gray-700 line-clamp-3">
          {anime.synopsis || "No description available."}
        </p>

        <p className="text-sm text-gray-600 truncate">
          Genre:{" "}
          {anime.genres?.map((g) => g.name).join(", ") || "Not specified"}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-3">
          <button className="cursor-pointer px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors">
            Watch
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
