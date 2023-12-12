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

    const base_url = process.env.REACT_APP_BASE_URL

    const loginregister = async () => {
        if (props.title === "Register") {
            try {
                const response = await axios.post(`${base_url}/api/users/register`, {
                    // const response = await axios.post("api/users/register", {
                    email,
                    password,
                });
                if (response.status === 200) {
                    setMsg("");
                    // navigate("/homepage2");
                    navigate("/login");
                }
            } catch (err) {
                console.log(err);
                setMsg(err.response.data.msg);
            }
        } else {
            try {
                const response = await axios.post(`${base_url}/api/users/login`, {
                    // const response = await axios.post("api/users/login", {
                    email,
                    password,
                });
                if (response.status === 200) {
                    console.log(response.data.accesstoken);

                    // -----------------------without refresh token
                    // setToken(response.data.accesstoken);
                    // -----------------------

                    // -----------------------with refresh token
                    localStorage.setItem('accesstoken', response.data.accesstoken);
                    localStorage.setItem('user_id', response.data.user_id);

                    setMsg("");
                    navigate("/homepage2");
                    // navigate("/");
                }
            } catch (err) {
                setMsg(err.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h2>Please authorize to access your account</h2>
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
            <Button variant='contained' onClick={loginregister} style={{ backgroundColor: '#3C2607', color: 'white' }}>
                {props.title}
            </Button>
            <div>{msg}</div>
        </div>
    );
};

export default LoginRegister;