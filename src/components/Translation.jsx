import { useState } from "react";
import withAuth from "../hoc/withAuth";

function Translation({ onLogout }) {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState([]);

  const handleTranslate = () => {
    // Remove special characters and spaces and limit input to 40 letters
    const textToTranslate = inputText.replace(/[^\w]/g, "").substring(0, 40);

    // Call the translation API to get the corresponding sign language images
    // using the textToTranslate variable as the input text.
    const images = [];
    for (let i = 0; i < textToTranslate.length; i++) {
      const letter = textToTranslate.charAt(i).toLowerCase();
      images.push(`LostInTranslation_Resources/individial_signs/${letter}.png`);
    }
    setTranslatedText(images);

    // Store the original text and the translated sign language in the API by making a POST request.
    // You can use the fetch() function or a library like Axios for this.s
    fetch("https://fc-assignment02-api-production.up.railway.app/translations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: localStorage.getItem("username"), originalText: inputText, translatedText: images }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <label>
        Input Text:
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      </label>
      <button onClick={handleTranslate}>Translate</button>
      <br />
      <label>
        Translated Text:
        {translatedText.map((image, index) => (
          <img key={index} src={image} alt="sign language" />
        ))}
      </label>
      <br />
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default withAuth(Translation);
