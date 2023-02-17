import { useState } from "react";
import { addTranslation } from "../api/translate";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";

function Translation({ onLogout }) {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState([]);
  const {user} = useUser()
  const handleTranslate = async () => {
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
    const trans = inputText
    const [error,result] = await addTranslation(user,trans)

    
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
        <h4>Translated Text:</h4> 
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
