import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AddPerson({ people, setPeople }) {

  const navigate = useNavigate();

  //Keeps track if effect has ran
  const ran = useRef(false);

  //Adds a new person when loads
  useEffect(() => {

    //If effect has ran skip
    if(ran.current == true) {
      return;
    }
    else {
      ran.current = true;
    }

    //Creates person object
    const newPerson = {
      //? states return even if undefined to prevent app from crashing
      id: people.length > 0 ? people[people.length - 1].id + 1 : 0,
      name: "Carter3",
      total: 2.56
    };

    //... copies array values so array = array + newObject
    setPeople(prev => [...prev, newPerson]);

    navigate("/main");

  }, []);

  return null;
}

export default AddPerson;