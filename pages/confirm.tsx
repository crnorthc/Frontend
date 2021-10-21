import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import React, { useState, useEffect } from "react";
import ReactCodeInput from "react-verification-code-input";

// State Stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendText, confirmPhone } from "../store/actions/auth";

const Confirm: NextPage = (props: any) => {
 const [time, setTime] = useState(60);
 const [resend, setResend] = useState(false);

 useEffect(() => {
  const intervalId = setInterval(() => {
   if (time == 0) {
    setResend(true);
   }
   setTime(time - 1);
  }, 1000);
  return () => clearInterval(intervalId);
 }, [time]);

 useEffect(() => {
  if (!props.sent_text) {
   props.sendText(props.phone);
  }
 });

 Confirm.propTypes = {
  sendText: PropTypes.func.isRequired,
  confirmPhone: PropTypes.func.isRequired,
  phone: PropTypes.string,
  sent_text: PropTypes.bool,
  confirmed_code: PropTypes.bool,
 };

 if (props.confirmed_code) {
  Router.push("/login");
 }

 return (
  <div>
   <Head>
    <title>Confirm</title>
    <link rel='icon' href='/favicon.ico' />
   </Head>

   <main className='h-screen text-light bg-dark glory flex flex-col items-center justify-center'>
    <div className='bg-medium rounded-2xl medium-shadow-big py-4 p-5 sm:p-10'>
     <div className='py-8 flex flex-col items-center justify-between text-center'>
      <h1 className='text-3xl font-bold mb-4'>Confirm Phone</h1>
      <ReactCodeInput
       className='poppins mb-4'
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
         <span className='text-xl poppins '>Resend</span>
        ) : (
         <span className='text-xl poppins'>Resend in ({time}) secs</span>
        )}
        <i className='bx bx-caret-right ml-1'></i>
       </a>{" "}
      </div>
     </div>
    </div>
   </main>
  </div>
 );
};

const mapStateToProps = (state: any) => ({
 phone: state.user.phone,
 sent_text: state.auth.sent_text,
 confirmed_code: state.auth.confirmed_code,
});

export default connect(mapStateToProps, { sendText, confirmPhone })(Confirm);
