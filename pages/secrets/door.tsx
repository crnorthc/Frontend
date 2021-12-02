import type { NextPage } from "next"
import Head from "next/head"
import Link from 'next/link'
import React, { useState } from "react"

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { login } from "../../store/actions/admin"
import Router from "next/router"

const Admin: NextPage = (props: any) => {
	const [email, setEmail] = useState("");
 	const [password, setPassword] = useState("");

	Admin.propTypes = {
        login: PropTypes.func.isRequired,
		is_admin: PropTypes.bool
    }

	const handleSubmit = () => {
		props.login(email, password)
	}

	if (props.is_admin) {
		Router.push('/secrets/dashboard')
	}

	return (
		<div className='pageCont'>
			<Head>
				<title>Admin</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='bg-medium flex flex-col justify-center items-center h-full'>
				<div className="text-center">
					<h1 className='text-light text-4xl'>
						Welcome to the Admin Page!
					</h1>
					<h1 className='text-light text-1xl'>
						If you're not an admin, I'll eat your kids.
					</h1>
				</div>				
				<div className='bg-medium w-1/3 mt-20 rounded-2xl px-6 py-4 sm:py-8 shadow-md text-black bg-dark medium-shadow-big'>
					<form>
						<input
						type='text'
						className='block border border-grey-light mt-4 w-full p-3 rounded mb-4 poppins'
						value={email}
						autoComplete='username email'
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Vapur Email'
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
					</div>
				<button
					onClick={() => handleSubmit()}
					type='submit'
					className='transition-colors w-1/3 duration-100 mt-10 text-center py-3 rounded-2xl bg-secondary text-xl text-light hover:bg-secondaryLight focus:outline-none my-1 poppins'
					>
				Login
				</button>
			</main>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	is_admin: state.admin.is_admin
})

export default connect(mapStateToProps, { login })(Admin)
