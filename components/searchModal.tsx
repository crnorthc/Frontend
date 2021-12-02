import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";
import Chart from './GameComponents/Chart'

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { searchCryptos, getData, editLineup } from "../store/actions/game"


const LINKS = {
    'website': '/website.svg',
    'twitter': '/004-twitter.svg',
    'message-board': '/Chat.svg',
    'reddit': '/Reddit.svg',
    'source_code': '/Github.svg',
    'announcement': 'Announcement.svg'
}

const ChartModal: any = (props: any) => {
    const [searchOpen, setSearchOpen] = useState(false)    
    const [search, setSearch] = useState('')
    const [allocation, setAllocation]: any = useState('')
    const [cash, setCash] = useState(props.player.cash)
    const [all, setAll] = useState(false)
    const [scroll, setScroll] = useState(true)

    ChartModal.propTypes = {
        getData: PropTypes.func.isRequired,
        searchCryptos: PropTypes.func.isRequired,
        editLineup: PropTypes.func.isRequired,
        search_results: PropTypes.array,
        game: PropTypes.object,
        player: PropTypes.object,
        data: PropTypes.array
    }

    const inputRef = useRef(null)

    const edit_lineup = () => {
        props.editLineup(props.game.code, allocation_num(allocation), props.data.selected.id)
        props.setOpen(false)
    }

    const closeModal = () => {
        setSearch('')
        setSearchOpen(false)
    }

    const handleSearch = () => {        
        props.searchCryptos(search)
    }

    const handleSearchOpen = (selected: any) => {
        props.getData(selected, 'D')
        setSearchOpen(false)
        setSearch('')
    }

    const getResults = () => {
        var temp = []
        var results = props.search_results
        if (!all) {
            results = results.slice(0,6)
        }
        for (const result in results) {
            temp.push(
                <button onClick={() => handleSearchOpen(results[result])} className="flex flex-row px-4 hover:bg-lightHover py-2 justify-between items-center">
                    <div className="flex pl-2 flex-row items-center w-full justify-between">
                        <div className="flex flex-row items-center">
                            {'logo' in results[result] ? <Image alt='' width={20} height={20} src={results[result].logo} /> : <Image alt='' width={20} height={20} src='/NoLogo.svg' />}
                            <p className="text-md pl-4 pr-2 whitespace-nowrap overflow-ellipsis font-semibold">{results[result].name}</p>
                        </div>                        
                        <div className="text-md text-medium">{results[result].symbol.toUpperCase()}</div>
                    </div>    
                </button>
            )
        }
        return temp
    }

    useEffect(() => {
        if (props.data !== null) {
            const lineup = props.player.lineup
            for (const x in lineup) {
                if (props.data.selected.symbol == lineup[x].symbol) {
                    setAllocation(toMoney(lineup[x].allocation))
                    setCash(cash + lineup[x].allocation)
                    return
                }
            }
            setCash(cash)
            setAllocation('')
        }
    }, [props.data])


    const top_cryptos = (
        <div className="grid grid-rows-6 pt-2 h-60">
            <button className="flex flex-row px-4 hover:bg-lightHover justify-between items-center">
                <div className="flex pl-2 flex-row items-center">
                    <Image alt='' width={20} height={20} src='/coins/bitcoin.svg' />
                    <div className="text-lg pl-4 px-4 font-semibold">Bitcoin</div>
                    <div className="text-md text-medium">BTC</div>
                </div>    
                <div className="text-md font-bold text-lightmedium">#1</div>
            </button>
            <button className="flex flex-row px-4 hover:bg-lightHover justify-between items-center">
                <div className="flex pl-2 flex-row items-center">
                    <Image alt='' width={20} height={20} src='/coins/eth.svg' />
                    <div className="text-lg pl-4 px-4 font-semibold">Ethereum</div>
                    <div className="text-md text-medium">ETH</div>
                </div>    
                <div className="text-md font-bold text-lightmedium">#2</div>
            </button>
            <button className="flex flex-row px-4 hover:bg-lightHover justify-between items-center">
                <div className="flex pl-2 flex-row items-center">
                    <Image alt='' width={20} height={20} src='/coins/doge.svg' />
                    <div className="text-lg pl-4 px-4 font-semibold">Dogecoin</div>
                    <div className="text-md text-medium">DOGE</div>
                </div>    
                <div className="text-md font-bold text-lightmedium">#9</div>
            </button>
            <button className="flex flex-row px-4 hover:bg-lightHover justify-between items-center">
                <div className="flex pl-2 flex-row items-center">
                    <Image alt='' width={20} height={20} src='/coins/litecoin.svg' />
                    <div className="text-lg pl-4 px-4 font-semibold">Litecoin</div>
                    <div className="text-md text-medium">LTC</div>
                </div>    
                <div className="text-md font-bold text-lightmedium">#16</div>
            </button>
            <button className="flex flex-row px-4 hover:bg-lightHover justify-between items-center">
                <div className="flex pl-2 flex-row items-center">
                    <Image alt='' width={20} height={20} src='/coins/shib.png' />
                    <div className="text-lg pl-4 px-4 font-semibold">Shiba Inu</div>
                    <div className="text-md text-medium">SHIB</div>
                </div>    
                <div className="text-md font-bold text-lightmedium">#11</div>
            </button>
            <button className="flex flex-row px-4 hover:bg-lightHover justify-between items-center">
                <div className="flex pl-2 flex-row items-center">
                    <Image alt='' width={20} height={20} src='/coins/axie.png' />
                    <div className="text-lg pl-4 px-4 font-semibold">Axie Infinity</div>
                    <div className="text-md text-medium">AXS</div>
                </div>    
                <div className="text-md font-bold text-lightmedium">#25</div>
            </button>
        </div>
    )

    const search_modal = (
        <div className="relative mx-12 mb-12 w-lmd">
            <div className="absolute z-50 bg-white rounded-md w-full top-0 right-0">
                <div className="flex  flex-row px-4 py-2 justify-between items-center">
                    <Image alt='' width={25} height={25} src='/searchMedium.svg' />
                    <input
                        className='text-xl pl-4 cursor-pointer outline-none w-full rounded-l-md'
                        placeholder='Search'
                        ref={inputRef}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyUp={() => handleSearch()}
                        type='text'/>
                    <button onClick={() => closeModal()} className="flex flex-row justify-center font-bold text-white items-center w-7 h-6 bg-secondary rounded-full">
                        &#x2715;
                    </button>
                </div> 
                <div className="text-sm pl-4 text-lightmedium">{search == '' ? 'Suggested' : 'Top Results'}</div>
                {search == '' ?
                    top_cryptos
                    :
                    props.search_results == 'loading' ?
                        <div className="flex flex-col h-60 items-center justify-center">
                            <Loader
                                type="Circles"
                                color="#00C2EF"
                                height={50}
                                width={50}
                            />
                        </div>
                    :
                    <div className="flex flex-col max-h-sm overflow-y-auto min-h-sm">
                        {getResults()}
                        <button onClick={() => setAll(!all)}>{all ? "show less" : "show more"}</button>
                    </div>
                }                      
            </div>            
        </div>
    )

    const toMoney = (amount: any) => {
        amount = amount.toString().replace('$','')
        return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const allocation_num = (allo: string) => {
        return Number(allo.toString().replace('$', '').replaceAll(',',''))
    }

    const handleChange = (e: any) => {
        setAllocation(toMoney(allocation_num(e)))
    }

    const getCash = () => {
        var allo = allocation_num(allocation)

        return toMoney(cash - Number(allo))
    }

    const getSocials = () => {
        var socials: any = []
        for (const link in props.data.selected.links) {
            if (link in LINKS && props.data.selected.links[link].length != 0) {
                socials.push(
                    <a href={props.data.selected.links[link][0]}>
                        <Image alt='' width={40} height={40} src={LINKS[link]} />
                    </a>
                )
            }
        }

        return socials
    }

    if (props.data == null) {
        return <Loader
                type="Circles"
                color="#00C2EF"
                height={50}
                width={50}
            />
    }
    else {
        return (
            <div className="relative z-50 flex flex-row justify-center items-center w-full">
                <div className={`${scroll ? 'overflow-y-auto' : 'overflow-y-hidden'}` + " no-scroll -mt-2 w-full bg-dark2 rounded-lg border-2 border-primary max-h-xlg overflow-x-hidden"}>
                    <div className="flex pt-4 -ml-3 flex-row w-full justify-between">
                        {!searchOpen ?
                            <button onClick={() => setSearchOpen(true)} className="flex flex-row items-center justify-center w-1/2">                                
                                <input
                                    className='py-2 pl-2 bg-light text-xl cursor-pointer outline-none w-3/4 rounded-l-md'
                                    placeholder='ex. Bitcoin, BTC...'
                                    type='text'/>
                                <button className="flex flex-col justify-center items-center rounded-r-md w-12 h-11 bg-secondary hover:bg-secondaryLight">      
                                    <Image alt='' width={25} height={25} src='/search.svg' />
                                </button>
                            </button>
                            :
                            search_modal
                        }                 
                        <button onClick={() => props.setOpen(false)} className="flex mr-2 flex-row justify-center font-bold text-white items-center w-6 h-6 bg-secondary rounded-full">
                            &#x2715;
                        </button>
                    </div>
                    <div className="flex flex-row mt-8 pb-2 items-center pl-12 -ml-2 -mb-4">
                    <Image width={30} height={30} src={props.data.selected.logo} />
                        <h1 className='text-xl pb-0 px-2 text-light'>{props.data.selected.name}</h1>
                        <h1 className='text-md font-light text-light'>{props.data.selected.symbol}</h1>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="w-5/7">
                            {props.data == null ?
                                <Loader
                                    type="Circles"
                                    color="#00C2EF"
                                    height={50}
                                    width={50}
                                />
                                :
                                props.data.data == null ?
                                    <div className="">
                                        No data for this bitch, use coinmarket cap or something
                                    </div>
                                    :
                                    <Chart setScroll={setScroll} data={props.data.data} />                    
                            } 
                        </div>                        
                        <div className="flex flex-col justify-between items-start bg-lightHue3 mr-4 ml-2 mb-16 mt-4 rounded-lg w-full">
                            <div className="flex flex-col items-start w-full">
                                <h1 className='text-xl pt-4 pl-4 text-light'>Purchase {props.data.selected.symbol}</h1>
                                <div className="flex pt-8 flex-row w-full justify-between items-center">
                                    <h1 className='text-lg pl-4 text-light'>Allocate</h1>
                                    <input
                                        type='text'
                                        value={allocation}
                                        className='border w-1/2 bg-light mr-2 focus:outline-none py-2 px-3 rounded-lg poppins'
                                        onChange={(e) => handleChange(e.target.value)}
                                        placeholder='ex. $10'
                                    />
                                </div>
                                <div className="flex pt-12 flex-row w-full justify-between items-center">
                                    <h1 className='text-lg pl-4 text-light'>Cash Available</h1>
                                    <h1 className='text-lg pr-4 text-light'>{toMoney(cash)}</h1>
                                </div>
                                <div className="flex pt-4 flex-row w-full justify-between items-center">
                                    <h1 className='text-lg font-light pl-8 text-light'>Amount</h1>
                                    <h1 className='text-lg font-light pr-4 text-light'>{allocation != '' ? toMoney(allocation) : '$0'}</h1>
                                </div>
                                <div className="flex pt-4 flex-row w-full justify-between items-center">
                                    <h1 className='text-lg font-light pl-8 text-light'>Remaining</h1>
                                    <h1 className='text-lg font-light pr-4 text-light'>{toMoney(getCash())}</h1>
                                </div>                                
                            </div>    
                            <div className="flex flex-row w-full justify-center">
                                <button onClick={() => edit_lineup()} className="px-4 py-2 my-4 hover:bg-secondaryLight bg-secondary text-xl text-light rounded-md">
                                    Confirm
                                </button> 
                            </div>                                                
                        </div>
                    </div> 
                    <div className="flex flex-col mt-8 mx-4 mb-10 py-4 rounded-lg bg-lightHue3">
                        <div className="text-2xl text-left ml-12 text-primary3">Description</div>
                        <div className="w-32 border-t-2 ml-12 border-primary3" />
                        <div className="flex flex-col items-center px-12">
                            <div className="text-left py-2 text-light">
                                {props.data.selected.description}
                            </div>                        
                        </div>  
                    </div>  
                    <div className="flex flex-row justify-center w-full mb-5">
                        <div className="flex flex-row w-1/2 justify-between">
                            {getSocials()} 
                        </div>                        
                    </div>                                                                                               
                </div>                    
            </div>
        )
    }	
}

const mapStateToProps = (state: any) => ({
    game: state.game.game,
    player: state.game.player,
    data: state.game.data,
    search_results: state.game.search_results
})

export default connect(mapStateToProps, { getData, searchCryptos, editLineup })(ChartModal)