# styles components
  >cria um arquivo .TS / exporta uma const como se fosse um componente que vai apenas modificar o estilo de outros componentes
  >passa parametros pra estilizar etc [facilita caso queira fazer uma troca de temas(dark:light)]

  

# ARQS DE TIPAGEM(TS)  
  >cria uma pasta @types
  >cria um arq.D.TS
  >d.ts 
    >so aceita codigo totalmente typescript
    >arq de definicao de tipos
    > voce define


# ESlint
  >valida que o cod ta seguindo padroes estipulados pelos criadores do projeto
  >define padrao de codigo para o grupo, exemplo usar ou nao o ; no final ou aspas duplas
  >cria o arq .eslintrc.json
    >coloca um {extends: nome das config que vc ta usando}
    >esse e um arq de config para o ESlint
  >joga a configuracao que vc quer importar dentro desse arquivo e depois inicia ele com o comando npx eslint src --ext .ts,.tsx == npx eslint NOMEDAPASTA --ext TIPODEARQUIVOS

  # OBS
  > tem como "criar comandos na pasta package.json, coloca o comando e o
    apelido dele por exemplo o lint" 
        "lint": "npx eslint src --ext .ts,.tsx"
    quando quiser rodar esse comando so dar um npm run lint

# ROTAS DO REACT
  >react route DOM
  >o componente que vai carregar quando tiver na rota path e o element.. 
  >tem que usar o BBrowserRouter em volta das rotas para funcionar


# React Hook Form

>Formularios/Inputs
  >controled
    >manter em tempo real as mudancas do forms atualizando em tempo real o estado do react
    > da muita fluidez para deixar de mostrar ou mostrar coisas para o usuario em tela de acordo com a mudanca do estado do campo input
    >contudo ele vai renderizar o componente denovo TODA vez que vc digitar uma letra nova (Cuidado para nao virar gargalo)

  >uncontrole
    >so pega a informacao quando precisar dela
    >ganha performace mas perde a fluidez
    >por exemplo so renderiza tudo dnovo quando a pessoa clicar no botao submit do forms

  
  >pra usar importa o useForm, funcao que se chama no componente
      >chama a register e handleSubmit com a desistruturacao de funcao
      Const {register, handleSubmit}=useform<TYPE>([])

  >vai no input e da um {...register('taks')} > voce acabou de dar um nome para esse input

  >a funcao register recebe o nome do input e devolve metodos como onChange, etc etc

  >Nao tem validacao de formularios
  >entao usa as blibo de validacao que ele integra 
    >zod 
      >blibio de validacao de forms
      >npm i @hookform/resolvers
      


# Estudar +
  >blibio ZOD!
  >React Hook Form[USEFORM]
  >As CONST
  >Styled Components[talvez]
  >sobre qual diferenca de TH, TD, como usar tabela em HTML


# UseEffect
  >Efeito colateral
    >se fez algom isso tem um efeito colateral
  >Monitora mudancas em uma variavel, e quando essa variavel mudar eu posso disparar uma funcao
  >recebe 2 parametros
    > qual funcao vai ser executada
    >qual variavel vai ser monitorada
  >executa assim que o componente e exibido em tela, de primeira ele ja executo
  >executa 2x, no comeco da aplicacao e quando a variavel muda, se vc nao passar a variavel ele so vai ser executado no comeco da aplicacao
  >Cuidar para nao utilizar sem necessidade, se nao vai ocorrer mais atualizacoes de componentes desnecessarias
  >dificilmente utilizado para atualizar o estado

# Prop Dilling
  >qunado a gente tem muitas propriedades apenas para comunicacao entre componentes, o codigo ficar mais confuso se tivesse tudo em um componente so
  ># Context API
    >permite compartilhar informacoes entre varios componentes ao mesmo tempo
    >como se fosse informacoes globais
    >importa o createContext = armazenda em uma variavel
    >createContext = recebe o valor inicial desse contexto
      >useContext
      >cria objeto e usa o useContext(passando o nome da variavel do create context)
    >para passar como parametro, cria o Context API no componente PAI dos filhos que deseja passar as informacoes
    >em volta dos componentes FILHOS usa o <NOMEDAAPI.Provider value=({passa as variavies desesjadas})/>

# Reducers
  > utilizad para trabalhar com listas de uma maneira mais facil, junta tudo em um arq que vc pode tratar de varias maneiras
  >useReducer recebe a funcao que vai receber dois parametros, o objeto e uma acao, ai vc escolhe qual vai ser a acao tomada de acordo com aquele objeto [normalmente utiliza ele com o swtich ou ifs]
  > depois vc passa os valores iniciais de cada um
  >tipo um useState, mas e utilizado para tratar de dados mais robustos
  >usa o dispatch(TYPE[NOME DA ACAO], PAYLOAD[INFOS QUE SERAO ALTERADAS])

# Immer
  >utilizado para tratar o conceito de imutabilidade com mais facilidade
  > por exemplo, facilita quando deseja mudar o valor de uma variavel dentro de um objeto, nao precisa fazer o map etc, vc passa o index e o que quer modificar na variavel
  > pode modificar normalmente como se ela NAO fosse uma variavel imutavel pois essa blibio abstrai o conceito de imutabilidade do react