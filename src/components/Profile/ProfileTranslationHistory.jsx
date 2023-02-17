import ProfileTranslationHistoryitem from "./ProfileTranslationHistoryitem";

const ProfileTranslationHistory = ({ favourites }) => {
  const translationList = favourites.map(
    (translation,index) => <ProfileTranslationHistoryitem key={index +'-' +translation} translation={translation}/>)

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
