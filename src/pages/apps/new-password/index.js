// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Image from 'next/image'
import { useForm, Controller } from 'react-hook-form'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import screen from '../../../../public/images/pages/logo.jpeg'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'


import themeConfig from 'src/configs/themeConfig'


// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Styled Components
// const ResetPasswordIllustration = styled('img')(({ theme }) => ({
//   zIndex: 2,
//   maxHeight: 650,
//   marginTop: theme.spacing(12),
//   marginBottom: theme.spacing(12),
//   [theme.breakpoints.down(1540)]: {
//     maxHeight: 550
//   },
//   [theme.breakpoints.down('lg')]: {
//     maxHeight: 500
//   }
// }))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})


const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: `${theme.palette.primary.main} !important`
}))





const ResetPasswordV2 = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))



  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })


const newimageSource = 'auth-v2-login-illustration'

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
        sx={{
          flex: 1,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          borderRadius: '20px',
          justifyContent: 'center',
          backgroundColor: 'customColors.bodyBg',
          // margin: theme => theme.spacing(8, 0, 8, 8)
          width: '40%', // Adjust the width of the image container as needed
          margin: theme => theme.spacing(-30),
          maxHeight: '119vh',
          overflow: 'hidden'
        }}
      >
        {/* <LoginIllustration alt='login-illustration' src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} />
        <FooterIllustrationsV2 /> */}
        <LoginIllustration
          alt='login-illustration'
          src={`/images/pages/${newimageSource}-${theme.palette.mode}.png`}
          sx={{
            backgroundColor: 'customColors.bodyBg !important',
            maxWidth: '100%', // Use available width
            marginLeft: '200px',
            marginTop: '190px'
          }}
        />

        <Image
          src={screen}
          alt='noimg'
          style={{
            position: 'absolute',
            top: '21%', // Adjust the vertical position as needed
            left: '17%', // Adjust the horizontal position as needed
            cursor: 'pointer'
          }}
        />
        <FooterIllustrationsV2 />
      </Box>
      ) : null}
      <RightWrapper>
        {/* <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        > */}
                <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70%', // Adjust the width of the image container as needed
            marginLeft: theme => theme.spacing(35)
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            {/* <svg width={34} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
              />
            </svg> */}
             <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 0.5 }}>
                {/* {`Welcome to ${themeConfig.templateName}! 👋🏻`} */}
                Reset Password 
              </Typography>
              {/* <Typography sx={{ color: 'text.secondary' }}>
                Please sign-in to your account and start the adventure
              </Typography> */}
            </Box>
            <Box sx={{ my: 6 }}>
              <Typography variant='h6' sx={{ mb: 1.5 }}>
               Set New Password
              </Typography>
              {/* <Typography sx={{ display: 'flex' }}>
                for{' '} 🔒
                <Typography component='span' sx={{ ml: 1, fontWeight: 500 }}>
                  john.doe@email.com
                </Typography>
              </Typography> */}
            </Box>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            {/* <CustomTextField
                fullWidth
                autoFocus
                label='Your Email'
                value={values.email}
                placeholder='············'
                sx={{ display: 'flex', mb: 4 }}
                id='auth-email'
                onChange={handleEmail('email')}
                type={values.showEmail ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowEmail}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle email visibility'
                      >
                        <Icon fontSize='1.25rem' icon={values.showEmail? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              /> */}
                <Box sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='john@example.com'
                      // error={Boolean(errors.email)}
                      // {...(errors.email && { helperText: errors.email.message })}
                    />
                  )}
                />
              </Box>
              {/* <CustomTextField
                fullWidth
                autoFocus
                label='New Password'
                value={values.newPassword}
                placeholder='············'
                sx={{ display: 'flex', mb: 4 }}
                id='auth-reset-password-v2-new-password'
                onChange={handleNewPasswordChange('newPassword')}
                type={values.showNewPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowNewPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon fontSize='1.25rem' icon={values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              /> */}

              <Box sx={{ mb: 4 }}>
                <Controller
                  name='code'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label='Code'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='123456'
                      error={Boolean(errors.code)}
                      {...(errors.code && { helperText: errors.code.message })}
                    />
                  )}
                />
              </Box>
              {/* <CustomTextField
                fullWidth
                label='Confirm Password'
                placeholder='············'
                sx={{ display: 'flex', mb: 4 }}
                value={values.confirmNewPassword}
                id='auth-reset-password-v2-confirm-password'
                type={values.showConfirmNewPassword ? 'text' : 'password'}
                onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmNewPassword}
                      >
                        <Icon
                          fontSize='1.25rem'
                          icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'}
                        />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              /> */}
              {/* <Box sx={{ mb: 4.5 }}>
                <Controller
                  name='confirmPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='Confirm Password'
                      onChange={onChange}
                      placeholder='············'
                      id='auth-login-v2-password'
                      error={Boolean(errors.confirmPassword)}
                      {...(errors.confirmPassword && { helperText: errors.confirmPassword.message })}
                      type={showConfirmPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showConfirmPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Box> */}
             <Box sx={{ mb: 4.5 }}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='New Password'
                      onChange={onChange}
                      placeholder='············'
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Box>
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                Submit New Password
              </Button>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                <Typography component={LinkStyled} href='/login'>
                  <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                  <span>Back to login</span>
                </Typography>
              </Typography>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
ResetPasswordV2.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ResetPasswordV2
