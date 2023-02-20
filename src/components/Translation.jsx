import { useState } from "react";
import { addTranslation } from "../api/translate";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";
import { storageSave } from "../utils/storage";

function Translation({ onLogout }) {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState([]);
  const {user, setUser} = useUser()
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
    const [error,updatedUser] = await addTranslation(user,trans)
    if(error !== null){
      return
    }
    //keep ui state and server state in sync
    storageSave(STORAGE_KEY_USER,updatedUser)
    //update context state
    setUser(updatedUser)
    console.log('Error',error);
    console.log('updatedUser', updatedUser);
  };

  
  return (
    <div>
      <label>        
        <input placeholder='Enter text for translation' type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      </label>
      <button className="translation_btn" onClick={handleTranslate}>Translate</button>
      <br />
      <label class="tr_text">
        <h4>Translated Text:</h4> 
        {translatedText.map((image, index) => (
          <img key={index} src={image} alt="sign language" />
        ))}
      </label>
      <br />
      
    </div>
  );
}

export default withAuth(Translation);
