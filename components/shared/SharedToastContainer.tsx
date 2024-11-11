import { ToastContainer } from 'react-toastify';

const SharedToastContainer = () => (
  <ToastContainer
    position={window.innerWidth <= 768 ? 'top-center' : 'top-right'}
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export default SharedToastContainer;
