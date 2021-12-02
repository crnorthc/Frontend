import type { NextPage } from "next"
import Head from "next/head"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Line from "../components/DashChart"
import Loader from "react-loader-spinner"

// State Stuff
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getMyGames, searchCryptos, getData } from "../store/actions/game"
import { watch, getWatch } from "../store/actions/user"
import router from "next/router"

const Dashboard: NextPage = (props: any) => {

	const [myGames, setMyGames] = useState('')
	const [results, setResults] = useState("hidden")
	const [chart, setChart] = useState("hidden")
	const [chartView, setChartView]: any = useState(null)
    const [search, setSearch] = useState('')
	const [selected, setSelected]: any = useState(null)
	const [action, setAction]: any = useState(null)

	Dashboard.propTypes = {
        searchCryptos: PropTypes.func.isRequired,
		getMyGames: PropTypes.func.isRequired, 
        getData: PropTypes.func.isRequired,  
		watch: PropTypes.func.isRequired,  
		getWatch: PropTypes.func.isRequired,       
        search_results: PropTypes.array,
		watchlist: PropTypes.object,
		mygames: PropTypes.array,
		user: PropTypes.object,
        data: PropTypes.array,		
	}

	useEffect(() => {
		if (props.games == null) {
			props.getMyGames()
		}
	}, [])

	useEffect(() => {
		if (props.watchlist == null) {
			props.getWatch()
		}
	}, [])	

	const formatDate = (date: object) => {
        const year = date['year']
        const month = date['month']
        const day = date['day']
        var hour = date['hours']
        const min = date['minutes']
		var AM_PM = 'AM'

		if (hour > 12) {
			hour = hour - 12
			AM_PM = 'PM'
		}

        return (
            <div className="flex flex-row">
                <p className="text-light pr-2 text-xl">{month + '/' + day + '/' + year}</p>
                <p className="text-light text-xl">{hour + ':' + min + ' ' + AM_PM}</p>
            </div>
        )
    }

    const handleSearch = () => {        
        props.searchCryptos(search)
        
        if (results == 'hidden') {
            ShowResults()
        }
    }

    const handleSearchOpen = (selected: any) => {
        props.getData(selected, 'D')
        setSearch('')
        ShowChart()
    }

	const toMoney = (amount: number) => {
		return "$" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}

	const handleSelect = (code: string) => {
		if (selected == null) {
			setSelected(code)
			setAction('expand')
			return
		}	

		if (selected == code) {
			setAction('collapse')

			var timer = setTimeout(() => {	
				setSelected(null)
				setAction(null)
			}, 310)		
	
			return () => {
				clearTimeout(timer)
			}
		}
		else {
			setAction('collapse')

			var timer = setTimeout(() => {	
				setSelected(code)
				setAction('expand')
			}, 310)		
	
			return () => {
				clearTimeout(timer)
			}
		}
	}

	const getGames = () => {
		const myGames = []

		for (const game in props.mygames) {
			myGames.push(
				<button onClick={() => handleSelect(game)} className="flex flex-col">
					<div className={"flex flex-row items-center justify-between w-full py-4 pl-2 mt-2 bg-dark2 hover:bg-darkHue3 " + `${selected == game ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
						<div className="flex flex-row items-center">
							{props.mygames[game].type == "tiered" ? <Image width={30} height={20} src="/TierIcon.svg" alt="" /> : <Image width={30} height={30} src="/MultIcon.svg" alt="" />}
							<h1 className="text-light pl-6 text-xl">{props.mygames[game].name}</h1>
						</div>	
						<div className="flex flex-row items-center">
							<h1 className="text-light pl-6 text-xl pr-4">{toMoney(props.mygames[game].wager)}</h1>
							{props.mygames[game].started ? <div className="w-3 h-3 rounded-full mr-2 bg-green"/> : <div className="w-3 h-3 rounded-full mr-2 bg-red"/>}
						</div>
					</div>
					{props.mygames[game].started ? 
						<div className={`${selected == game ? action : 'hidden'}` + " flex flex-col w-full h-48 bg-dark3 px-8 py-4 rounded-b-2xl"}>
							<div className="flex flex-row pb-2 justify-between">
								<div className="flex flex-row items-center">
									<h1 className="text-primary2 pr-1 text-md">#</h1>
									<h1 className="text-primary2 text-xl">{props.mygames[game].player.rank.rank}</h1>
								</div>
								<h1 className="text-primary2 text-xl">{toMoney(props.mygames[game].player.rank.score.toFixed(2))}</h1>
							</div>
							<div className="flex flex-row justify-between">
								<h1 className="text-lightHue2 text-xl">League</h1>
								<h1 className="text-light text-xl">{props.mygames[game].league}</h1>
							</div>
							<div className="flex flex-row pt-2 justify-between">
								<h1 className="text-lightHue2 text-xl">Split</h1>
								<h1 className="text-light text-xl">{props.mygames[game].split}</h1>
							</div>
							<div className="flex flex-row pt-2 justify-between">
								<h1 className="text-lightHue2 text-xl">Ends</h1>
								<h1 className="text-light text-xl">{formatDate(props.mygames[game].end)}</h1>
							</div>
							<div className="flex flex-row pt-2 justify-between items-center">
								<div className="flex flex-row items-center">
									<h1 className="text-primary text-xl">{toMoney(props.mygames[game].player.take)}</h1>
									<Image width={30} height={20} src="/TokenLogoLight.svg" alt="" />
									<h1 className="text-primary pl-4 text-xl">{toMoney(props.mygames[game].pot)}</h1>
									<Image width={30} height={20} src="/MoneyBag.svg" alt="" />
								</div>
								<button onClick={() => router.push('/game/' + game)} className='mt-2 py-1 px-2 rounded-lg bg-dark2 hover:bg-darkHue3 flex flex-row justify-center items-center'><Image width={30} height={20} src="/PrimaryArrowRight.svg" alt="" /></button>							
							</div>
						</div>				
					:
						<div className={`${selected == game ? action : 'hidden'}` + " flex flex-col w-full h-48 bg-dark3 px-8 py-4 rounded-b-2xl"}>
							<div className="flex flex-row pb-2 justify-between">
								<h1 className="text-primary2 text-xl">Allocated</h1>
								<h1 className="text-primary2 text-xl">{props.mygames[game].player.allocation}%</h1>
							</div>
							<div className="flex flex-row justify-between">
								<h1 className="text-lightHue2 text-xl">League</h1>
								<h1 className="text-light text-xl">{props.mygames[game].league}</h1>
							</div>
							<div className="flex flex-row justify-between">
								<h1 className="text-lightHue2 pt-2 text-xl">Split</h1>
								<h1 className="text-light text-xl">{props.mygames[game].split}</h1>
							</div>
							<div className="flex flex-row pt-2 justify-between">
								<h1 className="text-lightHue2 text-xl">Starts</h1>
								<h1 className="text-light text-xl">{formatDate(props.mygames[game].start)}</h1>
							</div>
							<div className="flex flex-row pt-2 justify-between items-center">
								<div className="flex flex-row items-center">
									<h1 className="text-primary text-xl">{toMoney(props.mygames[game].player.take)}</h1>
									<Image width={30} height={20} src="/TokenLogoLight.svg" alt="" />
									<h1 className="text-primary pl-4 text-xl">{toMoney(props.mygames[game].pot)}</h1>
									<Image width={30} height={20} src="/MoneyBag.svg" alt="" />
								</div>
								<button onClick={() => router.push('/games/' + game)} className='mt-2 py-1 px-2 rounded-lg bg-dark2 hover:bg-darkHue3 flex flex-row justify-center items-center'><Image width={30} height={20} src="/PrimaryArrowRight.svg" alt="" /></button>							
							</div>
						</div>				
					}															
				</button>
			)
		}

		return myGames
	}

    const getResults = () => {
        if (props.search_results !== null && props.search_results !== 'loading') {
            const results = []

            for (const result in props.search_results) {
                results.push(
                    <button onClick={() => handleSearchOpen(props.search_results[result])} className="flex flex-row w-full py-4 pl-2 my-2 bg-dark2 hover:bg-dark3 rounded-2xl items-center">
                        <div className="bg-lightHue rounded-full">
                            <div className="m-3 flex flex-row justify-center items-center">
                                {props.search_results[result].logo != null ? <Image width={30} height={30} src={props.search_results[result].logo} alt="" /> : <Image alt='' width={30} height={30} src='/NoLogo.svg' />}
                            </div>                            
                        </div>                        
                        <h1 className="text-light pl-6 text-xl">{props.search_results[result].name}</h1>
                        <h1 className="text-lightmedium pl-2 text-lg">{props.search_results[result].symbol}</h1>
                    </button>
                )
            }
            console.log('here')
            return results
        }        
    }

	const getWatchlist = () => {
		var watchlist = []
		for (const x in props.watchlist) {
			var color: any = Math.random()
			if (color > .5) {
				color = 'text-green'
			}
			else {
				color = 'text-red'
			}
			watchlist.push(
				<button onClick={() => handleSearchOpen(props.watchlist[x])} className="flex flex-row py-1 px-2 my-1 items-center justify-between rounded-lg bg-dark2 hover:bg-dark3">
					<div className="flex flex-row justify-center">
						<div className="bg-lightHue rounded-full">
							<div className="m-3 flex flex-row justify-center items-center">
								{props.watchlist[x].logo != null ? <Image width={30} height={30} src={props.watchlist[x].logo} alt="" /> : <Image alt='' width={30} height={30} src='/NoLogo.svg' />}
							</div>
						</div>
						<div className="flex flex-col items-start justify-center pl-4">	
							<h1 className="text-light -mb-1 text-xl">{props.watchlist[x].name}</h1>
							<h1 className="text-lightmedium -mt-1 text-md">{props.watchlist[x].symbol}</h1>
						</div>			
					</div>		
					<h1 className={"text-light -mt-1 text-md " + color}>{toMoney(props.watchlist[x].price)}</h1>					
				</button>
			)
		}

		for (let i = watchlist.length; i < 4; i++) {
			watchlist.push(<div className="pt-12 pb-2 my-1 w-full rounded-lg bg-dark2" />)
		}
		return watchlist
	}

	const ShowGames = () => {
        setSearch('')

		if (results == 'showThis') {
			setResults('hideThis')
		}
		else {
			setChart('hideThis')
		}

		if (chartView) {
			setChartView(false)
		}

		var timer = setTimeout(() => {	
			if (results == 'showThis') {
				setResults('hidden')
			}			
			else {
				setChart('hidden')
			}					
			setMyGames('showThis')
		}, 750)		

		return () => {
			clearTimeout(timer)
		}
		
	}

	const ShowResults = () => {
		if (chart == 'showThis') {			
			setChart('hideThis')
		}
		else {		
			setMyGames('hideThis')	
		}

		if (chartView) {
			setChartView(false)
		}

		const timer = setTimeout(() => {
			if (chart == 'showThis') {			
				setChart('hidden')
			}
			else {		
				setMyGames('hidden')	
			}				
			setResults('showThis')					
		}, 750)
		

		return () => clearTimeout(timer)			
	}

    const ShowChart = () => {
		if (results == 'showThis') {			
			setResults('hideThis')
		}
		else {		
			setMyGames('hideThis')	
		}

		setChartView(true)

		const timer = setTimeout(() => {
			if (results == 'showThis') {			
				setResults('hidden')
			}
			else {		
				setMyGames('hidden')	
			}				
			setChart('showThis')		
		}, 750)		

		return () => {
			clearTimeout(timer)
		}
	}

    if (props.user == null || props.mygames == null) {
        return <div/>
    }

	return (
		<div className="">
			<div className="pageCont">
				<Head>
					<title>Dashboard</title>
					<link rel="icon" href="/favicon.icon" />
				</Head>
				<div className="flex flex-row items-center">
					<h1 className="text-light text-4xl glory">Dashboard</h1>
					<h1 className="text-lightHue mt-1 ml-4 text-md font-light">Welcome back {props.user.first_name}</h1>
				</div>								
				<div className="flex flex-row justify-between w-full mt-4">
					<div className={"w-7/12 " + `${chartView ? 'grow' : chartView != null ? 'shrink' : null}`}>
						<div className="flex flex-col rounded-lg pt-4 pl-4 bg-medium3 w-full min-h-lg max-h-xlg overflow-hidden">
                            <div className="flex flex-row justify-between pr-10 w-full">
                                <div className="flex flex-row justify-between border-2 rounded-full border-primaryHue w-1/2 py-1 pl-4">                                
                                    <Image alt="" width={25} height={25} src="/searchLight.svg" />
                                    <input 
                                        className="text-xl pl-4 text-light outline-none w-full rounded-l-md" 
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyUp={() => handleSearch()} placeholder="Search" type="text"
                                    />                                                              							
                                </div>
                                {myGames == 'hidden' || myGames != '' && myGames != 'showThis' ?  
                                    <button onClick={() => ShowGames()} className="flex -mr-6 mt-1 flex-row justify-center font-bold text-white items-center w-7 h-7 bg-secondary rounded-full">
                                        &#x2715;
                                    </button>
                                : null} 
                            </div>							
							<div className={myGames}>
								<h1 className="text-primary2 text-4xl pt-12 glory">Your Games</h1>
								<div className="mt-2 pb-5 border-t-2 border-primary3 w-52" />
								{Object.keys(props.mygames).length == 0 ?
									<div className="flex flex-col justify-center items-center max-h-lg overflow-auto w-full">
										<h1 className="text-lightmedium text-4xl pt-24 glory">No Games</h1>
									</div>									
									:
									<div className="flex pr-4 flex-col max-h-lg overflow-auto w-full">{getGames()}</div>
								}								
							</div>

                            <div className={results}>
								<h1 className="text-light text-4xl pt-12 glory">Results</h1>
								{props.search_results == 'loading' && search != '' ?
								<div className="flex flex-row justify-center items-center mt-40 ml-8 w-full">
									<Loader
										type="Circles"
										color="#00C2EF"
										height={100}
										width={100}
										timeout={3000}
									/>
									</div>
								:
								search == '' ?
									<div className="flex flex-row justify-start mt-12 text-xl text-medium ml-4 w-full">
										Start by entereing a stock or crypto's name of symbol
									</div>
								:
								props.search_results.length == 0 ?
									<div className="flex flex-row justify-start mt-12 text-xl text-medium ml-4 w-full">
										Nothing matching '{search}'
									</div> 
								    :
									<div className="flex mt-8 pr-4 flex-col max-h-lg overflow-auto w-full">{getResults()}</div>
								}
							</div>

                            <div className={chart}>								
								{props.data != null ? 
									<div className="mt-4">
										<div className="flex flex-row items-center">
											<button onClick={() => props.watch(props.data.selected.id)} className="flex flex-row items-center">
												{props.data.selected.id in props.watchlist ? <Image width={20} height={20} src='/closedstar.svg' /> : <Image width={20} height={20} src='/openstar.svg' />}	
											</button>												
											<div className="flex pl-2 flex-row items-end">
												<h1 className="text-light text-2xl">{props.data.selected.name}</h1>
												<h1 className="text-lightmedium pl-2 text-xl">{props.data.selected.symbol}</h1>
											</div>																					
										</div>										
										<Line data={props.data.data} /> 
									</div>                                    
                                : 
								<div className="flex flex-row justify-center items-center mt-40 ml-8 w-full">
									<Loader
                                        type="Circles"
                                        color="#00C2EF"
                                        height={100}
                                        width={100}
                                    />
								</div>                                         
                                }
							</div>
						</div>
					</div>
					<div className="px-2"/>
					<div className={"flex flex-col w-2/5 min-h-lg" + `${chartView ? 'shrink2' : chartView != null ? 'grow2' : null}`}>
						<h1 className="text-primary2 text-2xl glory">Wallet Balance</h1>
						<div className="flex flex-col pt-6 bg-medium3 mt-2 rounded-lg">
							<div className="flex px-4 flex-row justify-between">
								<h1 className="text-light font-light text-xl">Total Balance</h1>
								<h1 className="text-light font-semibold font-light text-xl">{toMoney(props.user.balance + props.user.frozen)}</h1>
							</div>
							<div className="flex pl-12 pr-4 pt-2 flex-row justify-between">
								<h1 className="text-light font-extralight text-xl">Available Balance</h1>
								<h1 className="text-green font-bold font-light text-xl">{toMoney(props.user.balance)}</h1>
							</div>
							<div className="flex pl-12 pr-4 pt-1 flex-row justify-between">
								<div className="flex flex-row items-center">
									<h1 className="text-light font-extralight pr-2 text-xl">Frozen Balance</h1>
									<button className="flex flex-col justify-center">
										<Image width={20} height={20} src="/InfoMedium.svg" alt="" />
									</button>									
								</div>								
								<h1 className="text-secondary font-bold font-light text-xl">{toMoney(props.user.frozen)}</h1>
							</div>
							<div className="flex flex-row justify-end w-full px-4 pb-2 mt-4">
								<button className="flex flex-col items-center font-light hover:bg-primary4 mr-2 justify-center text-sm bg-primary rounded-sm px-3 h-5">Deposit</button>
								<button className="flex flex-col items-center font-light hover:bg-darkHue justify-center text-sm border border-light text-light rounded-sm px-3 h-5">Withdraw</button>
							</div>
						</div>
						<div className="py-2" />
						<div className="flex flex-col min-h-smd max-h-smd bg-medium3 overflow-auto pb-2 rounded-lg">
							<h1 className="text-primary text-3xl pt-4 pl-4 glory">Your Watchlist</h1>
							<div className="flex flex-col h-full overflow-auto pt-2 px-4">{getWatchlist()}</div>
							<div className=""></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
    search_results: state.game.search_results,
	watchlist: state.user.watchlist,
	mygames: state.game.mygames,
	user: state.user.user,
    data: state.game.data
})

export default connect(mapStateToProps, { getMyGames, searchCryptos, getData, getWatch, watch })(Dashboard)
