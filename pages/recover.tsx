import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ReactCodeInput from "react-verification-code-input";
import NumberFormat from "react-number-format";

// State Stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
 recoverPhone,
 confirmPhone,
 changePassword,
} from "../store/actions/auth";

const Recover: NextPage = (props: any) => {
 const [time, setTime] = useState(60);
 const [resend, setResend] = useState(false);
 const [phone, setPhone] = useState("");
 const [password, setPassword] = useState("");
 const [confirm, setConfirm] = useState("");
 const [isSeen, setIsSeen] = useState(false);

 useEffect(() => {
  const intervalId = setInterval(() => {
   if (time == 0) {
    setResend(true);
   }
   setTime(time - 1);
  }, 1000);
  return () => clearInterval(intervalId);
 }, [time]);

 const handleSubmit = () => {
  if (password !== confirm) {
   alert("passwords must match!");
  }

  props.changePassword(password, phone);
 };

 if (props.password_changed) {
  Router.push("/login");
 }

 Recover.propTypes = {
  confirmPhone: PropTypes.func.isRequired,
  recoverPhone: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  phone: PropTypes.string,
  sent_text: PropTypes.bool,
  confirmed_code: PropTypes.bool,
  password_changed: PropTypes.bool,
 };

 const enter_phone = (
  <div className='bg-medium medium-shadow-big rounded-2xl p-10'>
   <div className=' flex flex-col items-center justify-between bg-white rounded text-center text-light poppins'>
    <h1 className='text-3xl glory mb-4'>Recover</h1>
    <NumberFormat
     className='block border border-light text-dark w-full p-3 rounded mb-4'
     format='(###) ###-####'
     type='tel'
     placeholder='(###) ###-####'
     mask='_'
     value={phone}
     onChange={(e) => setPhone(e.target.value)}
    />

    <button
     onClick={() => props.recoverPhone(phone)}
     type='submit'
     className='transition-colors duration-100 w-full text-center py-3 rounded-2xl bg-secondary text-xl text-light hover:bg-secondaryLight focus:outline-none my-1'
    >
     Send Code
    </button>
   </div>
  </div>
 );

 const enter_code = (
  <div className='bg-medium medium-shadow-big rounded-2xl p-5 sm:p-10'>
   <div className=' flex flex-col items-center justify-between bg-white rounded text-center'>
    <h1 className='text-3xl font-bold mb-4'>Recover</h1>
    <ReactCodeInput
     className='mb-4'
     type='number'
     fields={6}
     fieldWidth={40}
     fieldHeight={40}
     onComplete={(e) => props.confirmPhone(e, props.phone)}
    />
    <div className='flex justify-center text-center'>
     {" "}
     <a className='flex items-center text-blue-700 hover:text-blue-900 cursor-pointer'>
      {resend ? (
       <span className='text-xl poppins'>Resend</span>
      ) : (
       <span className='text-xl poppins'>Resend in ({time}) secs</span>
      )}
      <i className='bx bx-caret-right ml-1'></i>
     </a>{" "}
    </div>
   </div>
  </div>
 );

 const new_password = (
  <div className='bg-medium medium-shadow-big rounded-2xl p-5 sm:p-10'>
   <div className=' flex flex-col items-center justify-between bg-white rounded text-center'>
    <h1 className='text-3xl font-bold mb-4'>Recover</h1>
    <div className='flex items-start justify-center '>
     <input
      type={isSeen ? "text" : "password"}
      className='inline-block border border-light text-dark w-full rounded-l mb-4 h-10 p-2 poppins'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder='Password'
     />{" "}
     <button
      className=' h-10 inline-block bg-light border rounded-r border-light flex items-center justify-center p-2'
      onClick={(e) => setIsSeen(!isSeen)}
     >
      <Image
       alt='eye'
       width={32}
       height={32}
       src={isSeen ? "/view.png" : "/hidden.png"}
      ></Image>
     </button>
    </div>

    <input
     type={isSeen ? "text" : "password"}
     className='block border border-light text-dark w-full p-2 h-10 rounded mb-4 poppins'
     value={confirm}
     onChange={(e) => setConfirm(e.target.value)}
     placeholder='Confirm Password'
    />
    <button
     onClick={() => handleSubmit()}
     type='submit'
     className='transition-colors duration-100 w-full text-center py-3 rounded-2xl bg-secondary text-xl text-light hover:bg-secondaryLight focus:outline-none my-1'
    >
     Change Password
    </button>
   </div>
  </div>
 );

 return (
  <div>
   <Head>
    <title>Recover</title>
    <link rel='icon' href='/favicon.ico' />
   </Head>

   <main className='h-screen text-light bg-dark glory flex flex-col items-center justify-center'>
    {props.confirmed_code
     ? new_password
     : props.sent_text
     ? new_password
     : new_password}
   </main>
  </div>
 );
};

const mapStateToProps = (state: any) => ({
 phone: state.user.phone,
 sent_text: state.auth.sent_text,
 confirmed_code: state.auth.confirmed_code,
 password_changed: state.auth.password_changed,
});

export default connect(mapStateToProps, {
 recoverPhone,
 confirmPhone,
 changePassword,
})(Recover);
