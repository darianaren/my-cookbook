import Loader from "./components/others/Loader";
import Message from "./components/others/Message";
import RouterFunction from "./routes";
import axios from "axios";

axios.defaults.baseURL = "https://my-cookbook-production.up.railway.app";

function App() {
  return (
    <>
      <Loader />
      <Message />
      <RouterFunction />
    </>
  );
}

export default App;
