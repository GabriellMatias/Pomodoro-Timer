import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer } from './style'

export function DefautLayout() {
  return (
    /* ao inves de usar uma div usa o container estilizado do styled components */
    <LayoutContainer>
      <Header />
      {/* outlet eum espaco que vem o conteudo especifico de uma pagina
        da pagina home ou history */}
      <Outlet />
    </LayoutContainer>
  )
}
