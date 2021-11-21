import Head from "next/head"
import React, { useEffect } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { getWallet } from "../../store/actions/user";


const Wallet = (props) => {
	Wallet.propTypes = {
        getWallet: PropTypes.func.isRequired,
        wallet: PropTypes.array,
        user: PropTypes.object
    }


    useEffect(() => {
        if (props.wallet == null) {
            props.getWallet()
        }
    }, [])

    const toMoney = (amount) => {
        return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const frozen_balances = () => {
        var balances = []

        for (const x in props.wallet) {
            balances.push(
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-light font-extralight text-xl">{props.wallet[x].name}</h1>
                    <h1 className="text-light font-extralight text-xl">{toMoney(props.wallet[x].bet)}</h1>
                </div>
            )
        }

        return balances
    }

    const potential_winnings = () => {
        var winnings = []

        for (const x in props.wallet) {
            winnings.push(
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-light font-extralight text-xl">{props.wallet[x].name}</h1>
                    <h1 className="text-light font-extralight text-xl">{toMoney(props.wallet[x].prize)}</h1>
                </div>
            )
        }

        return winnings
    }

    if (props.wallet == null) {
        return <Loader
            type="Circles"
            color="#00C2EF"
            height={50}
            width={50}
        />
    }

	return (
		<div>
            <div className="flex flex-row justify-between items-center pr-8 pt-8 mr-20 rounded-md">
                <h1 className="text-light font-light text-xl">Balance Details</h1>
                <div className="flex flex-row items-center">
                    <button className="py-1 px-2 bg-primary text-dark rounded-md hover:bg-primaryLight">Deposit</button>
                    <button className="ml-4 py-1 px-2 border border-lighmedium text-lightmedium rounded-md">Withdraw</button>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center px-8 pt-4 mr-20 rounded-md">
                <h1 className="text-light font-extralight text-xl">Total Balance</h1>
                <h1 className="text-light font-extralight text-xl">{toMoney(props.user.balance + props.user.frozen)}</h1>
            </div>
            <div className="flex flex-row justify-between items-center pr-8 pl-16 pt-2 mr-20 rounded-md">
                <h1 className="text-light font-extralight text-xl">Available Balance</h1>
                <h1 className="text-light font-extralight text-xl">{toMoney(props.user.balance)}</h1>
            </div>
            <div className="flex flex-row justify-between items-center pr-8 pl-16 pt-2 mr-20 rounded-md">
                <h1 className="text-light font-extralight text-xl">Frozen Balance</h1>
                <h1 className="text-light font-extralight text-xl">{toMoney(props.user.frozen)}</h1>
            </div>
            <div className="flex flex-row items-center py-8 w-full pr-20 justify-center">
                <div className="px-12 border-b border-lightmedium"/>
            </div>
            <div className="flex flex-row justify-between w-full pr-20">
                <div className="flex flex-col px-4 py-2 border border-lightmedium mr-12 rounded-md w-1/2 min-h-sm">
                    {props.wallet.length != 0 ?
                        <> 
                        <div className="flex flex-row">
                            <h1 className="text-light border-b border-lightmedium font-light px-1 text-xl">Frozen Balances</h1>                               
                        </div>  
                        <div className="flex flex-col pt-4 overflow-auto">
                            {frozen_balances()}
                        </div>
                        </>
                        :
                        <>
                        <div className="flex flex-row">
                            <h1 className="text-light border-b border-lightmedium font-light px-1 text-xl">Frozen Balances</h1>                               
                        </div>  
                        <div className="flex flex-row justify-center items-center w-full h-full">
                                <h1 className="text-light font-light px-1 text-xl">No Frozen Balances</h1>
                        </div>
                        </>
                    }                                                    
                </div>
                <div className="flex flex-col px-4 py-2 border border-lightmedium rounded-md w-1/2 min-h-sm">
                {props.wallet.length != 0 ?
                        <> 
                        <div className="flex flex-row">
                            <h1 className="text-light border-b border-lightmedium font-light px-1 text-xl">Your Potential</h1>                            
                        </div>  
                        <div className="flex flex-col pt-4 overflow-auto">
                            {potential_winnings()}
                        </div>          
                        </>
                        :
                        <>
                        <div className="flex flex-row">
                            <h1 className="text-light border-b border-lightmedium font-light px-1 text-xl">Your Potential</h1>                               
                        </div>  
                        <div className="flex flex-row justify-center items-center w-full h-full">
                                <h1 className="text-light font-light px-1 text-xl">No Current Games</h1>
                        </div>
                        </>
                    }                                                                     
                </div>
            </div>
        </div>
	)
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    wallet: state.user.wallet
})

export default connect(mapStateToProps, { getWallet })(Wallet)
