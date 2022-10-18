import { FormContainer, TaskNumberInput, TaskTextInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../../contexts/CycleContext'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  /* so funciona se tiver um Form Provider em volta do componente desejado, faz  a mesma coisa que 
  o useContext, mas nesse caso ja vem para as funcoes da blibioteca ReactHookForm */
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">I`m gonna work in</label>
      <TaskTextInput
        type="text"
        id="task"
        disabled={!!activeCycle}
        placeholder="give a name to your project"
        list="task-suggestions"
        {...register(
          'task',
        )} /* register e uma funcao que recebe como parametro o nome
            do input e retorna os metodos do JS, onchange, onBlur, etc */
      />
      <datalist id="task-suggestions">
        <option value="Projeto 01" />
        <option value="Projeto 01" />
      </datalist>

      <label htmlFor="minutesAmount">, During</label>
      <TaskNumberInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5} /* pula de 5 em 5 */
        max={60}
        min={5}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>Minutes.</span>
    </FormContainer>
  )
}
