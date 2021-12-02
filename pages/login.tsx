import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import React, { useState } from "react";

// State Stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, loadUser } from "../store/actions/auth";

const Login: NextPage = (props: any) => {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [remember, setRemember] = useState(false);

 Login.propTypes = {
  loadUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logged_in: PropTypes.bool,
 };

 const handleSubmit = () => {
  props.login(username, password, remember);
 };

 if (props.logged_in) {
    Router.push("/games");
 }

 return (
  <div className='bg-dark'>
   <Head>
    <title>Login - Vapur</title>
    <link rel='icon' href='/favicon.ico' />
   </Head>

   <main className='container pt-16 pb-5 sm:pb-0 sm:py-0 h-screen flex items-center justify-center'>
    <div className='max-w-lg flex-1 flex flex-col items-center justify-center'>
     <div className='bg-medium rounded-2xl px-6 py-4 sm:py-8 shadow-md text-black w-full medium-shadow-big'>
      <h1 className='mb-8 text-4xl text-light text-center glory'>Login</h1>
      <form>
        <input
        type='text'
        className='block border border-grey-light w-full p-3 rounded mb-4 poppins'
        value={username}
        autoComplete='username'
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Username'
        />
        <input
        type='password'
        className='block border border-grey-light w-full p-3 rounded mb-4 poppins'
        value={password}
        autoComplete='password'
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        />
      </form>      
      <div className='flex pb-4 sm:pb-8 items-center'>
       <input
        type='checkbox'
        onChange={() => setRemember(!remember)}
        className='w-5 h-5 mr-2'
       />
       <span className='pt-1 text-lg text-light poppins'>Remember Me</span>
      </div>
      <button
       onClick={() => handleSubmit()}
       type='submit'
       className='transition-colors duration-100 w-full text-center py-3 rounded-2xl bg-secondary text-xl text-light hover:bg-secondaryLight focus:outline-none my-1 poppins'
      >
       Login
      </button>
     </div>

     <div className='text-light mt-6 '>
      Don&apos;t Have an Account?
      <Link href='/signup'>
       <a className='no-underline ml-2 border-b border-primary text-primary'>
        Signup
       </a>
      </Link>
      .
     </div>
     <div className='text-light mt-6 '>
      <Link href='/recover'>
       <a className='no-underline ml-2 border-b border-secondary text-secondary'>
        Forgot your Password?
       </a>
      </Link>
     </div>
    </div>
   </main>
  </div>
 );
};

const mapStateToProps = (state: any) => ({
 logged_in: state.auth.logged_in,
});

export default connect(mapStateToProps, { login, loadUser })(Login);
