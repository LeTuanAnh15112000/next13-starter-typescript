"use client";

import TableContent from "@/components/table/app.table";
import styles from "./page.module.css";
import Link from "next/link";
import linkStyle from "../styles/app.module.scss";
import useSWR from "swr";

export default function Home() {
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
  if (!data) {
    return "Loading...";
  }
  return (
    <main className={styles.main}>
      <ul className={linkStyle.list}>
        <li>
          <Link className={linkStyle.social} href={"/facebook"}>
            Facebook
          </Link>
        </li>
        <li>
          <Link className={linkStyle.social} href={"/instagram"}>
            Instagram
          </Link>
        </li>
        <li>
          <Link className={linkStyle.social} href={"/youtube"}>
            Youtube
          </Link>
        </li>
      </ul>
      <TableContent blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
    </main>
  );
}
