import type { NextPage } from "next"
import Head from "next/head"
import Router, { useRouter } from "next/router"
import React, { useState } from "react"

// State Stuff
import { connect } from "react-redux"
import PropTypes from "prop-types"

const Nav: any = (props: any) => {
    const {asPath, pathname} = useRouter()

	Nav.propTypes = {
		logged_in: PropTypes.bool,
        is_admin: PropTypes.bool
	}

    

    if (pathname == '/') {
        return <div/>
    }
	return (
		<div
			className="bg-dark relative p-5 flex flex-col sm:flex-row items-center justify-between">
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
                <button className="transition-colors duration-100 hover:text-primary glory" onClick={() => Router.push("/signup")}>
					Signup
				</button>
				<button className="transition-colors duration-100 hover:text-primary glory" onClick={() => Router.push("/login")}>
					Login
				</button>
            </div>
        }				
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	logged_in: state.auth.logged_in,
    is_admin: state.admin.is_admin
})

export default connect(mapStateToProps, {  })(Nav)
