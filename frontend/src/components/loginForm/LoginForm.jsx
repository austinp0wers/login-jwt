import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";


const LoginForm = function ({ onChangeId, onChangePassword, login }) {
  return (
    <>
      <form
        method="POST"
        onSubmit={e => {
          e.preventDefault();
          login();
        }}
      >
        <Grid container justify="center">
          <Grid item>
            <Box mr={2}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="아이디 입력"
                onChange={e => onChangeId(e.target.value)}
              />
              <Box mt={1} />
              <TextField
                size="small"
                variant="outlined"
                placeholder="비밀번호 입력"
                type="password"
                onChange={e => onChangePassword(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
            >
              로그인
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>
        <Link to="./signup">
          <Typography component="span">Register</Typography>
        </Link>
      </div>
    </>
  );
};
export default React.memo(LoginForm);