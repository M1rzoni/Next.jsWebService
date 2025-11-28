"use client";

import Image from "next/image";
import img from "./img.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { stringify } from "querystring";
import Home from "./home/page";

export default function Login() {
  const router = useRouter();

  const HARDCODED_USERNAME = "admin";
  const HARDCODED_PASSWORD = "admin";

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [router]);

  const handleLogin = (event) => {
    event?.preventDefault();

    if (username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/home");
    } else {
      setError("Pogrešan username ili password");
    }
  };
  return (
    <div className="bg-gradient-to-r from-[#DA4453] to-[#89216B] h-screen w-screen flex items-center justify-center">
      <div className="w-240 h-170 flex items-center justify-center bg-white rounded-xl relative">
        <div className="flex items-center justify-center">
          <div className="flex flex-col  items-center justify-center">
            <form
              className="flex flex-col absolute right-20 top-45"
              action=""
              onSubmit={handleLogin}
            >
              <h1 className="text-2xl font-bold">Member Login</h1>
              <div className="mt-15 mb-4">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="bg-[#e6e6e6] p-3 rounded-full w-70"
                  type="username"
                  required
                />
              </div>
              <div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="bg-[#e6e6e6] p-3 rounded-full w-70"
                  type="password"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#57b846] mt-5 p-3 rounded-full text-white-500 w-70"
                >
                  Login
                </button>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
        <div className="absolute left-20 top-45">
          <Image src={img} alt="image" />
        </div>
      </div>
    </div>
  );
}
