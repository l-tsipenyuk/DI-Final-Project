import jwt from "jsonwebtoken";

// jwt.sign()

const token = jwt.sign(
  { email: "zivuch@gmail.com", userid: 308 },
  "123#456%78()",
  {
    expiresIn: "60s",
  }
);

// console.log(token);

const newToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJeyJlbWFpbCI6InppdnVjaEBnbWFpbC5jb20iLCJ1c2VyaWQiOjMwOCwiaWF0IjoxNzAxMjQ1MDc3LCJleHAiOjE3MDEyNDUxMzd9.gmYbBOEfkhM1Bz-MprvobcYHKm-VvfIbz1JIfeg6jg4";

jwt.verify(token, "123#456%78(", (err, decoded) => {
  if (err) return console.log(err.message);

  console.log(decoded);
});
