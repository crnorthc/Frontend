import type { NextPage } from "next"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Script from 'next/script'
import Image from "next/image"
import tokens from "../public/tokens"

// State Stuff
import { connect } from "react-redux"
import PropTypes from "prop-types"

const Home: NextPage = (props: any) => {
	Home.propTypes = {
		loadUser: PropTypes.func.isRequired,
		logged_in: PropTypes.bool,
		is_admin: PropTypes.bool,
	}
	return (
		<div>
			<Head>
				<title>Vapur</title>
				<link rel="icon" type="image/svg" href="/vapur.svg" />
			</Head>
			<div className="tokenCont"></div>
			<main>
				<div className="relative w-full h-screen bg-dark overflow-hidden">
					<div className="fixed w-full z-20 l-0">
						<div
							className="
							
							relative
							p-5
							items-center
							justify-between
							"
						>
							<div>
								<img className="p-2 w-28 hidden sm:block" src="/FinalLogo.svg" alt="" />
								<img className="p-2 w-28 sm:hidden" src="/FinalLogo.svg" alt="" />
							</div>
						</div>
					</div>
					<div className="container">
						<div className="flex items-center justify-center h-screen w-full">
							<div
								className="
							grid grid-cols-12 gap-0
							w-full
						
							"
							>
								<div className="col-span-12 lg:col-span-5 flex justify-center items-center">
									<div className="w-40 sm:w-64 lg:w-96 block pb-0 sm:pb-5 lg:pb-0">
										<Image className="z-10" height={400} width={400} layout="responsive" src="/glow-vapur-token.svg" alt="" />
									</div>
								</div>

								<div className="col-span-12 lg:col-span-7 flex flex-col justify-center items-center">
									<h1 className="text-light text-3xl sm:text-5xl text-center z-10 px-4 glory">May The Best Investor Win!</h1>
									<div className="flex flex-col justify-center items-center pt-5 sm:pt-16">
										<Link href="/signup">
											<a className="z-10 w-60 sm:w-96 p-2 mb-4 bg-primary rounded-2xl text-light  text-center text-xl sm:text-3xl glory transition duration-100 ease-in-out transform hover:scale-105 signup-shadow">Get Started</a>
										</Link>
										<Link href="/login">
											<a className="z-10 w-60 sm:w-96 p-2 bg-secondary rounded-2xl text-light text-center text-xl sm:text-3xl  glory transition duration-100 ease-in-out transform hover:scale-105 login-shadow">I Already Have an Account</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div
						className="
							absolute
							w-full
							h-screen
							bottom-0
							left-0
							flex
							items-center
							justify-evenly
							"
					>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen"></div>

						<div className="z-0 bg-medium opacity-30 chart-width h-screen hidden sm:block"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen hidden sm:block"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen hidden sm:block"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen hidden sm:block"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen hidden sm:block"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen hidden sm:block"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen hidden sm:block"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen hidden sm:block"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen hidden sm:block"></div>
						<div className="z-0 bg-medium opacity-30 chart-width h-screen hidden sm:block"></div>
					</div>

					<div
						className="
							moving-chart
							absolute
							w-full
							h-screen
							bottom-0
							left-0
							flex flex-col
							items-center
							justify-between
							"
					>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
						<div className="z-0 bg-medium opacity-30 w-full chart-height"></div>
					</div>

					<section>
						<div className="ocean"></div>
						<div className="ocean-front"></div>
						<div className="wave wave1"></div>
						<div className="wave wave2"></div>
						<div className="wave wave3"></div>
						<div className="wave wave4"></div>
						<div className="low-1"></div>
						<div className="low-2"></div>
						<div className="low-3"></div>
					</section>
				</div>
			</main>
                <Script src={tokens} strategy='lazyOnload'/>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	logged_in: state.auth.logged_in,
	is_admin: state.admin.is_admin,
})

export default connect(mapStateToProps)(Home)
