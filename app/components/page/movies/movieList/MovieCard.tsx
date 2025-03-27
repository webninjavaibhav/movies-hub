import { movieResponseProps } from "@/app/components/page/movies/movieList/useMovieList";
import EditIcon from "@/assets/svg/EditIcon";
import Typography from "@/app/components/common/Typography";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

// Fallback image URL used when movie poster is not available
const DEFAULT_POSTER_URL =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2959&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

/**
 * MovieCard Component
 * Displays individual movie information in a card format
 *
 * @param {movieResponseProps} props - Movie data including poster, title, publishYear and _id
 * @returns {JSX.Element} A card component displaying movie information
 */
const MovieCard: React.FC<movieResponseProps> = ({
  poster,
  title,
  publishYear,
  _id,
}) => {
  const router = useRouter();

  return (
    <div
      className="bg-[#092C39] movie-card-hover transition-all duration-500 cursor-pointer md:p-[8px] rounded-[12px] overflow-hidden flex flex-col md:gap-4 relative group"
      key={_id}
    >
      <div className="relative w-full md:aspect-[1/1.505] aspect-[1/1.37]  h-full">
        <Image
          src={poster || DEFAULT_POSTER_URL}
          alt={title}
          fill
          className="w-full  object-cover md:rounded-[12px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ clipPath: "inset(0 0 0 0)" }}
        />
        {/* Edit button positioned absolutely */}
        <span
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/edit-movie/${_id}`);
          }}
          className="absolute top-2 movie-card-icon right-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 p-2 rounded-full max-md:[&_svg]:w-[20px] max-md:[&_svg]:h-[20px]"
        >
          <EditIcon />
        </span>
      </div>

      {/* Movie details section */}
      <div className="flex items-start justify-between md:gap-2 gap-4 p-3 md:p-0 md:pb-2 md:px-2 w-full">
        <div className="flex flex-col md:gap-2 gap-4 max-w-full">
          {/* Movie title */}
          <div className="relative group">
            <div className="max-w-full" title={title}>
              <h4 className="font-bold max-md:font-bold truncate md:leading-[32px]">
                {title}
              </h4>
            </div>
          </div>

          {/* Publication year */}
          <Typography variant="p" className="md:leading-[24px]">
            {publishYear}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;