import Body from "./Components/Body/Body"
import Buscador from "./Components/Buscador/Buscador"
import Footer from "./Components/Footer/Footer"
import Navbar from "./Components/Navbar/Navbar"

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
