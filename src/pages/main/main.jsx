import Footer from "../../components/footer/footer";
import Sidebar from "../../components/sidebar/sidebar";
import ProfilePage from "../profile/profile";

const Main = () => {
  return (
    <>
      {/* <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      > */}
      <Sidebar />
      <ProfilePage />
      {/* </div> */}
      <Footer />
    </>
  );
};

export default Main;
