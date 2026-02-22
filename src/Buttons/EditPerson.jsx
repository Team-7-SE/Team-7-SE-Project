import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditPerson() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/main");
    }, []);

    return null;
}

export default EditPerson;