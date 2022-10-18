import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../contexts/CycleContext'
import { CountDownContainer, Separator } from './styles'

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCycleAsFinished,
    secondsPassed,
    setNewSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  /* padStart, coloca quantos character quer q apareca em tela, caso nao tenha 2 
  characteres o que faltar vai ser preenchido com '0' */
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number /* criar fora do If para usar na funcao e zerar o contador 
    quando uma nova tarefa for ativada */

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiferrence = differenceInSeconds(
          new Date(),
          /* convertendo para data pois se essas infos forem pegas do localstorage irao vim como string e vai dar erro na aplicacao */
          new Date(activeCycle.startDate),
        )
        if (secondsDiferrence >= totalSeconds) {
          markCycleAsFinished() // funcao chamada do use context para nao ter que importar um setAlgo
          setNewSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setNewSecondsPassed(secondsDiferrence)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCycleAsFinished,
    setNewSecondsPassed,
  ])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>

      <Separator>:</Separator>

      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
