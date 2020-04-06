import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { compose } from 'redux';
import validator from 'validator'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useStyles from './sign-in.styles'

import { signInStartAsync } from '../../redux/user/user.actions'
import withSpinner from '../../components/with-spinner/with-spinner.component';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const SignInPage = ({ signIn }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [password, setPassword] = useState('')

  const onEmailChange = ({ target }) => {
    setEmail(target.value)
    setIsEmailValid(validator.isEmail(target.value))
  }

  const emailErrorMessage = {
    error: true,
    helperText: 'Invalid email'
  }

  const submitHandler = e => {
    e.preventDefault();
    signIn({ email, password });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler} >
          <TextField
            {...!isEmailValid && emailErrorMessage}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}

          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to='/signup' variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container >
  );
}

const mapStateToProps = ({ user }) => ({
  isLoading: user.isSigning
})

const mapDispatchToProps = dispatch => ({
  signIn: userInfo => dispatch(signInStartAsync(userInfo))
});

const SignInPageWithSpinner = compose(
  connect(mapStateToProps),
  withSpinner
)(SignInPage);


export default connect(mapStateToProps, mapDispatchToProps)(SignInPageWithSpinner)

