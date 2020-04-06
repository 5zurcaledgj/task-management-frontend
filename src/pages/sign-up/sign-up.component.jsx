import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { compose } from 'redux';
import validator from 'validator'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useStyles from './sign-up.styles'

import withSpinner from '../../components/with-spinner/with-spinner.component';
import { signUpStartAsync } from '../../redux/user/user.actions'

function Copyright() {
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


const SignUpPage = ({ signUp }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const onSubmitHandler = e => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordMatch) {
      return;
    }

    const { email, password, firstName, lastName } = formData
    signUp({
      email, password, name: `${firstName} ${lastName}`
    });
  }

  const onChangeHandler = e => {
    const { value, name } = e.target;

    if ('email' === name) {
      setIsEmailValid(validator.isEmail(value));
    }

    if ('confirmPassword' === name) {
      setIsPasswordMatch(formData.password === value);
    }

    if ('password' === name) {
      setIsPasswordMatch(formData.confirmPassword === value);
    }

    setFormData({ ...formData, [name]: value });
  };


  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
            </Typography>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...(!isEmailValid && { error: true, helperText: 'Invalid email' })}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...(!isPasswordMatch && { error: true, helperText: 'Password does not match' })}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...(!isPasswordMatch && { error: true, helperText: 'Password does not match' })}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={onChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
              </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to='/signin' variant="body2">
                Already have an account? Sign in
                  </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = ({ user }) => ({
  isLoading: user.isSigning
})

const mapDispatchToProps = dispatch => ({
  signUp: userInfo => dispatch(signUpStartAsync(userInfo))
});

const SignUpPageWithSpinner = compose(
  connect(mapStateToProps),
  withSpinner
)(SignUpPage);


export default connect(mapStateToProps, mapDispatchToProps)(SignUpPageWithSpinner)

