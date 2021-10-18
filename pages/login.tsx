import type { NextPage } from "next"
import Head from "next/head"
import Router from "next/router"
import React, { useState } from "react"

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { login, loadUser } from "../store/actions/auth"

const Login: NextPage = (props: any) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [remember, setRemember] = useState(false)

	Login.propTypes = {
		loadUser: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,
		logged_in: PropTypes.bool
    }

	const handleSubmit = () => {
		props.login(username, password, remember)
	}

	if (props.logged_in) {
		Router.push('/')
	}

	return (
		<div>
			<Head>
				<title>Login</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='flex flex-col items-center'>
				<div className="bg-grey-lighter min-h-screen flex flex-col w-1/2">
					<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-">
						<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
							<h1 className="mb-8 text-3xl text-center">Login</h1>			
							<input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />				
							<input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
							<div className="flex pb-8 items-center">
								<input type="checkbox" onChange={() => setRemember(!remember)} className="w-5 h-5 mr-2"/>
								<span className="text-m text-gray-700">Remember Me</span>
							</div>
							<button onClick={() => handleSubmit()} type="submit" className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1">
								Login
							</button>
						</div>

						<div className="text-grey-dark mt-6 ">
							Don't Have an Account?
							<a className="no-underline ml-2 border-b border-blue text-blue">
								Signup
							</a>
							.
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	logged_in: state.auth.logged_in
})

export default connect(mapStateToProps, { login, loadUser })(Login)
