import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const base_url = process.env.REACT_APP_BASE_URL

const Auth = (props) => {
    
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        verify();
    }, []);

    const verify = async () => {
        try {
            // const response = await axios.get(`${base_url}/api/users/verify`);
            const response = await axios.get(`api/users/verify`);
            if (response.status === 201) setRedirect(true);
        } catch (err) {
            console.log(err.response.data);
            setRedirect(false);
            navigate('/login');
        }
    };
    return redirect ? props.children : <h2>Unauthorized User</h2>;
};

export default Auth;



