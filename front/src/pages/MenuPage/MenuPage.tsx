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
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const mes = [
    'January',
    'January',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const dia = new Date()

  function saudacao() {
    if (horario >= 0 && horario <= 5) {
      setMensagem('Good Night!')
    } else if (horario >= 6 && horario < 12) {
      setMensagem('Good Moorning!')
    } else if (horario >= 12 && horario < 18) {
      setMensagem('Good Afternoon!')
    } else if (horario >= 18 && horario <= 23) {
      setMensagem('Good Night!')
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
              {semana[dia.getDay()]}, {dia.getDate()}th {mes[dia.getMonth()]}
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
              Tasks to do
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
              <strong style={{ color: '#000' }}>Lists</strong>
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
                <Link to="/mytasks">Tasks list</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarHeaderTeamplate>
  )
}
