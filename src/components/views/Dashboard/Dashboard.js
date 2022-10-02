import { useQuery } from "@apollo/client";
import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { DELETE_USER, GET_USERS } from "../../../Graphql/queries";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loadder from "../../ui/Loadder";

const theme = createTheme();

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [deleteFunction, { dataDeleted, loadingDeleted, errorDeleted }] =
    useMutation(DELETE_USER, {
      refetchQueries: [{ query: GET_USERS }],
    });
  let navigate = useNavigate();
  if (loading) return <Loadder />;
  if (error) return `Error! ${error.message}`;

  const handleDeleteUser = (id) => {
    deleteFunction({
      variables: {
        id,
      },
    })
      .then((res) => {
        console.log(res.data);
        toast.success("Usuario eliminado", {
          position: "top-center",
        });
      })
      .catch((e) => {
        toast.error(e.message, {
          position: "top-center",
        });
      });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          sx={{
            backgroundColor: "#e3e3e3",
          }}
        >
          <Box sx={{padding:"50px 10px"}}>
            <Stack spacing={2} direction="column">
              <Button variant="contained" color="primary">
                Usuarios
              </Button>
              <Button variant="contained" color="primary">
                Ventas
              </Button>
              <Button
                onClick={() => logout()}
                variant="contained"
                color="error"
              >
                Cerrar Sesión
              </Button>
              <strong>Deberia cargar todos los datos, sino da f5</strong>
            </Stack>
          </Box>
        </Grid>

        <Grid
          item
          sm={12}
          md={10}
          sx={{
            padding: "50px",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Orden</TableCell>
                  <TableCell align="center">Nombres</TableCell>
                  <TableCell align="center">Apellidos</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Fecha de creacion</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.users.map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{user.names}</TableCell>
                    <TableCell align="center">{user.surnames}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.createdAt}</TableCell>
                    <TableCell align="center">
                      <Stack spacing={2} direction="row">
                        <Button
                          variant="contained"
                          startIcon={<VisibilityIcon />}
                          color="success"
                        >
                          Ver
                        </Button>
                        <Button variant="contained" endIcon={<EditIcon />}>
                          Editar
                        </Button>
                        <Button
                          onClick={() => handleDeleteUser(user.id)}
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          color="error"
                        >
                          Eliminar
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Dashboard;
