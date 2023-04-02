import React from 'react'
import InfiniteLoadDropdown from './PrimeReact/InfiniteLoadDropdown'
import LazyDemo from './PrimeReact/LazyLoad'

const App = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <InfiniteLoadDropdown />
      {/* <LazyDemo /> */}
    </div>
  )
}

export default App