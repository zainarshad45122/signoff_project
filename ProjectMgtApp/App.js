
import React, {useState, useEffect } from "react";
import MainNavigation from "./src/navigations";
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from "./theme";
import SplashScreen from 'react-native-splash-screen';
import { setJSExceptionHandler, getJSExceptionHandler } from 'react-native-exception-handler';
import Modal from './src/components/modal'
import {sendCrashlyticsReport} from './src/helper/helperFunctions'



export default function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const errorHandler = (e, isFatal) => {
    if (isFatal) {
      setVisible(true)
      sendCrashlyticsReport(e)
      console.error(e);
    } else {
      sendCrashlyticsReport(e)
      console.log(e);
    }
  };

  setJSExceptionHandler(errorHandler, true);

 
  return (

    <PaperProvider theme={theme}>
      <Modal isOpen={visible} isClose={() => setVisible(false)} title="Oopps" type="error" message={"Some thing has gone wrong, Please try again"} />
      <MainNavigation />
    </PaperProvider>
  );
}

