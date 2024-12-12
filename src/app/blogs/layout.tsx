import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blogs page | Learn NextJs with TypeScript basic",
  description: "try hard",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-5">{children}</div>;
}
