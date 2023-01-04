import Loader from "./layout/Loader";
import Message from "./layout/Message";
import RouterFunction from "./routes";

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
