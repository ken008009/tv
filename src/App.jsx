import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import withNavigate from './router/withNavigate'
import routes from './router/index'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [urlCode, setUrlCode] = useState('')
  const [state, setState] = useState({
    "status": "ok",
    "address": "0x5a4Eb35695Fc5d159fB9D3ac9D6d090Cc4E4E9F5",
    "amount": "10.30",
    "myTotalAmount": "0",
    "vip": "5",
    "cardNum": "9983 9992 1120 9999",
    "cardAmount": "40.00",
    "recommendAddress": ""
  })

  const dispatch = {
    setIsLogin,
    setUrlCode
  }

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const RouteComponent = withNavigate(route.element)

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <RouteComponent
                  {...route}
                  state={state}
                  setState={setState}
                  isLogin={isLogin}
                  urlCode={urlCode}
                  dispatch={dispatch}
                />
              }
            />
          )
        })}
      </Routes>
    </Router>
  )
}

export default App
