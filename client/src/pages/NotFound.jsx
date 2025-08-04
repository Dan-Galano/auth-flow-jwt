import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="grid place-content-center h-dvh text-center">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <div className="pt-5 text-sm text-grey ">
        <Link to={"/"}>
          <span className="transition-all ease-in-out duration-300 hover:text-white">
            Return Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;