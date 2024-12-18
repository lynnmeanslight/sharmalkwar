import ollama from "ollama";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Adjust size limit as needed (e.g., 10mb, 50mb)
    },
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { imageBuffer, prompt } = req.body;    
      if (!imageBuffer) {
        return res.status(400).json({ error: "No image data provided" });
      }

      // Handle Base64 validation
      const base64Data = imageBuffer.includes(";base64,")
        ? imageBuffer.split(";base64,").pop()
        : imageBuffer;

      try {
        Buffer.from(base64Data, "base64"); // Validate Base64
      } catch (err) {
        console.error("Error decoding Base64:", err.message);
        return res.status(400).json({ error: "Invalid Base64 data" });
      }

      // Resize the image using `sharp`
      const buffer = Buffer.from(base64Data, "base64");
      const resizedBuffer = await sharp(buffer)
        .resize({ width: 500, height: 500 })
        .toBuffer();

      // Convert resized buffer back to Base64
      // data:image/jpeg;base64,
      const resizedBase64 = `${resizedBuffer.toString(
        "base64"
      )}`;
      // Call the Ollama API
      const response = await ollama.chat({
        model: "llama3.2-vision:latest",
        messages: [
          {
            role: "user",
            content: prompt,
            images: [resizedBase64],
          },
        ],
      });
      res.status(200).json(response);
    } catch (error) {
      console.error("Error in handler:", error);
      res.status(500).json({ error: "Something went wrong!" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

