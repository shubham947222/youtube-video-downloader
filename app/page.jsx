"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [videoLink, setVideoLink] = useState("");
  const [finalLink, setFinalLink] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    axios
      .get(`/api/downloader?url=${videoLink}`)
      .then((res) => {
        setFinalLink(res?.data?.format?.url);
        setShowDownload(true);
        setVideoLink("");
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  console.log(loading, "loading");
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

      <div className="flex text-white bg-indigo-500 rounded-md flex-col items-center min-h-[450px] w-full justify-center">
        <h3>
          {loading ? "Thank you for waiting" : "Youtube Video Downloader"}
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
              // className="rounded-md py-1 px-4 font-semibold border"
              className="rounded-md py-1 px-4 font-semibold border transition duration-300 hover:bg-white hover:text-indigo-500"
            >
              Convert
            </button>
          </div>
        )}
      </div>
      {showDownload && (
        <div className="bg-black">
          <video src={finalLink} width="100%" controls />
        </div>
      )}
    </main>
  );
}
