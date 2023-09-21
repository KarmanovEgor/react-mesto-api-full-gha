import Header from "../Header/Header";
import Main from "../Main/Main";

export default function ProtectedMain({ userEmail, ...props }) {
  // console.log(userEmail)
  return (
    <>
      <Header dataUser={userEmail} />
      <Main name="content" 
      {...props} />
    </>
  );
}
