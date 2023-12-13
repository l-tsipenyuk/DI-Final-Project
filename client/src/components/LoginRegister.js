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
                    email,
                    password,
                });
                if (response.status === 200) {
                    setMsg("");
                    navigate("/login");
                }
            } catch (err) {
                console.log(err);
                setMsg(err.response.data.msg);
            }
        } else {
            try {
                const response = await axios.post(`${base_url}/api/users/login`, {
                    email,
                    password,
                });
                if (response.status === 200) {

                    localStorage.setItem('accesstoken', response.data.accesstoken);
                    localStorage.setItem('user_id', response.data.user_id);

                    setMsg("");
                    navigate("/homepage2");
                }
            } catch (err) {
                setMsg(err.response.data.msg);
            }
        }
    };

    return (
        <div>
            <div className="header">
                <h1>Welcome to the Anki App</h1>
                <h4 id="subheader">Add some cards and practice your knowledge!</h4>
            </div>
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