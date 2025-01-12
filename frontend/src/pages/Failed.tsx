import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Failed() {
  return <SearchParamsComponent />;
}

function SearchParamsComponent() {
  const [title, setTitle] = useState<string>("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setTitle(searchParams.get("title") || "");
  }, [searchParams]);

  return (
    <section className="custom-container">
      <div className="headers">
        <Link to="/">← Go back home</Link>
      </div>

      <h3 className="font-[500] text-xl"> {title} Authentication Failed</h3>

      <div className="buttons">
        <Link to="/">Retry {title} Login</Link>
      </div>
    </section>
  );
}
