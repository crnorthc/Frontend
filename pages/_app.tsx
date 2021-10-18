import "tailwindcss/tailwind.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { store } from "../store/store"
import "../public/styles.css"
import Auth from '../tools/auth'
import Nav from "../tools/Nav"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Auth>
				<Nav/>
				<Component {...pageProps} />
			</Auth>
		</Provider>
	)
}

export default MyApp
