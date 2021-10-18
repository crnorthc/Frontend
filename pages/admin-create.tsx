import type { NextPage } from "next"
import Head from "next/head"
import Router from "next/router"
import React, { useState } from "react"

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { createAdmin } from "../store/actions/auth"

const Admin: NextPage = (props: any) => {
	const [first_name, setfirstName] = useState("")
	const [last_name, setlastName] = useState("")
	const [username, setUsername] = useState("")
	const [key, setKey] = useState("")
	const [password, setPassword] = useState("")
	const [confirm, setConfirm] = useState("")

	Admin.propTypes = {
        createAdmin: PropTypes.func.isRequired,
        created: PropTypes.bool
    }

	const handleSubmit = () => {
		if (password !== confirm) {
			alert('passwords must match!')
		}
		const info = {first_name, last_name, password, key, username}

		props.createAdmin(info)
	}

    if(props.created) {
        Router.push('/login')
    }

	return (
		<div>
			<Head>
				<title>Create Admin</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='flex flex-col items-center'>
				<div className="bg-grey-lighter min-h-screen flex flex-col w-1/2">
					<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-">
						<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
							<h1 className="mb-8 text-3xl text-center">Admin Signup</h1>
							<div className='flex flex-row justify-between w-full'>
								<input type="text" className="block border border-grey-light w-6/12 p-3 rounded mb-4" value={first_name} onChange={e => setfirstName(e.target.value)} placeholder="First Name" />
								<input type="text" className="block border border-grey-light w-6/12 p-3 rounded mb-4" value={last_name} onChange={e => setlastName(e.target.value)} placeholder="Last Name" />
							</div>			
							<input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />				

							<input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
							<input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm Password" />
                            <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" value={key} onChange={e => setKey(e.target.value)} placeholder="Admin Key" />

							<button onClick={() => handleSubmit()} type="submit" className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1">
								Create Account
							</button>
						</div>

						<div className="text-grey-dark mt-6 ">
							Already have an account?
							<a className="no-underline ml-2 border-b border-blue text-blue">
								Log in
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
    created: state.auth.created
})

export default connect(mapStateToProps, { createAdmin })(Admin)
