import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Success from './pages/Success';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
