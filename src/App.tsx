import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './contexts/CycleContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* tema escolhido vai ser aplicado para os 
    componentes que estiverem dentro desse ThemeProvideder */}
      <BrowserRouter>
        <CyclesContextProvider>
          {/* BrowseRouter tem que estar em volta das rotas */}
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
