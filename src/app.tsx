import React from "react";
import {Header, Footer} from './components'
import { useStyleDashboard } from "./style";
import Content from './page/content'
function App() {
  const classes = useStyleDashboard();
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
