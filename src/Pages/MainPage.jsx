import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPerson from "../Buttons/AddPerson";
import RemovePerson from "../Buttons/RemovePerson";

function MainPage({ people, setPeople }) {

  const navigate = useNavigate();
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [showRemovePerson, setShowRemovePerson] = useState(false);

  //array for list of items
  const [items, setItems] = useState([
    { id: 0, name: "Dish Soap", price: 5.00, quantity: 2 },
    { id: 1, name: "Chair", price: 10.00, quantity: 1 },
    { id: 2, name: "Paper Towels", price: 3.00, quantity: 6 }
  ]);

  //function to delete from list of items
  const deleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (

    <>
      {/*Entire Page div, used to set background color easily*/}
      <div style={{ backgroundColor: "white" }}>



        {/*Upper half of main page div*/}
        <div style={{ textAlign: "left" }}>
          {/*Displays text "Person: Total Spent"*/}
          <p style={{ fontSize: '48px', fontWeight: "bold", color: "black" }}>
            Person: Total Spent
          </p>
          {/*Div that displays names with money spent in format Name: $*/}
          <div style={{ border: "2px solid black", padding: "15px", width: "367px", marginBottom: "15px" }}>
            {/*Div that displays the entire array of people*/}
            <div>
              {people.map(person => (
                <p key={person.id} style={{ fontSize: "28px" }}>
                  {person.name}: ${person.total}
                </p>
              ))}
            </div>
          </div>
          {/*Div that displays buttons: +, -, edit person*/}
          <div style={{ display: "flex", gap: "7px" }}>
            {/*Routes to AddPerson page to peform function of adding a person*/}
            <button onClick={() => setShowAddPerson(true)} style={{ backgroundColor: 'black', color: 'greenyellow' }}>
              +
            </button>
            {/*Pop up add person*/}
            {showAddPerson && (
              <AddPerson
                people={people}
                setPeople={setPeople}
                closePopup={() => setShowAddPerson(false)}
              />
            )}
            {/*Routes to RemovePerson page to peform function of removing a person*/}
            <button onClick={() => setShowRemovePerson(true)} style={{ backgroundColor: 'black', color: 'red' }}>
              -
            </button>
            {/*Pop up remove person*/}
            {showRemovePerson && (
              <RemovePerson
                people={people}
                setPeople={setPeople}
                closePopup={() => setShowRemovePerson(false)}
              />
            )}
            {/*Routes to EditPerson page to peform function of editing a person*/}
            <button onClick={() => navigate("/edit-person")} style={{ backgroundColor: 'black', color: 'white' }}>
              Edit Person
            </button>
          </div>

        </div>





        {/*Lower half of page div (list of items to buy)*/}
        <div style={{ textAlign: "left", marginTop: "50px" }}>
          {/*Div for title text and 'add item' button*/}
          <div>
            <span style={{ fontSize: "54px", fontWeight: "bold", marginRight: "20px", color: "black" }}>
              Items to Buy:
            </span>
            <button onClick={() => navigate("")} style={{ backgroundColor: "black", color: "blue" }}>
              +
            </button>
          </div>

          {/*Div for search bar and filter button*/}
          <div style={{ marginTop: "15px", marginBottom: "10px" }}>
            <input type="text" placeholder="Search..." style={{ fontSize: "19px", border: "1px solid black" }} />
            <button onClick={() => navigate("")} style={{ fontSize: "13px", backgroundColor: 'white', color: 'black', border: "1px solid black", marginLeft: "10px" }}>
              Filter
            </button>
          </div>

          {/*Div for list of items*/}
          <div style={{ border: "2px solid black", padding: "15px", width: "367px", marginBottom: "15px" }}>
            {items.map(item => (
              <p key={item.id} style={{ fontSize: "28px", color: "black" }}>
                {item.name}: ${item.price}

                {/*mark as purchased button*/}
                <button style={{ float: "right", fontSize: "8px", border: "1px solid black", marginLeft: "3px" }}>
                  Purchased
                </button>

                {/*quantity input*/}
                <input id="itemQuantity" type="number" defaultValue={item.quantity} min="1" max="99" step="1" style={{ width: "30px", float: "right" }} />

                {/*delete button*/}
                <button onClick={() => deleteItem(item.id)} style={{ float: "right", fontSize: "8px", border: "1px solid black", marginRight: "3px" }}>
                  Delete
                </button>
              </p>
            ))}
          </div>
        </div>

        {/*Logout button*/}
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Logout
        </button>

      </div>
    </>
  );
}

export default MainPage;