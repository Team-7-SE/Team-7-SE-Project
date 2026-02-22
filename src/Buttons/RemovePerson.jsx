import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RemovePerson() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/main");
    }, []);

    return null;
}

export default RemovePerson;