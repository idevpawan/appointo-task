import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MainFooter from "./components/Main/MainFooter";
import { getImage } from "./utils";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-box">
        <Main />
        <MainFooter />
      </div>
      <div className="gradient-blur" />
      <img className="bg-img-1" src={getImage("bg-image-1.svg")} alt="" />
      <img className="bg-img-2" src={getImage("bg-image-2.svg")} alt="" />
    </div>
  );
}

export default App;
