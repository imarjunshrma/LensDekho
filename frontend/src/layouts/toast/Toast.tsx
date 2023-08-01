import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    return <ToastContainer position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
};

export default Toast;
