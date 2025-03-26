'use client';
import Pagination from './Pagination';
import NoFoundMovie from './NoFoundMovie';
import { useRouter } from 'next/navigation';
import { movieResponseProps } from './useMovieList';
import { useMovieList } from './useMovieList';
import MovieCard from './MovieCard';
import Typography from '@/app/components/common/Typography';
import PlusIcon from '@/assets/svg/PlusIcon';
import LogOuIcon from '@/assets/svg/LogOutIcon';
import Spinner from '@/app/components/common/Spinner';
import { removeToken } from '@/app/utils/auth';

/**
 * MovieListPage Component
 * Displays a grid of movie cards with pagination and navigation controls
 */
const MovieListPage = () => {
  // Hooks
  const router = useRouter();
  const { movielist, pageCount, totalPage, handlePageChange, isLoading } =
    useMovieList();

  /**
   * Handles user logout
   * Removes auth token and redirects to sign-in page
   */
  const handleLogout = () => {
    removeToken();
    router.push('/sign-in');
  };

  /**
   * Navigates to movie creation page
   */
  const handleAddMovie = () => {
    router.push('/create-movie');
  };

  return (
    <>
      {!isLoading && !movielist?.length ? (
        <NoFoundMovie />
      ) : (
        <div className='min-h-screen max-w-[1248px] flex flex-col md:gap-[120px] gap-20 md:pt-[120px] pt-20 m-auto px-[24px] mb-[160px]'>
          <div className='flex items-center'>
            <div className='flex justify-center items-center  gap-3'>
              <Typography
                variant='h2'
                className='leading-[56px] mb-1'
              >
                My Movies
              </Typography>
              <span onClick={handleAddMovie} className='cursor-pointer'>
                <PlusIcon className='max-md:w-[24px] max-md:h-[24px]' />
              </span>
            </div>
            <div className='ml-auto flex gap-3 cursor-pointer'>
              <Typography
                variant='span'
                className='font-bold md:flex  hidden !leading-[24px]'
              >
                Logout
              </Typography>
              <div onClick={handleLogout}>
                <LogOuIcon className='max-md:w-[18px] max-md:h-[18px]' />
              </div>
            </div>
          </div>
          {isLoading && (
            <div className='fixed inset-0 flex items-center justify-center bg-black/50 rounded-xl z-10'>
              <Spinner size='large' />
            </div>
          )}
          <div className='grid grid-cols-2 md:gap-6 max-md:gap-y-10 gap-5 md:grid-cols-3 lg:grid-cols-4 relative'>
            {movielist?.map((movie: movieResponseProps) => (
              <MovieCard
                key={movie._id}
                {...movie}
              />
            ))}
          </div>

          {!isLoading && (
            <Pagination
              pageCount={pageCount}
              totalPage={totalPage}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MovieListPage;
