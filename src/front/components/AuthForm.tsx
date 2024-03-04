import {
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  TextField
} from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { LoginFormData } from '../../types/types.ts'

export function AuthForm() {
  const [formData, setFormData] = React.useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleEmailChange = (e: any) =>
    setFormData({ ...formData, email: e.target.value })
  const handlePasswordChange = (e: any) =>
    setFormData({ ...formData, password: e.target.value })
  const handleRememberMeChange = (e: any) =>
    setFormData({ ...formData, rememberMe: e.target.value === 'on' })

  return (
    <Paper elevation={6}>
      <Container>
        <Typography gutterBottom variant="h5" component="div">
          Login
        </Typography>
        <Divider />
        <Stack direction="column">
          <TextField
            value={formData.email}
            onChange={handleEmailChange}
            label="Email"
            variant="outlined"
          />
          <TextField
            label="Password"
            value={formData.password}
            onChange={handlePasswordChange}
            variant="outlined"
          />
          <Checkbox
            value={formData.rememberMe ? 'on' : 'off'}
            onChange={handleRememberMeChange}
          />
        </Stack>
      </Container>
    </Paper>
  )
}
