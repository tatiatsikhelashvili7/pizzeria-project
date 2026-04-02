import { render } from 'preact'
import { Router, Route } from 'wouter'
import '@/styles/index.css'
import { Home } from '@/pages/Home'
import { Menu } from '@/pages/Menu'

function AppRouter() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/menu" component={Menu} />
    </Router>
  )
}

render(<AppRouter />, document.getElementById('app'))
