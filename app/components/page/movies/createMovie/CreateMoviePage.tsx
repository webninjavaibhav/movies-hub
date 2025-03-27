'use client';
import Button from '@/app/components/common/Button';
import Input from '@/app/components/common/Input';
import Typography from '@/app/components/common/Typography';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useCreateMovie } from './useCreateMovie';
import Image from 'next/image';
import UploadImage from '@/app/components/common/UploadImage';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/common/Spinner';
import EditIcon from '@/assets/svg/EditIcon';

interface CreateMoviePageProps {
  movieId?: string;
}

/**
 * CreateMoviePage Component
 * Allows users to create a new movie by uploading an image and entering movie details
 */
export default function CreateMoviePage({ movieId }: CreateMoviePageProps) {
  const {
    file,
    existingPoster,
    error: submitError,
    isLoading,
    isSubmitting,
    setFile,
    register,
    handleSubmit,
    handleFormSubmit,
    errors,
  } = useCreateMovie(movieId);

  const router = useRouter();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
    accept: { 'image/*': [] },
    multiple: false,
  });

  const onSubmit = async (data: { title: string; publishYear: string }) => {
    await handleSubmit(data.title, data.publishYear);
  };

  return (
    <div className='min-h-screen max-w-[1248px] md:py-[120px] py-20 m-auto px-[24px]'>
      {/* Page Header */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-[10px]'>
          <Spinner size='large' />
        </div>
      )}
      <div className='md:pb-[120px] pb-20'>
        <Typography
          variant='h2'
          className='leading-[56px]'
        >
          {movieId ? 'Edit movie' : 'Create a new movie'}
        </Typography>
      </div>

      <form
        onSubmit={handleFormSubmit(onSubmit)}
        className='grid md:grid-cols-[1fr_1.27fr] max-md:!grid-rows-[auto] grid-cols-1 max-md:gap-6 sm:grid-rows-3 grid-rows-3 lg:gap-x-[127px] md:gap-x-10  max-md:pb-0'
      >
        {/* Image Upload Area */}
        <div
          {...getRootProps()}
          className='h-[372px] md:h-[504px] text-center row-span-3 border-2 max-md:order-1 border-dashed bg-[#2A4B55] border-white rounded-[10px] flex justify-center items-center cursor-pointer bg-#224957 relative'
        >
          <input {...getInputProps()} />
          {file ? (
            <div className='relative w-full h-full rounded-[10px] overflow-hidden object-cover'>
              <Image
                src={URL.createObjectURL(file)}
                alt='Preview'
                fill
                className='object-cover rounded-md'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
          ) : existingPoster ? (
            <div className='relative w-full h-full rounded-[10px] overflow-hidden object-cover movie-poster-group'>
              <Image
                src={existingPoster}
                alt='Current poster'
                fill
                className='object-cover rounded-md'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
              <div className='absolute movie-poster inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <EditIcon />
                <Typography
                  variant='h4'
                  className='text-white'
                >
                  Click to change movie poster
                </Typography>
              </div>
            </div>
          ) : isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <UploadImage />
          )}
        </div>

        {/* Movie Details Form */}
        <div className='max-md:order-0'>
          <div className='md:max-w-[362px] max-md:w-full flex flex-col gap-6'>
            <Input
              {...register('title')}
              classNames={{ container: 'w-full' }}
              placeholder='Title'
              error={errors.title?.message}
            />
            <Input
              {...register('publishYear')}
              classNames={{ container: 'md:w-[60%] w-full' }}
              placeholder='Publishing year'
              error={errors.publishYear?.message}
            />
            {submitError && (
              <Typography
                variant='small'
                className=' text-left hidden md:block text-[#EB5757]'
              >
                {submitError}
              </Typography>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className={`flex flex-col max-md:order-2 max-md:pt-4 gap-3 h-fit ${errors.publishYear ? 'md:mt-4' : ''}`}>
          {submitError && (
            <Typography
              variant='small'
              className=' text-left block md:hidden text-[#EB5757]'
            >
              {submitError}
            </Typography>
          )}
          <div className='md:max-w-[350px] flex w-full gap-4'>
            <Button
              type='button'
              className='w-full'
              variant='outlined'
              onClick={() => router.push('/movie-list')}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='w-full'
              variant='filled'
              disabled={isLoading}
            >
              {isSubmitting
                ? movieId
                  ? 'Updating...'
                  : 'Creating...'
                : movieId
                ? 'Update'
                : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}