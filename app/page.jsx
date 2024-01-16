"use client";
import axios from "axios";
import { useRef, useState } from "react";

export default function Home() {
  const scrollTargetRef = useRef(null);

  const [videoLink, setVideoLink] = useState("");
  const [finalLink, setFinalLink] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDownload = () => {
    if (videoLink?.length === 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      setError(false);
      setLoading(true);
    }
    axios
      .get(`/api/downloader?url=${videoLink}`)
      .then((res) => {
        setFinalLink(res?.data?.format?.url);
        setShowDownload(true);
        setVideoLink("");
        handleScroll();
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  const handleScroll = () => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main className="mx-auto md:max-w-6xl px-4">
      <header className="flex justify-between py-4">
        {/* LOgo */}
        <div>
          <h3 className="text-xl font-semibold tracking-wider">
            Youtube Downloader
          </h3>
        </div>

        {/* Share Link */}
        <div>
          <p></p>
        </div>
      </header>
      {error && (
        <div class="bg-indigo-900 text-center py-4 lg:px-4">
          <div
            class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert"
          >
            <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              Please
            </span>
            <span class="font-semibold mr-2 text-left flex-auto">
              Paste the correct link
            </span>
            {/* <svg
              class="fill-current opacity-75 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg> */}
          </div>
        </div>
      )}
      <div className="flex text-white bg-indigo-300 rounded-md flex-col items-center min-h-[450px] w-full justify-center">
        <h3>
          {loading ? "Thank you for waiting" : "Shubh Youtube Video Downloader"}
        </h3>
        {loading ? (
          <div className="loader mt-3"></div>
        ) : (
          <div className="mt-4 space-x-2 w-full p-4 flex justify-center">
            <input
              type="text"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="p-2 w-[60%]  outline-none text-black"
              placeholder="Your link..."
            />
            <button
              onClick={handleDownload}
              className="rounded-md py-1 px-4 font-semibold border transition duration-300 hover:bg-white hover:text-indigo-300"
            >
              view
            </button>
          </div>
        )}
        {showDownload && (
          <div
            className="bg-black md:max-w-xl"
            id="scrollTarget"
            ref={scrollTargetRef}
          >
            <video src={finalLink} width="100%" controls />
          </div>
        )}
      </div>
    </main>
  );
}
