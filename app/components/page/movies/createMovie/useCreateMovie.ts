import { request } from "@/app/utils/axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { movieResponseProps } from "../movieList/useMovieList";
import { useForm, UseFormRegister, UseFormHandleSubmit, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Please provide a movie title")
    .trim()
    .min(2, "Movie title must be at least 2 characters long")
    .max(50, "Movie title cannot exceed 50 characters"),
  publishYear: yup
    .string()
    .required("Please provide the movie's release year")
    .matches(/^\d{4}$/, 'Please enter a valid year (YYYY)')
    .test('year-range', 'Please enter a year between 1888 and the next 5 years', (value) => {
      if (!value) return false;
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      return year >= 1888 && year <= currentYear + 5;
    })
    .test('year-message', (value, ctx) => {
      if (!value) return true;
      const year = parseInt(value);
      const maxYear = new Date().getFullYear() + 5;
      if (year < 1888 || year > maxYear) {
        return ctx.createError({
          message: `${year} is not a valid year! Year must be between 1888 and ${maxYear}`
        });
      }
      return true;
    }),
});

type FormData = yup.InferType<typeof schema>;

interface UseCreateMovieReturn {
  file: File | null;
  existingPoster: string | null;
  error: string;
  isLoading: boolean;
  isSubmitting: boolean;
  setFile: (file: File | null) => void;
  handleSubmit: (title: string, publishYear: string) => Promise<void>;
  register: UseFormRegister<FormData>;
  handleFormSubmit: UseFormHandleSubmit<FormData>;
  errors: FieldErrors<FormData>;
}

/**
 * Custom hook for handling movie creation and editing functionality
 * Manages form state and submission for creating/editing movies
 */
export const useCreateMovie = (movieId?: string): UseCreateMovieReturn => {
  const router = useRouter();

  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [existingPoster, setExistingPoster] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  // Fetch movie data if in edit mode
  useEffect(() => {
    const fetchMovie = async () => {
      if (movieId) {
        try {
          setIsLoading(true);
          const response = await request<{ data: movieResponseProps }>({
            method: "GET",
            url: `/movies/${movieId}`,
          });

          if (response.data) {
            setExistingPoster(response.data.poster || null);
            setValue('title', response.data.title);
            setValue('publishYear', response.data.publishYear.toString());
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to fetch movie data');
          clearError();
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMovie();
  }, [movieId, setValue]);

  /**
   * Clears error message after specified delay
   */
  const clearError = () => {
    setTimeout(() => setError(""), 5000);
  };

  /**
   * Handles form submission to create or update a movie
   * Validates inputs and makes API request
   */
  const handleFormSubmit = async (title: string, publishYear: string) => {
    try {
      setIsSubmitting(true);
      setError("");

      const formData = new FormData();
      formData.append('title', title);
      formData.append('publishYear', publishYear);
      if (file) {
        formData.append('poster', file);
      }

      const response = await request<{ data: movieResponseProps }>({
        method: movieId ? "PUT" : "POST",
        url: movieId ? `/movies/${movieId}` : "/movies",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data) {
        router.push("/movie-list");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      clearError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    file,
    existingPoster,
    error,
    isLoading,
    isSubmitting,
    setFile,
    handleSubmit: handleFormSubmit,
    register,
    handleFormSubmit: handleSubmit,
    errors
  };
};
