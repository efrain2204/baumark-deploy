import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useForm } from "../../../../hooks/useForm";
import { BootstrapButton } from "../../../ui/ButtonCustom";
import { REGISTER } from "../../../../Graphql/queries";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Index = () => {

  const dispatch = useDispatch();
  const [registerFuntion, { data, loading, error }] = useMutation(REGISTER);
  let navigate = useNavigate();

  const [formLoginValues, handleLoginInputChange] = useForm({
    rEmail: "a@gmail.com",
    rNames: "test",
    rSurnames: "test sur",
    rBirthday: "1995-07-28",
    rPassword: "123456",
  });
  const { rEmail, rNames, rSurnames, rBirthday, rPassword } = formLoginValues;

  const handleRegister = (e) => {
    e.preventDefault();
    // dispatch(startRegister(rEmail,rNames,rSurnames, rPassword));
    registerFuntion({
      variables: {
        email: rEmail,
        names: rNames,
        surnames: rSurnames,
        password: rPassword,
        dateBirth: new Date(rBirthday),
      },
    })
      .then((res) => {
        console.log(res.data);
        toast.info("Verifique su email", {
          position: "top-center",
        });
        navigate("/login", { replace: true });
      })
      .catch((e) => {
        toast.error(e.message, {
          position: "top-center",
        });
      });
  };
  

  // Field password config
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((e) => !e);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
        <FormControl sx={{ m: 1 }} fullWidth={true}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            name="rEmail"
            value={rEmail}
            onChange={handleLoginInputChange}
            autoComplete="email"
            autoFocus
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} fullWidth={true}>
          <TextField
            fullWidth
            id="names"
            label="Nombres"
            name="rNames"
            value={rNames}
            onChange={handleLoginInputChange}
          />
        </FormControl>

        <FormControl sx={{ m: 1 }} fullWidth={true}>
          <TextField
            fullWidth
            id="surnames"
            label="Apellidos"
            name="rSurnames"
            value={rSurnames}
            onChange={handleLoginInputChange}
          />
        </FormControl>

        <FormControl sx={{ m: 1 }} fullWidth={true} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña
          </InputLabel>
          <OutlinedInput
            fullWidth
            label="Passsword"
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            name="rPassword"
            value={rPassword}
            onChange={handleLoginInputChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} fullWidth={true}>
          <TextField
            fullWidth
            id="dateBirth"
            type="date"
            name="rBirthday"
            value={rBirthday}
            onChange={handleLoginInputChange}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <BootstrapButton
            type="submit"
            variant="contained"
            sx={{ mt: 2, paddingX: 4 }}
          >
            Registrar
          </BootstrapButton>
        </Box>
      </Box>
    </>
  );
};

export default Index;
