import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import React, { useState } from "react";

// State Stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createUser } from "../store/actions/auth";
import auth from "../store/reducers/auth";

const SignUp: NextPage = (props: any) => {
 const [first_name, setfirstName] = useState("");
 const [last_name, setlastName] = useState("");
 const [username, setUsername] = useState("");
 const [phone, setPhone] = useState("");
 const [password, setPassword] = useState("");
 const [confirm, setConfirm] = useState("");

 SignUp.propTypes = {
  createUser: PropTypes.func.isRequired,
  created: PropTypes.bool,
 };

 const handleSubmit = () => {
  if (password !== confirm) {
   alert("passwords must match!");
  }
  const info = { first_name, last_name, password, phone, username };

  props.createUser(info);
 };

 if (props.created) {
  Router.push("/confirm");
 }

 return (
  <div className='bg-dark'>
   <Head>
    <title>Signup - Vapur</title>
    <link rel='icon' href='/favicon.ico' />
   </Head>

   <main className='container pt-16 pb-5 sm:pb-0 sm:py-0 h-screen flex items-center justify-center'>
    <div className='max-w-lg flex-1 flex flex-col items-center justify-center'>
     <div className='bg-medium rounded-2xl px-4 sm:px-6 py-4 sm:py-8 shadow-md text-black w-full medium-shadow-big poppins'>
      <h1 className='mb-4 sm:mb-8 text-3xl text-center text-light glory'>
       Sign up
      </h1>
      <div className='flex space-x-2 flex-row justify-between w-full'>
       <input
        type='text'
        className='block border border-light w-6/12 p-2 sm:p-3 rounded mb-2 sm:mb-4'
        value={first_name}
        onChange={(e) => setfirstName(e.target.value)}
        placeholder='First Name'
       />
       <input
        type='text'
        className='block border border-light w-6/12 p-2 sm:p-3 rounded mb-2 sm:mb-4'
        value={last_name}
        onChange={(e) => setlastName(e.target.value)}
        placeholder='Last Name'
       />
      </div>
      <input
       type='text'
       className='block border border-light w-full p-2 sm:p-3 rounded mb-2 sm:mb-4'
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       placeholder='Username'
      />
      <input
       type='tel'
       className='block border border-light w-full p-2 sm:p-3 rounded mb-2 sm:mb-4'
       value={phone}
       onChange={(e) => setPhone(e.target.value)}
       placeholder='Phone #'
      />

      <input
       type='password'
       className='block border border-light w-full p-2 sm:p-3 rounded mb-2 sm:mb-4'
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       placeholder='Password'
      />
      <input
       type='password'
       className='block border border-light w-full p-2 sm:p-3 rounded mb-2 sm:mb-4'
       value={confirm}
       onChange={(e) => setConfirm(e.target.value)}
       placeholder='Confirm Password'
      />

      <button
       onClick={() => handleSubmit()}
       type='submit'
       className='transition-colors duration-100 w-full text-center py-2 sm:py-3 rounded-2xl bg-primary text-xl text-light hover:bg-primaryLight focus:outline-none my-1'
      >
       Create Account
      </button>
     </div>

     <div className='text-light mt-4 sm:mt-6 '>
      Already have an account?
      <a className='no-underline ml-2 border-b border-secondary text-secondary'>
       Log in
      </a>
      .
     </div>
    </div>
   </main>
  </div>
 );
};

const mapStateToProps = (state: any) => ({
 created: state.auth.created,
});

export default connect(mapStateToProps, { createUser })(SignUp);
