import type { NextPage } from "next"
import Head from "next/head"
import Router from "next/router"
import React, { useState } from "react"

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { loadUser } from "../store/actions/auth"

const Home: NextPage = (props: any) => {

	Home.propTypes = {
		loadUser: PropTypes.func.isRequired,
		logged_in: PropTypes.bool,
		is_admin: PropTypes.bool
    }


	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div className="tokenCont"></div>								
				<div className="fixed w-full z-20">
					<div
						className="
							home-nav
							relative
							p-5
							flex flex-col
							sm:flex-row
							items-center
							justify-between
							"
					>
						
						<div>
							<img className="w-20 hidden sm:block" src="/FinalLogo.svg" alt="" />
							<img className="w-20 sm:hidden" src="/FinalLogo.svg" alt="" />
						</div>
						<div className="space-x-1 sm:space-x-4 text-sm pt-2 sm:pt-0 sm:text-xl text-light">
						{props.logged_in ? 
							props.is_admin ?
								<button className="transition-colors duration-100 hover:text-primary glory" onClick={() => Router.push("/admin")}>
									Admin
								</button>
								:
								<button className="transition-colors duration-100 hover:text-primary glory" onClick={() => Router.push("/signup")}>
									Profile
								</button>
							:
							<div>
								<button className="transition-colors duration-100 hover:text-primary glory" onClick={() => Router.push('/signup')}>
									Signup
								</button>
								<button className="transition-colors duration-100 hover:text-primary glory" onClick={() => Router.push('/login')}>
									Login
								</button>
							</div>
						}							
						</div>
					</div>
				</div>
				<div className="showcase">
					<div
						className="
							flex
							items-center
							justify-center
							flex-col
							h-screen
							p-2
							space-y-3
							sm:space-y-6
							"
					>
						<h1 className="text-light text-5xl sm:text-8xl text-center z-10 px-4 glory">
							May The Best
							<br />
							Investor Win!
						</h1>
						<p
							className="
								text-light
								poppins
								text-md
								sm:text-2xl
								text-center
								max-w-3xl
								z-10
								px-4
								"
						>
							Vapur is the fantasy football of the stock and crypto markets. Players compete in wagered tournaments by predicting which stocks and cryptocurrencies will perform the best in an allotted amount of time.
						</p>
						<div className="flex items-center justify-end pt-0 z-10 space-x-5 sm:space-x-10">
							<a
								className="
									w-7
									sm:w-10
									h-7
									sm:h-10
									transition
									duration-150
									ease-in-out
									transform
									hover:scale-125
									"
								href="https://t.me/joinchat/haNcc0MiOx4zMDNh"
								target="_blank"
							>
								<img src="/001-telegram.svg" alt="" />
							</a>
							<a
								className="
									w-7
									sm:w-10
									h-7
									sm:h-10
									transition
									duration-150
									ease-in-out
									transform
									hover:scale-125
									"
								href="https://www.instagram.com/vapurofficial/"
								target="_blank"
							>
								<img src="/002-instagram.svg" alt="" />
							</a>

							<a
								className="
									w-7
									sm:w-10
									h-7
									sm:h-10
									transition
									duration-150
									ease-in-out
									transform
									hover:scale-125
									"
								href="https://twitter.com/VapurOfficial"
								target="_blank"
							>
								<img src="/004-twitter.svg" alt="" />
							</a>
							<a
								className="
									w-7
									sm:w-10
									h-7
									sm:h-10
									transition
									duration-150
									ease-in-out
									transform
									hover:scale-125
									"
								href="https://www.linkedin.com/company/vapur"
								target="_blank"
							>
								<img src="/005-linkedin.svg" alt="" />
							</a>
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
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	logged_in: state.auth.logged_in,
	is_admin: state.admin.is_admin
})

export default connect(mapStateToProps, { loadUser })(Home)
