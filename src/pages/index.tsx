import * as React from 'react'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'

import { dataKyiv, dataKharkiv } from '../data'

const KYIV_TICKET_COUNT = 110
const KHARKIV_TICKET_COUNT = 80

const Wrapper = styled('div')`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid #555555;
  box-sizing: border-box;
`

const Title = styled('div')`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`

const SubTitle = styled('div')`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`

const Text = styled('div')`
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
`

const Input = styled('input')`
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #555;
  padding: 5px 10px;
  line-height: 16px;
  width: 150px;
  text-align: center;
`

const Separator = styled('hr')`
  border: none;
  border-bottom: 1px solid #555;
  height: 0px;
  width: 100%;
  margin: 20px 0;
`

const Table = styled('table')`
  border: 1px solid #555;
  border-collapse: collapse;
`

const Td = styled('td')`
  border: 1px solid #555;
  padding: 0;
  line-height: 20px;
  font-size: 18px;
  height: 20px;
  width: 25px;
  color: #317b03;
  font-weight: bold;

  &:nth-of-type(even) {
    background: rgba(0, 0, 0, 0.1);
  }

  strong {
    color: #000;
  }
`

const TicketsBlock = ({ title, data, ticketsCount }: any) => {
  const [ticket, setTicket] = React.useState(0)

  const handleTicketChange = (e: any) => {
    let value = 0
    if (e.target.value > ticketsCount) {
      value = 0
    } else {
      value = e.target.value || 0
    }
    setTicket(value)
  }

  const renderTop = () => {
    return (
      <>
        <Title>{title}</Title>
        <Text>Выберите номер билета 1-{ticketsCount}</Text>
        <Input
          type="number"
          placeholder="номер билета"
          value={!!ticket ? ticket : ''}
          onChange={handleTicketChange}
        />
      </>
    )
  }

  const getAnswers = () => {
    return (
      <>
        <SubTitle>Ответы на билет №{ticket}</SubTitle>
        <Table>
          <tbody>
            <tr>
              {data[`ticket-${ticket}`].map((_: any, index: number) => {
                return (
                  <Td key={index}>
                    <strong>{index + 1}</strong>
                  </Td>
                )
              })}
            </tr>
            <tr>
              {data[`ticket-${ticket}`].map((item: any, index: number) => {
                return <Td key={index}>{item}</Td>
              })}
            </tr>
          </tbody>
        </Table>
      </>
    )
  }

  return (
    <>
      {renderTop()}
      {getAnswers()}
    </>
  )
}

const Index = () => {
  return (
    <>
      <Global
        styles={css`
          body {
            padding: 0;
            margin: 0;
          }
        `}
      />
      <Wrapper>
        <TicketsBlock
          title="Киевское издание"
          data={dataKyiv}
          ticketsCount={KYIV_TICKET_COUNT}
        />
        <Separator />
        <TicketsBlock
          title="Харьковское издание"
          data={dataKharkiv}
          ticketsCount={KHARKIV_TICKET_COUNT}
        />
      </Wrapper>
    </>
  )
}

export default Index
