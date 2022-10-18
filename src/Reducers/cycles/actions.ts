import { Cycle } from './reducer'

export enum ActionTypes {
  Add_new_cycle = 'Add_new_cycle',
  Interrupt_cycle = 'Interrupt_cycle',
  Mark_Cycle_as_Finished = 'Mark_Cycle_as_Finished',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    /* manda um objeto com o tipo pra determinar a acao que sera realizada pela funcao
      , nao mandar a informacao crua */
    type: ActionTypes.Add_new_cycle,
    payload: {
      newCycle,
    },
  }
}

export function interruptCycleAction() {
  /* nao precisa de activecyleID como parametro pq ja esta
  pegando o active cicle do proprio reducer, aqui basta passar
  o tipo de acao que vc quer q seja realizada, que la 
  no reducer ele ja faz as alteracoes */
  return {
    type: ActionTypes.Interrupt_cycle,
  }
}
export function markCycleAsFinishedAction() {
  return {
    type: ActionTypes.Interrupt_cycle,
  }
}
