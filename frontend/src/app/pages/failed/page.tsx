"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Failed() {
  return (
    <Suspense>
      <SearchParamsComponent />
    </Suspense>
  );
}

function SearchParamsComponent() {
  const [title, setTitle] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    setTitle(searchParams.get("title") || "");
  }, [searchParams]);
  return (
    <section className="custom-container">
      <div className="headers">
        <Link href="/">← Go back home</Link>
      </div>

      <h3 className="font-[500] text-xl"> {title}Authentication Failed</h3>

      <div className="buttons">
        <Link href="/pages/oauth">Retry OAuth Login</Link>
      </div>
    </section>
  );
}
