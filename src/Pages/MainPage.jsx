function MainPage() {

  return (
    
     <>
     {/*Entire Page div, used to set background color easily*/}
      <div style = {{backgroundColor: "white"}}>
      


        {/*Upper half of main page div*/}
        <div style = {{textAlign: "left"}}>
          {/*Displays text "Person: Total Spent"*/}
          <p style={{fontSize: '48px', fontWeight: "bold", color: "black"}}>
            Person: Total Spent
          </p>
          {/*Div that displays names with money spent in format Name: $*/}
          <div style={{border: "2px solid black", padding: "15px", width: "367px", marginBottom: "15px"}}>
            <p style={{fontSize: '28px'}}>
              Carter: $35.67
            </p>
            <p style={{fontSize: '28px'}}>
              Sam: $18.98
            </p>
            <p style={{fontSize: '28px'}}>
              Nathaniel: $22.54
            </p>
            <p style={{fontSize: '28px'}}>
              Erik: $18.30
            </p>
          </div>
          {/*Div that displays buttons: +, -, edit person*/}
          <div style={{display: "flex", gap: "7px"}}>
            <button onClick={() => navigate("")} style={{backgroundColor: 'black', color: 'greenyellow'}}>
              +
            </button>
            <button onClick={() => navigate("")} style={{backgroundColor: 'black', color: 'red'}}>
              -
            </button>
            <button onClick={() => navigate("")} style={{backgroundColor: 'black', color: 'white'}}>
              Edit Person
            </button>
          </div>

        </div>







        {/*Sam work in this div below*/}
        <div>
          <p style={{fontSize: '54px'}}>
            SAMUELS div
          </p>
        </div>



 


      </div>
    </>
  );
}

export default MainPage;