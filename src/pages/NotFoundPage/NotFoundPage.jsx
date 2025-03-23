import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <h1>
        Not Found! Please follow this <Link to="/">link</Link>
      </h1>
    </>
  );
}