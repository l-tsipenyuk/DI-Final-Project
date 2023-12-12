import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, TextField, Button } from "@mui/material";

import { AppContext } from "../App";

const LoginRegister = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const loginregister = async () => {
    if (props.title === "Register") {
      try {
        const response = await axios.post("/users/register", {
          email,
          password,
        });
        if (response.status === 200) {
          setMsg("");
          navigate("/login");
        }
      } catch (err) {
        // console.log(err);
        setMsg(err.response.data.msg);
      }
    } else {
      try {
        const response = await axios.post("/users/login", {
          email,
          password,
        });
        if (response.status === 200) {
          console.log(response.data);
          setToken(response.data)
          setMsg("");
          navigate("/");
        }
      } catch (err) {
        // console.log(err);
        setMsg(err.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete='off'>
        <TextField
          sx={{ m: 1 }}
          id='email'
          type='email'
          label='Enter Email'
          variant='outlined'
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          id='password'
          type='password'
          label='Enter Password'
          variant='outlined'
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button variant='contained' onClick={loginregister}>
        {props.title}
      </Button>
      <div>{msg}</div>
    </div>
  );
};
export default LoginRegister;
