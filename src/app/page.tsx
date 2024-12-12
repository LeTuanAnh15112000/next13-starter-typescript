import styles from "./page.module.css";
import Link from "next/link";
import linkStyle from "../styles/app.module.scss";
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Home page | Learn NextJs with TypeScript basic',
  description: 'try hard',
}

export default function Home() {
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
    </main>
  );
}
