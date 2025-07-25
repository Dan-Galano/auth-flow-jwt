import { ThreeDot } from "react-loading-indicators";

const Loader = ({ variant = "pulsate" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 pointer-events-auto">
      <div className="pointer-events-none">
        <ThreeDot
          variant={variant}
          color="#e3e3e1"
          size="medium"
          text=""
          textColor=""
        />
      </div>
    </div>
  );
};

export default Loader;