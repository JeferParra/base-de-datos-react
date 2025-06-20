import { Hourglass } from "ldrs/react";
import "ldrs/react/Hourglass.css";

function Loading() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark">
        <Hourglass
          size="100"
          bgOpacity="0.1"
          speed="1.75"
          color="RGB(13, 270, 230)"
        />
        <h5 style={{ color: "RGB(13, 270, 230)" }}>
          Despertando el servidor...
        </h5>
      </div>
    </>
  );
}

export default Loading;
