"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState();
  const [marketUnit, setMarketUnit] = useState();
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn");
      if (!loggedIn) {
        router.replace("/");
      }
    }
  }, [router]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.replace("/");
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleMarketUnit = (e) => {
    setMarketUnit(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Molimo dodajte file");
      return;
    }

    if(!marketUnit){
        setMessage('Molimo unesite poslovnu jedinicu')
        return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("durationInSeconds", duration);
    formData.append("marketUnit", marketUnit);

    try {
      const respones = await fetch("http://172.23.207.81:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (respones.ok) {
        const data = await respones.json();
        setMessage(`Upload upsješan! File name: ${data.fileName}`);
        setFile(null);
        setDuration(null);
        setMarketUnit(null);
      } else {
        setMessage("Upload failed");
      }
    } catch (error) {
      console.log("Error file uploading:", error);
      setMessage("An error occured during upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#DA4453] to-[#89216B] h-screen w-screen flex items-center justify-center">
      <div className="w-240 h-170 flex items-center justify-center bg-white rounded-xl relative">
        <div className="flex flex-col items-center justify-center">
          <div className="absolute top-0 items-center">
            <h1 className="mt-10 text-xl">Upload Image&Video</h1>
          </div>
          <div className="absolute right-0 top-0 m-3">
            <button className="bg-red-400 p-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div>
            <input
              className="bg-[#e6e6e6] p-20 rounded-xl"
              type="file"
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
          </div>
          <div>
            <input
              value={marketUnit}
              onChange={handleMarketUnit}
              type="number"
              placeholder="Unesite poslovnu jedinicu"
              className="mt-5 w-100 p-3 rounded-full text-sm"
              required
            />
          </div>

          <div>
            <input
              value={duration || ""}
              onChange={handleDurationChange}
              type="number"
              placeholder="Unesite dužinu trajanja slike (sekunde)"
              className="mt-5 w-100 rounded-full p-3 text-sm"
            />
          </div>
          <button
            className="bg-[#57b846] p-5 mt-10 w-100 rounded-full"
            onClick={handleUpload}
            disabled={!file || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}{" "}
          </button>
          <div className="text-red-400">{message + "!"}</div>
        </div>
      </div>
    </div>
  );
}
