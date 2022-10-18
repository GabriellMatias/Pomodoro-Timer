import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartButtonContainer,
  StopButtonContainer,
} from './styles'
import { NewCycleForm } from './NewCiclyForm'
import { CountDown } from './CountDonw'
import * as zod from 'zod' /* como a blibio nao tem export default, importa tudo e da um nome */
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'

/* Schema = formato, define um formato e valida os dados do formulario 
de acordo com esse formato */
const newCycleFormValidationSchema = zod.object({
  /* primeiro vem a validacao e depois a mensagem caso a validacao nao seja satisfeita */
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'valor informado abaixo do limite')
    .max(60, 'valor informado acima do limite'),
})

/* interface newCycleFormData {
  task: string
  minutesAmount: number
} */
/* ==== */
type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
/* olha a constante la em cima e ja faz uma interface de acordo com os campos que foram
pedidos a validacao, entao nao precisamos criar uma interface pois o zod ja faz isso pra gente
com o zod.infer */
/* passar o parametro como typeof por que e uma variavel JS e precisa "converter" em TS */

export function Home() {
  const { createNewCycle, interruptCycle, activeCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<newCycleFormData>({
    /* passa qual e o Schema de validacao que vc quer, qual as regras */
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  /* usando o tipo controled para a validacao somente das tasks, ou seja, a 
  cada palavra que o user digitar ele atualiza o componente */
  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task') /* variavel ta observando o campo de task, o nome
  do input no forms, da pra usar essa variavel agora pra fazer por exemplo a desabilitacao do botao
  de acordo com a mudanca dessa variavel */

  const isSubmitDesabled = !task

  function handleCreateNewCycle(data: newCycleFormData) {
    /* basicamente para separar esse reset e nao deixar o context dependente
    de outras blibios */
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        {/* utilizando form provider para utilizar o useFormContext dentro do 
          newCycle Form */}
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StopButtonContainer type="button" onClick={interruptCycle}>
            <HandPalm />
            Stop
          </StopButtonContainer>
        ) : (
          <StartButtonContainer type="submit" disabled={isSubmitDesabled}>
            <Play />
            Start
          </StartButtonContainer>
        )}
      </form>
    </HomeContainer>
  )
}
