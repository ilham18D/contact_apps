import React from "react";
import {Header, Footer} from './components'
import { useStyleDashboard } from "./style";
import { useDispatch } from "react-redux";
import axios from 'axios';
import Content from './page/content'

import {
  contactAddMany,
} from './store'

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyleDashboard();
  React.useEffect(() => {
    const unsub = async() => {
      const result = await axios.get(`https://simple-contact-crud.herokuapp.com/contact`);
      if(result.status === 200) {
        dispatch(contactAddMany(result.data.data))
      }
    }
    unsub();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
   <div className={classes.root}>
      <div className={classes.app}>
      <Header />
        <main className={classes.main}>
          <Content />
        </main>
      <footer className={classes.footer}>
        <Footer />
      </footer>

    </div>
   </div>
  );
}

export default App;
