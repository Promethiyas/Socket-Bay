import React, { useEffect } from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 4,
  width: 50,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '3px',
  alignItems: 'center',
  borderRight: '1px solid #000'
}))

interface CountdownDealProps {
  date: Date
}

export function CountdownDeal ({ date }: CountdownDealProps): JSX.Element {
  const [time, setTime] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = date.getTime() - now
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTime({ days, hours, minutes, seconds })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div>
      <Stack spacing={1} direction='row'>
        <Item>
          <Typography variant='body1'>{time.days}</Typography>
          <Typography variant='caption'>Days</Typography>
        </Item>

        <Item>
          <Typography variant='body1'>{time.hours}</Typography>
          <Typography variant='caption'>Hours</Typography>
        </Item>

        <Item>
          <Typography variant='body1'>{time.minutes}</Typography>
          <Typography variant='caption'>Min</Typography>
        </Item>

        <Item>
          <Typography variant='body1'>{time.seconds}</Typography>
          <Typography variant='caption'>Sec</Typography>
        </Item>

      </Stack>
    </div>
  )
}
