import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link to="/">
        <button className="bg-white text-black font-semibold rounded-full cursor-pointer px-4 py-8 text-xl font-bold h-10 flex items-center">
        Go back to Home
        </button>
      </Link>
    </div>
  );
};