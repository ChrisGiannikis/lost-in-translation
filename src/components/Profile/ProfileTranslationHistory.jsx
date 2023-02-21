import ProfileTranslationHistoryitem from "./ProfileTranslationHistoryitem";

const ProfileTranslationHistory = ({ translations }) => {
  let translationList = '';
  if (typeof translations !== 'undefined'){
    translationList = translations.map(
      (translation,index) => <ProfileTranslationHistoryitem key={index +'-' +translation} translation={translation}/>);
  }else{
    translationList = 'No translations yet';
  }

  if(translationList.length > 10){
    translationList = translationList.slice(translationList.length-10);
  }
  

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
