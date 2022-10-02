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
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks/useForm";
import { BootstrapButton } from "../../../ui/ButtonCustom";
import { LOGIN } from "../../../../Graphql/queries";

import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [loginFunction, { data, loading, error }] = useMutation(LOGIN);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { isVerified } = useSelector((state) => state.auth);

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "efrain@gmail.com",
    lPassword: "123456",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { lEmail, lPassword } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();

    // dispatch(startLogin(lEmail, lPassword));
    // navigate('/dashboard', { replace: true });
    loginFunction({ variables: { email: lEmail, pwd: lPassword } })
      .then((res) => {
        localStorage.setItem("user_logged", true);
        localStorage.setItem("token", res.data.login.access_token);
        localStorage.setItem("token-init-date", new Date().getTime());

        // TODO: Service to consult if user is verified
        toast.success("Usuario correcto!", {
          position: "top-center",
        });
        navigate("/dashboard", { replace: true });
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
