import type { NextPage } from "next"
import Head from "next/head"
import Link from 'next/link'
import React, { useState } from "react"

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { login, loadUser } from "../store/actions/auth"

const Admin: NextPage = (props: any) => {

	Admin.propTypes = {
		loadUser: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,
		logged_in: PropTypes.bool
    }

	return (
		<div>
			<Head>
				<title>Admin</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='bg-medium'>
				<div className='px-50 flex flex-row justify-between items-center'>
					<button>
						Create Game
					</button>
					<button>
						View Games
					</button>
				</div>
			</main>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	logged_in: state.auth.logged_in
})

export default connect(mapStateToProps, { login, loadUser })(Admin)
