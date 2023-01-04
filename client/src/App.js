import Loader from "./layout/Loader";
import Message from "./layout/Message";
import RouterFunction from "./routes";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

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
