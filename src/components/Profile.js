import React from "react";
import Webcam from "react-webcam";
import { saveMyImage } from "../service/Send";
const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
const Profile = () => {
  const [picture, setPicture] = React.useState("");
  const [loc, setLoc] = React.useState(null);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition((position) => {
        console.log(position);
        setPicture(pictureSrc);
        setLoc({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        console.log(loc);
        saveMyImage(pictureSrc, position);
      });
    } else {
      console.log(console.error("error location"));
    }
  });

  return (
    <div>
      <h2 className="mb-5 text-center">Ciluk Baaaaaaaaaa!</h2>
      <div>
        {picture == "" ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} />
        )}
      </div>
      <div>
        {picture != "" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setPicture();
            }}
            className="btn btn-primary"
          >
            Retake
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="btn btn-danger"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  );
};
export default Profile;
