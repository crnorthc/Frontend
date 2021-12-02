import type { NextPage } from "next"
import Head from "next/head"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";
import Overview from '../../components/ProfileComponents/Overview'
import Wallet from '../../components/ProfileComponents/Wallet'
import Stats from '../../components/ProfileComponents/Stats'
import History from '../../components/ProfileComponents/History'

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import Router from "next/router"
import { getMyGames } from "../../store/actions/game"



const Profile: NextPage = (props: any) => {
    const [tab, setTab] = useState('overview')

	Profile.propTypes = {
        user: PropTypes.object
    }

    useEffect(() => {
        if (props.games == null) {
            props.getMyGames()
        }
    }, [])


    if (props.user == null) {
        return <Loader
            type="Circles"
            color="#00C2EF"
            height={50}
            width={50}
        />
    }

	return (
		<div className='pageCont'>
			<Head>
				<title>Admin</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='bg-medium flex flex-row justify-center items-start'>
                <div className="flex flex-col mt-20 justify-start w-2/5 bg-lightHover items-center rounded-md py-2 px-2">
                    <div className="w-3/4 rounded-full border-4 border-primary">
                        <Image width={100} height={100} layout='responsive' src='/profile.png'/> 
                    </div>                    
                    <div className="flex flex-col justify-between py-4 items-center">
                        <h1 className="text-light text-2xl">{props.user.first_name + ' ' + props.user.last_name}</h1>
                        <h1 className="text-lightmedium text-xl">@{props.user.username}</h1>
                    </div>     
                    <button className="w-full rounded-md bg-secondary py-2 text-lg text-light hover:bg-secondaryLight">Edit Profile</button>              
                </div>                
                <div className="flex mt-20 ml-8 flex-col mb-20 w-full">
                    <div className="flex flex-row w-full pr-40 justify-between border-b-2 border-lightHover items-center">
                        <button onClick={() => setTab('overview')} className={"text-lg text-primary px-2 pb-4 border-primary mb-px border-" + `${tab == 'overview' ? 'b-2 -mb-px' : ''}`}>Overview</button>
                        <button onClick={() => setTab('wallet')} className={"text-lg text-primary px-2 pb-4 border-primary mb-px border-" + `${tab == 'wallet' ? 'b-2 -mb-px' : ''}`}>Wallet</button>
                        <button onClick={() => setTab('stats')} className={"text-lg text-primary px-2 pb-4 border-primary mb-px border-" + `${tab == 'stats' ? 'b-2 -mb-px' : ''}`}>Stats</button> 
                        <button onClick={() => setTab('history')} className={"text-lg text-primary px-2 pb-4 border-primary mb-px border-" + `${tab == 'history' ? 'b-2 -mb-px' : ''}`}>History</button>                                                                       
                    </div>
                    {tab == 'stats' ? <Stats/> : null}
                    {tab == 'overview' ? <Overview/> : null}
                    {tab == 'wallet' ? <Wallet/> : null}   
                    {tab == 'history' ? <History/> : null}                                                                      
                </div>                
			</main>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
    user: state.user.user,
})

export default connect(mapStateToProps, { getMyGames })(Profile)
