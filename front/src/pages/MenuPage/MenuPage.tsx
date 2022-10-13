import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarHeaderTeamplate } from '../../templates/SidebarHeaderTeamplate'

export function MenuPage() {
  const data = new Date().toLocaleTimeString('pt-BR', {
    hour: 'numeric',
    hour12: false,
  })
  const horario = +data
  const [mensagem, setMensagem] = useState('')
  const semana = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira ',
    'Sábado',
  ]
  const mes = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]
  const dia = new Date()

  function saudacao() {
    if (horario >= 0 && horario <= 5) {
      setMensagem('Boa noite!')
    } else if (horario >= 6 && horario < 12) {
      setMensagem('Bom dia!')
    } else if (horario >= 12 && horario < 18) {
      setMensagem('Boa tarde!')
    } else if (horario >= 18 && horario <= 23) {
      setMensagem('Boa noite!')
    }
  }

  useEffect(() => {
    saudacao()
  }, [])

  return (
    <SidebarHeaderTeamplate>
      <div style={{ width: '100%' }}>
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: '20px', color: '#000' }}>
              {semana[dia.getDay()]}, {dia.getDate()} {mes[dia.getMonth()]}
            </div>
            <div
              style={{ fontSize: '36px', color: '#000', fontWeight: 'bold' }}
            >
              {mensagem}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '50%',
                height: '200px',
                background: '#F0F0F0',
                padding: '10px',
                margin: '10px',
                borderRadius: '8px',
                color: '#000',
              }}
            >
              Tarefas a fazer
              <hr
                style={{
                  width: '100%',
                  borderTop: '1px solid #000',
                }}
              />
            </div>
            <div
              style={{
                width: '20%',
                height: '200px',
                background: '#F0F0F0',
                padding: '10px',
                margin: '10px',
                borderRadius: '8px',
              }}
            >
              <strong style={{ color: '#000' }}>Listas</strong>
              <hr
                style={{
                  width: '100%',
                  borderTop: '1px solid #000',
                }}
              />
              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  color: '#000',
                }}
              >
                <Link to="/tasker/tasks">Lista de tarefas</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarHeaderTeamplate>
  )
}
