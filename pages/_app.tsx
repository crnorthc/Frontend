import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "../public/styles.css";
import Auth from "../tools/auth";
import Nav from "../components/Nav";
import Notify from "../components/Notify";

function MyApp({ Component, pageProps }: AppProps) {
 return (
  <Provider store={store}>
   <Auth>
    <Nav />
    <Component {...pageProps} />
   </Auth>
   <Notify/>
  </Provider>
 );
}

export default MyApp;
