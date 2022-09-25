import {styled} from "@mui/material";
import Button from "@mui/material/Button";

export const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: 'none',
  lineHeight: 1.5,
  backgroundColor: '#CDB188',
  borderColor: '#CDB188',
  '&:hover': {
    backgroundColor: '#9E896A',
    borderColor: '#9E896A',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#9E896A',
    borderColor: '#9E896A',
  },
  '&:focus': {
    // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});
