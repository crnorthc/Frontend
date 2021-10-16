import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import React, { useState } from "react"

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { createUser } from "../store/actions/auth"

const Login: NextPage = (props: any) => {
	const [first_name, setfirstName] = useState("")
	const [last_name, setlastName] = useState("")
	const [username, setUsername] = useState("")
	const [phone, setPhone] = useState("")
	const [password, setPassword] = useState("")
	const [confirm, setConfirm] = useState("")

	Login.propTypes = {
        createUser: PropTypes.func.isRequired,
    }

	const handleSubmit = () => {
		if (password !== confirm) {
			alert('passwords must match!')
		}
		const info = {first_name, last_name, password, phone, username}

		props.createUser(info)
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

const mapStateToProps = () => ({})

export default connect(mapStateToProps, { createUser })(Login)
