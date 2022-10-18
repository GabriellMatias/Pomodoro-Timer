import { Route, Routes } from 'react-router-dom'
import { DefautLayout } from './layouts/DefaultLayout'
import { History } from './pages/History'
import { Home } from './pages/Home'

export function Router() {
  return (
    <Routes>
      {/* aplica layout em todas as rotas por isso usa o Route em volta dessas outras rotas */}
      <Route path="/" element={<DefautLayout />}>
        {/* o componente que vai carregar quando tiver na rota path e o element.. */}
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
