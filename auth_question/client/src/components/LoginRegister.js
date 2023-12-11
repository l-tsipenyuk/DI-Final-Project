// import { useState, useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
// import { AppContext } from "../App";

const LoginRegister = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    // const { setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const base_url = process.env.REACT_APP_BASE_URL

    const loginregister = async () => {
        if (props.title === "Register") {
            try {
                const response = await axios.post(`${base_url}/api/users/register`, {
                    email,
                    password,
                });
                if (response.status === 200) {
                    setMsg("");
                    navigate("/login");
                }
            } catch (e) {
                console.log(e);
                setMsg(e.response.data.msg);
            }
        } else {
            try {
                const response = await axios.post(`${base_url}/api/users/login`, {
                    email,
                    password,
                });
                if (response.status === 200) {
                    console.log(response.data);
                    // setToken(response.data);
                    setMsg("");
                    navigate("/homepage2");
                }
            } catch (e) {
                setMsg(e.response.data.msg);
            }
        }
    };

    return(
        <div>
            <h3>Login/register</h3>
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