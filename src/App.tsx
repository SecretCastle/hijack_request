import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import XHRDemo from './views/xhr'
import FetchDemo from './views/fetch'

function Home() {
    return <div>Home</div>
}

function App() {
    return (
        <>
            <h1>Hijacking Request Demo</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/xhr">XHR_Demo</Link>
                </li>
                <li>
                    <Link to="/fetch">Fetch_Demo</Link>
                </li>
            </ul>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/xhr" element={<XHRDemo />} />
                    <Route path="/fetch" element={<FetchDemo />} />
                </Routes>
            </div>
        </>
    )
}

export default App
