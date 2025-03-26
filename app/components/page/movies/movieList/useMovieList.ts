import { request } from "@/app/utils/axios";
import { useEffect, useState, useCallback } from "react";

export type movieResponseProps = {
  _id: string;
  title: string;
  publishYear: number;
  poster?: string;
};

export const useMovieList = () => {
  const [movielist, setMovielist] = useState<movieResponseProps[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getAllMovieData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await request<{
        data: movieResponseProps[];
        totalPages: number;
      }>({
        method: "GET",
        url: `/movies?page=${pageCount}&limit=8`,
      });


      if (response && response.data) {
        setMovielist(response.data);
        setTotalPage(response.totalPages);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }, [pageCount]);

  useEffect(() => {
    getAllMovieData();
  }, [getAllMovieData]);

  const handlePageChange = (page: number | "next" | "prev") => {
    setPageCount((prevPage) => {
      if (page === "next") {
        return prevPage + 1;
      } else if (page === "prev") {
        return prevPage - 1;
      }
      return page;
    });
  };

  return {
    movielist,
    pageCount,
    totalPage,
    handlePageChange,
    isLoading,
  };
};
