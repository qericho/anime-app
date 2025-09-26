import { useState } from "react";
import AnimeCard from "../components/ui/cards/AnimeCard";
import { useFetch } from "../hooks/useFetch";
import Fade from "../components/ui/spinner/Fade";
import ErrorPage from "./ErrorPage";

const AnimePage = () => {
  const [page, setPage] = useState(1);

  // Fetch all TV anime
  const { data, loading, error } = useFetch(
    `https://api.jikan.moe/v4/anime?type=tv&page=${page}`
  );

  if (loading) return <Fade />;
  if (error) return <ErrorPage error={error} />;

  return (
    <div className="max-w-7xl h-full mx-auto">
      <h1 className="text-2xl font-semibold my-8 px-2">All Anime</h1>
      {/* Anime Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-2 py-5">
        {data?.data?.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 py-5">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {page} of {data?.pagination?.last_visible_page || "?"}
        </span>

        <button
          onClick={() =>
            setPage((prev) =>
              data?.pagination?.has_next_page ? prev + 1 : prev
            )
          }
          disabled={!data?.pagination?.has_next_page}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AnimePage;
