import axios from "axios";

import Loader from "./components/others/Loader";
import Message from "./components/others/Message";
import RouterFunction from "./routes";

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
