import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ref, update, get } from "firebase/database";
import { db } from "../firebase";
import { push } from "firebase/database";

import AddPerson from "../Buttons/AddPerson";
import RemovePerson from "../Buttons/RemovePerson";
import AddItem from "../Buttons/AddItem";
import Purchased from "../Buttons/Purchased";
import EditPerson from "../Buttons/EditPerson";
import SortPeople from "../Buttons/SortPeople";
import SortItems from "../Buttons/SortItems";


function MainPage({ people, setPeople }) {

  const navigate = useNavigate();
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [showRemovePerson, setShowRemovePerson] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showPurchased, setShowPurchased] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [personSearch, setPersonSearch] = useState("");
  const [showEditPerson, setShowEditPerson] = useState(false);
  const [itemSearch, setItemSearch] = useState("");
  const [showSort, setShowSort] = useState(false);
  const [sortType, setSortType] = useState("default");
  const [showItemSort, setShowItemSort] = useState(false);
  const [itemSortType, setItemSortType] = useState("default");

  //Route protection so u cant just copy paste link to home page bypassing login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //Takes to login page (security feature)
      if(!user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  //Log out of application
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
  }

  //array for list of items
  const [items, setItems] = useState([]);

  useEffect(() => {
  const itemsRef = ref(db, 'items');
  get(itemsRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      //Firebase objective to array conversion
      const itemsList = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setItems(itemsList);
    }
  });
}, []);

  //generates new id's for items
  const [nextItemID, setNextItemID] = useState(3);

  //handler for add item button
  const addItem = async (item) => {
  const itemsRef = ref(db, 'items');
  const newItemRef = push(itemsRef);

  const newItemData = {
    name: item.name,
    price: parseFloat(item.price),
    quantity: Number(item.quantity)
  };

  await update(newItemRef, newItemData);
  
  setItems(prev => [...prev, { id: newItemRef.key, ...newItemData }]);
};

  //handler for purchased button
  const markPurchased = async (id, amount, personId) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const totalCost = parseFloat(item.price) * Number(amount);
    const newQuantity = item.quantity-amount;
    const itemRef = ref(db, 'items/'+id);

    if(newQuantity <= 0) {
      await update(ref(db, 'items'), {[id]:null});
    }
    else {
      await update(itemRef, {quantity: newQuantity});
    }

    // update items
    setItems(prevItems =>
      prevItems
        .map(i =>
          i.id === id
            ? { ...i, quantity: i.quantity - amount }
            : i
        )
        .filter(i => i.quantity > 0)
    );

    const userRef = ref(db, 'users/' + personId);
    const snapshot = await get(userRef);

    if(snapshot.exists()) {
      const currentTotal = Number(snapshot.val().total) || 0;
      const newTotal = currentTotal + totalCost;
      
      await update(userRef, {
        total: newTotal
      })
    }

    // update people
    setPeople(prevPeople =>
      prevPeople.map(person =>
        person.id === personId
          ? { ...person, total: (Number(person.total) || 0) + totalCost }
          : person
      )
    );
};

  //function to delete from list of items
  const deleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  //sort people function
  const sortedPeople = [...people]
    .filter(person => {
      const isActive = person.active !== false && String(person.active) !== "false";
      const matchesSearch = person.name?.toLowerCase().startsWith(personSearch.toLowerCase());
      return isActive && matchesSearch;
    })
    .sort((a,b) => {
      if(sortType === "min") return a.total-b.total;
      if(sortType === "max") return b.total-a.total;
      return 0;
    });

  //sort items function
  const sortedItems = [...items]
    .filter(item =>
      item.name.toLowerCase().startsWith(itemSearch.toLowerCase())
    )
    .sort((a, b) => {
      if(itemSortType === "min") return a.price-b.price;
      if(itemSortType === "max") return b.price-a.price;
      return 0;
    });

  return (

    <>
      {/*Entire Page div, used to set background color easily*/}
      <div style={{ backgroundColor: "var(--bg-color)" }}>



        {/*Upper half of main page div*/}
        <div style={{ textAlign: "left" }}>
          {/*Displays text "Person: Total Spent"*/}
          <p style={{ fontSize: '48px', fontWeight: "bold", color: "var(--text-color)", WebkitTextStroke: "2px var(--text-outline)",
             marginBottom: '10px',  }}>
            Person: Total Spent
          </p>
          {/*Div for search bar and filter button*/}
          <div style={{ marginTop: "15px", marginBottom: "10px" }}>
            <input
              type="text" placeholder="Search..."
              value={personSearch}
              onChange={(e) => setPersonSearch(e.target.value)}
              style={{ fontSize: "19px", backgroundColor: "white", color: "black", border: "1px solid black" }} 
            />
            <button onClick={()=>setShowSort(true)} style={{ fontSize: "13px", backgroundColor: 'white', color: 'black', border: "1px solid black", marginLeft: "10px" }}>
              Filter
            </button>
            {/*Pop up filter person*/}
            {showSort && (
              <SortPeople
                setSortType={setSortType}
                closePopup={()=>setShowSort(false)}
              />
            )}
          </div>
          {/*Div that displays names with money spent in format Name: $*/}
          <div style={{ border: "2px solid black", padding: "15px", width: "367px", backgroundColor: "var(--table-color)", marginBottom: "15px" }}>
            {/*Div that displays the entire array of people*/}
            <div>
              {sortedPeople.map(person => (
                <p key={person.id} style={{fontSize: "28px"}}>
                  {person.name?.includes('@') ? person.name.split('@')[0] : person.name}: ${person.total?.toFixed(2) || "0.00"}
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
            <button onClick={() => setShowEditPerson(true)} style={{ backgroundColor: 'black', color: 'white' }}>
              Edit Name
            </button>
            {/*Pop up edit person*/}
            {showEditPerson && (
              <EditPerson
                people={people}
                setPeople={setPeople}
                closePopup={() => setShowEditPerson(false)}
              />
            )}
          </div>

        </div>





        {/*Lower half of page div (list of items to buy)*/}
        <div style={{ textAlign: "left", marginTop: "50px" }}>
          {/*Div for title text and 'add item' button*/}
          <div>
            <span style={{ fontSize: "54px", fontWeight: "bold", WebkitTextStroke: "2px var(--text-outline)", marginRight: "20px", 
              color: "var(--text-color)", marginBottom: '10px' }}>
              Items to Buy:
            </span>
            <button onClick={() => setShowAddItem(true)} style={{ backgroundColor: "black", color: "lightblue" }}>
              +
            </button>
            {showAddItem && (<AddItem addItem={addItem} closePopup={() => setShowAddItem(false)} />)}
          </div>

          {/*Div for search bar and filter button*/}
          <div style={{ marginTop: "15px", marginBottom: "10px" }}>
            <input type="text" placeholder="Search..." value={itemSearch} 
              onChange={(e) => setItemSearch(e.target.value)} style={{ fontSize: "19px", backgroundColor: "white", color:"black", border: "1px solid black" }} />
            <button onClick={() => setShowItemSort(true)} 
              style={{ fontSize: "13px", backgroundColor: 'white', color: 'black', border: "1px solid black", marginLeft: "10px" }}>
              Filter
            </button>
              {showItemSort && (
                <SortItems
                  setItemSortType={setItemSortType}
                  closeSortPopup={() => setShowItemSort(false)}
                />
              )}
          </div>

          {/*Div for list of items*/}
          <div style={{ border: "2px solid black", padding: "15px", backgroundColor: "var(--table-color)", width: "367px", marginBottom: "15px" }}>
            {sortedItems.map(item => (
              <p key={item.id} style={{ fontSize: "28px", color: "var(--text-color)" }}>
                {item.name}: ${item.price}

                {/*mark as purchased button*/}
                <button onClick={() => { setSelectedItem(item); setShowPurchased(true); }} style={{ float: "right", fontSize: "8px", 
                  backgroundColor: "var(--bg-color)", color: "var(--text-color)", border: "1px solid black", marginLeft: "3px" }}>
                  Purchased
                </button>

                {/*quantity input*/}
                <input type="number" value={item.quantity} min="1" max="99" step="1" style={{ width: "30px", backgroundColor: "var(--bg-invert)", 
                  color: "var(--text-invert)", fontWeight: "bold", float: "right" }} />

                {/*delete button*/}
                <button onClick={() => deleteItem(item.id)} style={{ float: "right", fontWeight: "bold", fontSize: "8px", 
                  backgroundColor: "var(--bg-color)", color: "var(--text-color)", border: "1px solid black", marginRight: "3px" }}>
                  Delete
                </button>
              </p>
            ))}
          </div>
          {showPurchased && selectedItem && (<Purchased 
            item={selectedItem} 
            markPurchased={markPurchased} 
            closePopup={() => setShowPurchased(false)} 
            people={people}
            setPeople={setPeople}
          />)}
        </div>

        {/* Routing button container div*/}
        <div style={{ display: "flex", gap: "7px" }}>

          {/*Transaction Page button*/}
          <button
            onClick={() => navigate("/transaction")}
            style={{
              marginTop: "20px",
              padding: "8px 16px",
              backgroundColor: "navy",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Transactions
          </button>


          {/*Logout button*/}
          <button
            onClick={handleLogout}
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

      </div>
    </>
  );
}

export default MainPage;