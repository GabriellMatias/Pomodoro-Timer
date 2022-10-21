import {
  createContext,
  ReactNode,
  useState,
  useReducer,
  useEffect,
} from 'react'
import { Cycle, CycleReducer } from '../Reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCycleAction,
  markCycleAsFinishedAction,
} from '../Reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

/* interface para o context */
interface cyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsPassed: number
  markCycleAsFinished: () => void
  setNewSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCycle: () => void
}

/* criando contexto para utilizar essas propriedades em todos os componentes da
aplicacao  */
export const CyclesContext = createContext({} as cyclesContextType)

interface CyclesContextsProvidesProps {
  children: ReactNode /* qualquer elemento html valido */
  /* tem que passar a children como parametro para poder usar esse componente em volta
  das rotas, ele precisa saber onde NEsse COMponente as rotas serao colocadas */
}

export function CyclesContextProvider({
  children,
}: CyclesContextsProvidesProps) {
  /* reducer recebe 2 parametros, uma funcao e um valor inicial, 
  a funcao recebe o estado atual do objeto e a acao que o user que realizar */
  const [cyclesState, dispatch] = useReducer(
    /* recebe primeira funcao que esta em outro arq */
    CycleReducer,
    {
      /* recebe os valores iniciais das variavies que serao utilizadas */
      cycles: [],
      activeCycleId: null,
    },
    /* NAO OBRIGATORIO, recebe um 3 parametro que e os dados que foram salvos no local storage */
    () => {
      /* lembrar da tipagem de dados, quando sao retornados do json vem todos como string, entao a data ja da erro pois nao
       e uma string */
      const storedStateJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-2.0',
      )

      if (storedStateJSON) {
        return JSON.parse(storedStateJSON)
      }
      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )

  const { cycles, activeCycleId } = cyclesState
  /* percorre todos os ciclos e encontrar qual tarefa tem o msm id do ciclo ativo, ai sim vc pode desativar ele
   ou fazer algo */
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        /* convertendo para data pois se essas infos forem pegas do localstorage irao vim como string e vai dar erro na aplicacao */
        new Date(activeCycle.startDate),
      )
    }
    return 0
  })

  useEffect(() => {
    /* guardando infos no storage para quando atualizar a page nao perder os dados da pagina */
    const stateJSON =
      JSON.stringify(cyclesState) /* convertendo infos para string */

    /* cuidar para usar o nome que deseja pois todas as infos do localstorage sao colocadas no mesmo local e colocar versao */
    localStorage.setItem('@ignite-timer:cycles-state-2.0', stateJSON)
  }, [cyclesState])

  function setNewSecondsPassed(seconds: number) {
    setSecondsPassed(seconds)
  }

  function markCycleAsFinished() {
    dispatch(markCycleAsFinishedAction())

    /* quando tiver que usar o setAlgo em um useContext, vai no componente pai, faz uma funcao
    com esse setAlgo, e depoiis passa essa funcao como uma variavel do useContext */
  }

  function interruptCycle() {
    dispatch(interruptCycleAction())
  }

  function createNewCycle(data: CreateCycleData) {
    /* ele vai retornar os dados colocados nos inputs do formulario que foram gravados
    pelo onSubmit={handleSubmit} do forms, como essa funcao esta sendo passada como parametro da
    funcao do hook forms eu tenho acesso aos dados dos inputs */
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutes: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    /* se uma alteracao de estado depender do valor anterior salva como aerofunction
    [closures] 
    ex: setCycles((state) => [...state, newCycle])
    // setActiveCycleId(id) */
    setSecondsPassed(0)
  }

  return (
    <CyclesContext.Provider
      /* mantem no contexto coisas que nao mudam caso voce nao use alguma blibioteca */
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCycleAsFinished,
        secondsPassed,
        setNewSecondsPassed,
        interruptCycle,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
