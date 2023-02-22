import ProfileTranslationHistoryitem from "./ProfileTranslationHistoryitem";

const ProfileTranslationHistory = ({ translations }) => {

  // initialize translationList variable
  let translationList = '';

  // if translations are defined, map through the array and create a new translation item for each one
  if (typeof translations !== 'undefined'){
    translationList = translations.map(
      (translation,index) => <ProfileTranslationHistoryitem key={index +'-' +translation} translation={translation}/>);
  } else {  // if translations are undefined, display a message saying there are no translations yet
    translationList = 'No translations yet';
  }

  // limit the length of the translation list to 10 items
  if(translationList.length > 10){
    translationList = translationList.slice(translationList.length-10);
  }
  
  // return the translation list section with a heading and an unordered list
  return (
    <section>
      <h4>Your Translation History</h4>
      <ul>
        {translationList}
      </ul>
    </section>
  );
}

export default ProfileTranslationHistory;
