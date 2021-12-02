import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import Router, { useRouter } from "next/router"
import React, { useState } from "react"

// State Stuff
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { logout } from "../store/actions/auth"
import router from "next/router"

const Nav: any = (props: any) => {
	const { asPath, pathname } = useRouter()

	Nav.propTypes = {
		logout: PropTypes.func.isRequired,
		logged_in: PropTypes.bool,
		is_admin: PropTypes.bool,
	}

	const handleLogout = () => {
		router.push('/')
		props.logout()		
	}

	if (pathname == "/") {
		return <div />
	}
	return (
		<div className="fixed z-50 w-full">
			<div className="bg-black relative px-8 flex sm:flex-row items-center justify-between">
				<div className='-mb-2'>
					<Image width={100} height={60} className="w-20 hidden sm:block" src="/FinalLogo.svg" alt="" />
				</div>
				<div className="flex flex-row justify-end w-full">
					{props.logged_in ? 
						<div className="flex items-center justify-end flex-row w-1/3">
							<Link href="/dashboard">
								<a className="text-light font-extralight text-lg">Dashboard</a>
							</Link>
							<Link href="/games">
								<a className="text-light font-extralight mx-10 text-lg">Games</a>
							</Link>
							<Link href='/profile'>
								<Image width={30} height={30} className="cursor-pointer" src='/ProfileIcon.svg' />
							</Link>
							<div className="ml-2">
								<Image width={15} height={15} className="cursor-pointer" src='/navDown.svg' />
							</div>							
						</div>
					:
						<div>
							<Link href="/signup">
								<a className="px-2 transition-colors duration-100 hover:text-primary glory">Signup</a>
							</Link>

							<Link href="/login">
								<a className="px-2 transition-colors duration-100 hover:text-primary glory">Login</a>
							</Link>
						</div>
					}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	logged_in: state.auth.logged_in,
	is_admin: state.admin.is_admin,
})

export default connect(mapStateToProps, { logout })(Nav)
