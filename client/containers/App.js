import React from 'react';
import NavBar from '../components/NavBar'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <NavBar />
        { this.props.children }
      </div>
    )
  }
}

export default App;
