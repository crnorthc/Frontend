import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";
import ChartModal from '../searchModal'


// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { searchCryptos, getData, editLineup } from "../../store/actions/game"


const Lineup = (props) => {
    const [searchOpen, setSearchOpen] = useState(false)    
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [all, setAll] = useState(false)

    const inputRef = useRef(null)

	Lineup.propTypes = {
        getData: PropTypes.func.isRequired,
        searchCryptos: PropTypes.func.isRequired,
        editLineup: PropTypes.func.isRequired,
        search_results: PropTypes.array,
        game: PropTypes.object,
        player: PropTypes.object,
        data: PropTypes.array
    }

    const toMoney = (amount) => {
        return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const handleSearch = () => {        
        props.searchCryptos(search)
    }
    
    const handleSearchOpen = (selected) => {
        props.getData(selected, 'D')
        setSearchOpen(false)
        setSearch('')
        setOpen(true)
    }

    useEffect(() => {
        if (searchOpen) {
            inputRef.current.focus()
        }
    }, [searchOpen])

    var x = []

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
                            {results[result].logo != null ? <Image alt='' width={20} height={20} src={results[result].logo} /> : <Image alt='' width={20} height={20} src='/NoLogo.svg' />}
                            <p className="text-md pl-4 pr-2 whitespace-nowrap overflow-ellipsis font-semibold">{results[result].name}</p>
                        </div>                        
                        <div className="text-md text-medium">{results[result].symbol.toUpperCase()}</div>
                    </div>    
                </button>
            )
        }
        return temp
    }

    const closeModal = () => {
        setSearch('')
        setSearchOpen(false)
    }

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
        <div className="relative w-1/2">
            <div className="absolute z-50 bg-white -mt-5 mt-2 rounded-md mr-6 w-full top-0 right-0">
                <div className="flex flex-row px-4 py-2 justify-between items-center">
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

    const handleEdit = (selected) => {
        props.getData(selected, 'D')
        setSearchOpen(false)
        setSearch('')
        setOpen(true)
    }

    const get_lineup = () => {
        const lineup = props.player.lineup
        var temp = []
        for (const x in lineup) {
            temp.push(
                <div className="flex flex-row py-4 pl-8 pr-4 justify-between items-center">
                    <div className="flex flex-row items-center">
                        {lineup[x].logo == null ? <Image alt='' width={50} height={50} src='/NoLogo.svg' /> :<Image alt='' width={50} height={50} src={lineup[x].logo} />}
                        <h1 className='text-xl pl-4 pr-2 pb-0 pr-2 text-light'>{lineup[x].name}</h1>
                        <h1 className='text-md font-light text-light'>{lineup[x].symbol}</h1>
                    </div>  
                    <div className="flex flex-row items-center">
                        <h1 className='text-xl text-light'>{toMoney(lineup[x].allocation)}</h1> 
                        <div className="flex flex-row items-center pl-8">
                            <button onClick={() => handleEdit(lineup[x])} className='flex flex-row p-1 rounded-lg hover:bg-lightmedium justify-center items-center '>
                                <Image alt='' width={18} height={18} src='/edit.svg' />
                            </button>                            
                            <button onClick={() => props.editLineup(props.game.code, 0, lineup[x].id)} className='flex flex-row p-1 rounded-lg justify-center items-center ml-2 hover:bg-lightmedium'>
                                <Image alt='' width={18} height={18} src='/trash.svg' />
                            </button>                        
                        </div> 
                    </div>                                    
                </div>
            )
        }
        return temp
    }

	return (
		<div className="w-full mr-8"> 
            {open ? 
                <div className="absolute z-40 top-0 left-0 bg-lightHover w-full h-full">
                    <div className="pageCont">
                        <ChartModal setOpen={setOpen}/> 
                    </div>                    
                </div>                
                : null
            }         
			<main className='bg-medium flex flex-col items-center w-full'>
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex flex-row justify-between bg-dark border-t-2 border-r-2 border-l-2 border-primary rounded-t-xl items-center w-full"> 
                        <h1 className="text-2xl pl-4 py-4 text-light">Search</h1>
                        {!searchOpen ?
                            <button onClick={() => setSearchOpen(true)} className="flex flex-row items-center justify-center w-1/2">                                
                                <input
                                    className='py-2 pl-2 text-xl cursor-pointer outline-none w-3/4 rounded-l-md'
                                    placeholder='ex. Bitcoin, BTC...'
                                    type='text'/>
                                <button className="flex flex-col justify-center items-center rounded-r-md w-12 h-11 bg-secondary hover:bg-secondaryLight">      
                                    <Image alt='' width={25} height={25} src='/search.svg' />
                                </button>
                            </button>
                            :
                            search_modal
                        }
                    </div>  
                    {props.player == null ?
                        <Loader
                            type="Circles"
                            color="#00C2EF"
                            height={50}
                            width={50}
                        />
                        :
                        <div className="flex flex-col w-full border-b-2 border-r-2 border-l-2 border-primary max-h-lg overflow-y-auto rounded-b-xl">
                            {props.player.lineup.length == 0 ?
                                <div className="flex flex-row w-full justify-center">
                                    <h1 className="text-2xl pt-44 pb-48 text-light">Search to Add to your Lineup</h1> 
                                </div>
                                :
                                get_lineup()
                            }
                        </div>    
                    }                                                                             
                </div>
			</main>
		</div>
	)
}

const mapStateToProps = (state) => ({
    search_results: state.game.search_results,
    game: state.game.game,
    player: state.game.player,
    data: state.game.data
})

export default connect(mapStateToProps, { getData, searchCryptos, editLineup })(Lineup)
