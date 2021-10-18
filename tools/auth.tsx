import type { NextPage } from "next"
import Head from "next/head"
import Router from "next/router"
import React, { useEffect, useState } from "react"

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { checkCookies } from "../store/actions/auth"

const Auth: any = (props: any) => {


	Auth.propTypes = {
		checkCookies: PropTypes.func.isRequired,
        cookies_checked: PropTypes.bool
    }

    useEffect(() => {
        if (!props.cookies_checked) {
            props.checkCookies()
        }
    }, [])


	return (
		<div>
			{props.children}
		</div>
	)
}

const mapStateToProps = (state: any) => ({
    cookies_checked: state.auth.cookies_checked
})

export default connect(mapStateToProps, { checkCookies })(Auth)
