import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutes: number
  startDate: Date /* salva a data de quando iniciou o ciclo para que 
  com base nessa data saiba quanto tempo realmente passou */
  interruptedDate?: Date
  finishDate?: Date
}
interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CycleReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.Add_new_cycle:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // }

      /* ===== */

      /* usando o produce da blibioteca immer, faz com que possamos
      utilizar as variavieis imutavel como variaveis normais, passando 
      novos valores para elas sem precisar passar todo o array como se
      fosse uma variavel imutavel */
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.Interrupt_cycle: {
      /* REALIZANDO A INTERRUPCAO SEM NENHUMA BLIBIOTECA, RESPEITANDO 
      A IMUTABILIDADE DAS VARIAVEIS */

      //   return {
      //     ...state,
      //     cycles:
      //       /* percorre ciclos, aquele que tiver o ciclo ativo ele vai mudar o interruptdate
      //   tem que colocar o spread com os outros ciclos por causa do conceito de imutabilidade do react
      //   caso ele nao ache o ciclo ativo ele simplismente retorna todos so ciclos */ // )
      //       state.cycles.map((cycle) => {
      //         if (cycle.id === state.activeCycleId) {
      //           return { ...cycle, interruptedDate: new Date() }
      //         } else {
      //           return cycle
      //         }
      //       }),

      //     /* seta como null pois acabamos de interromper um ciclo, isso vai
      // zerar o relogio */
      //     activeCycleId: null,
      //   }

      /* REALIZANDO A INTERRUPCAO COM A BLIBIO IMEER (PRODUCE),
      TRATANDO A IMUTABILIDADE COMO SE FOSSEM VARIAVEIS NORMAIS */

      const currentCycleIndex = state.cycles.findIndex((cycles) => {
        return cycles.id === state.activeCycleId
      })
      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }

    case ActionTypes.Mark_Cycle_as_Finished: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, finishDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null,
      // }

      const currentCycleIndex = state.cycles.findIndex((cycles) => {
        return cycles.id === state.activeCycleId
      })
      /* remember = o findIndex retorna -1 se ele nao achar nenhum id
      do ciclo igual ao id passado */
      if (currentCycleIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishDate = new Date()
        draft.activeCycleId = null
      })
    }
    default:
      return state
  }
}
