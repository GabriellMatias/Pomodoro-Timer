import 'styled-components'
/* importa o styled componentes pois vai apenas adicionar mais uma tipagem a ele
 nao criar uma do 0 para ele [note que na pasta node modules/styled-components 
vc acha a tipagem completa dessa blibioteca] */

import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  /* esse DefaulTheme e uma interface propria do style components, nao o arquivo que voce
  criou para tipar as cores */
  export interface DefaultTheme extends ThemeType {}
}
