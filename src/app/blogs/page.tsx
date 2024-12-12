"use client";
import useSWR from "swr";
import TableContent from "@/components/table/app.table";

const BlogsPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (isLoading) {
    return "Loading...";
  }
  return <TableContent blogs={data?.sort((a: any, b: any) => b.id - a.id)} />;
};

export default BlogsPage;
