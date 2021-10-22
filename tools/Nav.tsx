import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";

// State Stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Nav: any = (props: any) => {
 const { asPath, pathname } = useRouter();

 Nav.propTypes = {
  logged_in: PropTypes.bool,
  is_admin: PropTypes.bool,
 };

 if (pathname == "/") {
  return <div />;
 }
 return (
  <div className='fixed w-full'>
   <div className='bg-black relative px-2 flex sm:flex-row items-center justify-between'>
    <div>
     <Image
      width={100}
      height={60}
      className='w-20 hidden sm:block'
      src='/FinalLogo.svg'
      alt=''
     />
    </div>
    <div className='space-x-1 sm:space-x-4 text-xl text-light'>
     {props.logged_in ? (
      props.is_admin ? (
       <Link href='/admin'>
        <a className='p-2 transition-colors duration-100 hover:text-primary glory'>
         Admin
        </a>
       </Link>
      ) : (
       <Link href='/signup'>
        <a className='p-2 transition-colors duration-100 hover:text-primary glory'>
         Profile
        </a>
       </Link>
      )
     ) : (
      <div>
       <Link href='/signup'>
        <a className='px-2 transition-colors duration-100 hover:text-primary glory'>
         Signup
        </a>
       </Link>

       <Link href='/login'>
        <a className='px-2 transition-colors duration-100 hover:text-primary glory'>
         Login
        </a>
       </Link>
      </div>
     )}
    </div>
   </div>
  </div>
 );
};

const mapStateToProps = (state: any) => ({
 logged_in: state.auth.logged_in,
 is_admin: state.admin.is_admin,
});

export default connect(mapStateToProps, {})(Nav);
