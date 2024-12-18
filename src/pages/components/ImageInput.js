import Image from "next/image";

export default function ImageInput({ image, setImage, set64Image }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const dataURI = URL.createObjectURL(file);
    const getBase64StringFromDataURL = dataURI
      .replace("data:", "")
      .replace(/^.+,/, "");
    setImage(getBase64StringFromDataURL);

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      set64Image(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <label className="flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition">
        <div className="flex flex-col items-center justify-center text-gray-500 w-full h-full">
          {image ? (
            <div className="w-full h-full relative">
              <Image
                src={image}
                layout="fill"
                objectFit="contain" // Ensures the image fits the container without cropping
                alt="Preview"
                className="rounded-lg"
              />
            </div>
          ) : (
            <>
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18m-5 4v1m0-8v-1m2 3H9"
                ></path>
              </svg>
              <p className="mb-2 text-sm font-semibold">Click to upload</p>
              <p className="text-xs">PNG, JPG, or GIF (Max 2MB)</p>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
      {image && (
        <button
          onClick={() => setImage(null)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Remove Image
        </button>
      )}
    </div>
  );
}
