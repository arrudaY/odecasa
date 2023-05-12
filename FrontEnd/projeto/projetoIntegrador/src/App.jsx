import Body from "./Components/Body"
import Buscador from "./Components/Buscador"
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"

function App() {

  return (
    <div className="App">
      <div className="sticky-top">
        <Navbar />
        <Buscador />
      </div>
      <Body />
      <Footer />
    </div>
  )
}

export default App
