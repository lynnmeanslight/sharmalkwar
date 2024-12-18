export default function UserPrompt({ prompt, setPrompt, onSubmit, imageBuffer }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-6">
      <label
        htmlFor="userPrompt"
        className="text-lg font-semibold text-gray-700 mb-2"
      >
        Ask AI About the Image
      </label>
      <div className="relative w-full max-w-xl">
        {" "}
        {/* Adjusted max-w-lg to max-w-xl */}
        <input
          type="text"
          id="userPrompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What's in the image? 🤔"
          className="w-full py-3 pl-4 pr-10 text-lg text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
        />
        <button
          onClick={onSubmit}
          disabled={!imageBuffer} // Disable if no image is selected
          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 active:scale-95 transition"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
