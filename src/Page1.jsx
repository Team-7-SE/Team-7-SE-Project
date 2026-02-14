import { useNavigate } from "react-router-dom";
import './App.css'

function Page1() {

  const navigate = useNavigate();

  return (
    <>
      
      <div>

        <p style={{fontSize: '54px'}}>
          Home page work here Eric
        </p>

        <button onClick={() => navigate("/main")} style={{backgroundColor: 'blue', color: 'white'}}>
          Route me to main page(Sam and Alex work here)
        </button>

        <button onClick={() => navigate("/transaction")} style={{backgroundColor: 'pink', color: 'black'}}>
          Route me to transaction page(Nathaniel work here)
        </button>
        

      </div>

    </>
  )
}

export default Page1;