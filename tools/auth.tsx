import Router, { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { checkCookies } from "../store/actions/auth"
import { verify } from "../store/actions/admin"

const Auth: any = (props: any) => {
    const { asPath, pathname } = useRouter()

	Auth.propTypes = {
		checkCookies: PropTypes.func.isRequired,
        verify: PropTypes.func.isRequired,
        cookies_checked: PropTypes.bool,
        is_admin: PropTypes.bool
    }

    useEffect(() => {
        if (!props.cookies_checked) {
            props.checkCookies()
        }
    }, [])

    useEffect(() => {
        if (pathname.includes('secrets') && !pathname.includes('door')) {
            props.verify()
        }
    }, [pathname])

	return (
		<div className=''>
			{props.children}
		</div>
	)
}

const mapStateToProps = (state: any) => ({
    cookies_checked: state.auth.cookies_checked,
    is_admin: state.admin.is_admin
})

export default connect(mapStateToProps, { checkCookies, verify })(Auth)
