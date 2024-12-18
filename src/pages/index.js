import { useState } from "react";
import ImageInput from "./components/ImageInput";
import { FaTwitter } from "react-icons/fa";
import { Geist, Geist_Mono } from "next/font/google";
import UserPrompt from "./components/UserPrompt";
import convertNanoseconds from "./utils/timeFormatter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [imageBuffer, setImageBuffer] = useState(null);
  const [prompt, setPrompt] = useState(""); // State to manage the prompt
  const [response, setResponse] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSubmit = async () => {
    setIsLoading(true); // Set loading state to true
    setResponse(null); // Clear any previous response
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageBuffer: base64Image, prompt }),
      });

      const data = await res.json();
      setResponse(data); // Set the response from API
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <div className="w-full">
          <ImageInput
            image={imageBuffer}
            setImage={setImageBuffer}
            set64Image={setBase64Image}
          />
        </div>

        <div className="w-full">
          <UserPrompt
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleSubmit}
            imageBuffer={imageBuffer}
          />
        </div>

        {/* Loading animation */}
        {isLoading && (
          <div className="w-full mt-8 flex justify-center items-center">
            <div
              class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
              role="status"
              aria-label="loading"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {/* Add a section to display the response */}

        {/* Create a text box for displaying a time take to be generated text  */}

        {response && (
          <div>
            <p className="underline">Time taken to generate:</p>
            <p>{convertNanoseconds(response.total_duration)}</p>
          </div>
        )}
        {response && (
          <div className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">Response:</h3>
            <pre className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
              {response.message.content}
            </pre>
          </div>
        )}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://x.com/lynnthelight"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={20} color="black" />
        </a>
        © 2024 LynnTheLight
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://x.com/lynnthelight"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={20} color="black" />
        </a>
      </footer>
    </div>
  );
}
