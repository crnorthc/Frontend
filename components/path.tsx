import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Link from "next/link";

const page_paths = {
    'games': "Games",
    '[code]': "Game Details",
    '[lineupCode]': 'Create Lineup'
}

const handleBack = (jumps: any) => {
    history.go(-jumps + 1)
}

const Path: any = (props: any) => {
    const router = useRouter()
    const [paths, setPaths]: any = useState(null)

    useEffect(() => {
        if (!router.isReady) return
        var path = router.pathname
        const parts: any = path.split('/')
        var temp: any = []
        for (const part in parts) {
            var page = parts[part]
            if (page in page_paths) {         
                temp.push(
                    <button onClick={() => handleBack(parts.length - Number(part))}>
                        <a className='no-underline hover:text-primary font-light text-lg text-light'>
                            {page_paths[parts[part]]}
                        </a>
                    </button>
                )          
            }
        }
        setPaths(temp)
    }, [router.isReady])

    const sep = (
        <div className="text-light mx-4">
            {">"}
        </div>
    )

    const format_path = () => {
        const full_path = []
        var count = 0
        for (const path in paths) {
            if (count == 0) {
                full_path.push(paths[path])
            }
            else {
                full_path.push(sep)
                full_path.push(paths[path])
            }
            count++
        }
        return full_path
    }


	return (
        <div className="absolute left-8">
            <div className="flex flex-row">
                {paths != null ? format_path() : null}
            </div>
        </div>
	)
}

export default Path
