import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import MainLayout from './components/MainLayout';

function App(){
  return(
    <div className="min-vh-100 d-flex flex-column bg-dark text-light">
      <Header />
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <MainLayout />
      </div>
    </div>
  );
}

export default App;