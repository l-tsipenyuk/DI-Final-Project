import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Auth = (props) => {

    const { id } = useParams();
    
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        verify();
    }, []);

    const verify = async () => {
        try {
            const res = await axios.get("/users/verify");
            if (res.status === 201) setRedirect(true);
        } catch (e) {
            console.log(e.res.data);
            setRedirect(false);
            navigate('/login');
        }
    };
    return redirect ? props.children : <h2>Unauthorized User</h2>;
};

export default Auth;