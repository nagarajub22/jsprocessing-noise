import React from "react";
import styles from './App.component.scss';

interface Props {
  name:
  string
}

class App extends React.Component<Props> {
  render() {

    return (
      <>
        <h1 className={styles.h1}>
          Hello 
        </h1>
        <button type="button">
          This is a button
        </button>
      </>
    );
  }
}

export default App;