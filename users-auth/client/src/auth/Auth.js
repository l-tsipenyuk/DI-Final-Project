import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const Auth = (props) => {
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    verify();
  }, []);
  const verify = async () => {
    try {
      const response = await axios.get("/users/verify");
      if (response.status === 201) setRedirect(true);
    } catch (err) {
      console.log(err.response.data);
      setRedirect(false);
      navigate('/login')
    }
  };

  return redirect ? props.children : <h2>unauhurized user</h2>;
};

export default Auth;
