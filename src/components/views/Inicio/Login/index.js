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
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useForm } from "../../../../hooks/useForm";
import { BootstrapButton } from "../../../ui/ButtonCustom";
import { INCREMENT_COUNTER } from "../../../../Graphql/queries";

import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const Index = () => {
  const [mutateFunction, { data, loading, error }] =
    useMutation(INCREMENT_COUNTER);
  // const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "efrain@gmail.com",
    lPassword: "123456",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { lEmail, lPassword } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();

    // dispatch(startLogin(lEmail, lPassword));
    mutateFunction({ variables: { email: lEmail, pwd: lPassword } })
      .then((res) => {
        localStorage.setItem("user_logged", true);
        localStorage.setItem("token", res.data.login.access_token);
        localStorage.setItem("token-init-date", new Date().getTime());

        toast.success("Usuario correcto!", {
          position: "top-center",
        });
      })
      .catch((e) => {
        toast.error(e.message, {
          position: "top-center",
        });
      });

  };

  if (loading) return "Proccesando...";

  const handleClickShowPassword = () => {
    setShowPassword((e) => !e);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
        <FormControl sx={{ m: 1 }} fullWidth={true}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="lEmail"
            value={lEmail}
            onChange={handleLoginInputChange}
            autoComplete="email"
            autoFocus
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
            name="lPassword"
            value={lPassword}
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

        <Grid container>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar inicio de sesión"
            />
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            alignItems="center"
            justifyContent="end"
          >
            <Link href="#" variant="body2">
              Olvido la contraseña?
            </Link>
          </Grid>
        </Grid>

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
            Iniciar
          </BootstrapButton>
        </Box>
      </Box>
    </>
  );
};

export default Index;
