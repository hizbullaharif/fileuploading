import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App({ props, toastId }) {
  console.log(toastId);
  const notify = () => {
    toast.info(props, {
      toastId: toastId,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <ToastContainer />
      {notify()}
    </div>
  );
}

export default App;
