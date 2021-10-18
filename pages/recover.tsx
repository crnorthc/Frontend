import type { NextPage } from "next"
import Head from "next/head"
import Router from "next/router"
import React, { useState, useEffect } from "react"
import ReactCodeInput from "react-verification-code-input"

// State Stuff
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { recoverPhone, confirmPhone, changePassword } from "../store/actions/auth"

const Recover: NextPage = (props: any) => {
	const [time, setTime] = useState(60)
	const [resend, setResend] = useState(false)
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState("")
	const [confirm, setConfirm] = useState("")

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (time == 0) {
				setResend(true)
			}
			setTime(time - 1)
		}, 1000)
		return () => clearInterval(intervalId)
	}, [time])
    
    const handleSubmit = () => {
		if (password !== confirm) {
			alert('passwords must match!')
		}		

		props.changePassword(password, phone)
	}

    if (props.password_changed) {
        Router.push('/login')
    }

	Recover.propTypes = {
		confirmPhone: PropTypes.func.isRequired,
		recoverPhone: PropTypes.func.isRequired,
        changePassword: PropTypes.func.isRequired,
		phone: PropTypes.string,
		sent_text: PropTypes.bool,
		confirmed_code: PropTypes.bool,
        password_changed: PropTypes.bool
	}

    const enter_phone = (
        <div className="bg-medium rounded py-4 px-10">
					<div className="py-8 flex flex-col items-center justify-between bg-white h-64 rounded text-center">
						<h1 className="text-3xl font-bold">Recover</h1>
						<input type="tel" className="block border border-grey-light w-full p-3 rounded mb-4" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone #" />
                        <button onClick={() => props.recoverPhone(phone)} type="submit" className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1">
                            Send Verification Code
                        </button>
					</div>
				</div>
    )

    const enter_code = (
        <div className="bg-medium rounded py-4 px-10">
					<div className="py-8 flex flex-col items-center justify-between bg-white h-64 rounded text-center">
						<h1 className="text-3xl font-bold">Recover</h1>
						<ReactCodeInput className="poppins" type="number" fields={6} onComplete={(e) => props.confirmPhone(e, props.phone)} />
						<div className="flex justify-center text-center">
							{" "}
							<a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
								{resend ? <span className="text-xl font-bold">Resend</span> : <span className="text-xl font-bold">Resend in ({time}) secs</span>}
								<i className="bx bx-caret-right ml-1"></i>
							</a>{" "}
						</div>
					</div>
				</div>
    )

    const new_password = (
        <div className="bg-medium rounded py-4 px-10">
        <div className="py-8 flex flex-col items-center justify-between bg-white h-64 rounded text-center">
            <h1 className="text-3xl font-bold">Recover</h1>
            <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
			<input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm Password" />
            <button onClick={() => handleSubmit()} type="submit" className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1">
                Change Password
            </button>
        </div>
    </div>
    )

	return (
		<div>
			<Head>
				<title>Recover</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="h-screen text-light bg-dark glory flex flex-col items-center justify-center">    
                {props.confirmed_code ? new_password : props.sent_text ? enter_code : enter_phone}        
			</main>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	phone: state.user.phone,
	sent_text: state.auth.sent_text,
	confirmed_code: state.auth.confirmed_code,
    password_changed: state.auth.password_changed
})

export default connect(mapStateToProps, { recoverPhone, confirmPhone, changePassword })(Recover)
