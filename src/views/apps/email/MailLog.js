// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Input from '@mui/material/Input'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Backdrop from '@mui/material/Backdrop'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import FormControlLabel from '@mui/material/FormControlLabel'
import Modal from '@mui/material/Modal'
import { format } from 'date-fns'
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { useForm, Controller } from 'react-hook-form'

const MailLog = props => {
  // ** Props
  const {
    store,
    query,
    hidden,
    lgAbove,
    dispatch,
    setQuery,
    direction,
    updateMail,
    routeParams,
    labelColors,
    paginateMail,
    getCurrentMail,
    mailDetailsOpen,
    updateMailLabel,
    handleSelectMail,
    setMailDetailsOpen,
    handleSelectAllMail,
    handleLeftSidebarToggle
  } = props

  const { errors, control, getValues } = useForm()

  // ** State
  const [refresh, setRefresh] = useState(false)
  const [isExpand, setIsExpand] = useState(false)
  const [hide, setHide] = useState(false)
  const [showScheduleButton, setShowScheduleButton] = useState(true)
  const [startDate, setStartDate] = useState(null) //new Date()
  const [endDate, setEndDate] = useState(null) //new Date()
  //modal dates
  const [startDateModal, setStartDateModal] = useState(null) //new Date()
  const [endDateModal, setEndDateModal] = useState(null) //new Date()
  const [open, setOpen] = useState(false)
  const params = {}
  const [providerData, setProviderData] = useState([])
  const [providerOptions, setProviderOptions] = useState([])
  const [selectedProviderId, setselectedProviderId] = useState(null)
  const [hospitalData, setHospitalData] = useState([])
  const [hospitalOptios, setHospitalOptions] = useState([])
  const [selectedHospitalId, setSelectedHospitalId] = useState(null)

  //API
  const ProviderApi = process.env.NEXT_PUBLIC_FETCH_EVENTS_PROVIDERS
  const ScheduleApi = process.env.REACT_APP_PHYSICIAN_SCHEDULING

  const handleClick = () => {
    setIsExpand(!isExpand)
    if (isExpand) {
      setShowScheduleButton(true) // Show the Schedule button when expanding
    } else {
      setShowScheduleButton(false) // Hide the Schedule button when collapsing
    }
  }
  const hideToClick = () => {
    setHide(true)
    setShowScheduleButton(false)
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 20,
    borderRadius: '5px'
  }
  //api for Provider
  useEffect(() => {
    const ProviderFetch = async () => {
      //setLoading(true)
      try {
        const resp = await axios({
          method: 'POST',
          url: ProviderApi,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: JSON.stringify({
            requestType: 'Provider',
            accountId: '1'
          })
        })
        console.log(resp, 'welcome')

        if ((Object.values(resp.data)[0] !== undefined || []) && resp.data.providersList.length !== 0) {
          // Extract the provider data and set it in the state
          const providers = resp.data.providersList.map(pro => ({
            userId: pro.userId,
            firstName: pro.firstName
          }))
          setProviderOptions(providers)
        }
      } catch (err) {
        console.error(err)
      }
    }
    ProviderFetch()
  }, [])

  //api for hospital
  useEffect(() => {
    const HospitalFetch = async () => {
      //setLoading(true);
      try {
        const resp = await axios({
          method: 'POST',
          url: ProviderApi,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: JSON.stringify({
            requestType: 'Facility',
            accountId: '1'
          })
        })
        //setLoading(false);
        if ((Object.values(resp.data)[0] !== undefined || []) && resp.data.facilityList.length !== 0) {
          // Extract the provider data and set it in the state
          const hospitals = resp.data.facilityList.map(hos => ({
            hospitalName: hos.hospitalName,
            hospitalId: hos.hospitalId
          }))
          setHospitalOptions(hospitals)
        }
      } catch (err) {
        //setLoading(false);
        console.error(err)
      }
    }
    HospitalFetch()
  }, [])
  const ScheduleFetch = async () => {
    try {
      const resp = await axios({
        method: 'POST',
        url: ScheduleApi,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: JSON.stringify({
          requestType: 'Scheduling',
          providerId: selectedProviderId,
          hospitalId: selectedHospitalId,
          fromDate: startDateModal,
          toDate: endDateModal,
          scheduledBy: 1,
          accountId: 1
        })
      })
      console.log('Selected Hospital Id:', selectedHospitalId)
      // if (resp.data.leaveDatesApproved.length !== 0) {
      //   MySwal.fire({
      //     title: `Provider is on Leave on`,
      //     text: resp.data.leaveDatesApproved,
      //     icon: "info",
      //     footer: 'On Other dates Provider is Scheduled',
      //     customClass: {
      //       confirmButton: "btn btn-success",
      //     }
      //   })
      // }
      // onScheduleClean("");
      // {
      //   // setScheduleData(resp.data.scheduleResponse);
      //   toast.success(resp.data.scheduleResponse.message, {
      //     position: "bottom-right",
      //   });
      // }
    } catch (err) {
      console.error(err)
    }
  }
  //search data
  const SearchFetch = async () => {
    setLoading(true);
    try {
      const resp = await axios({
        method: "POST",
        url: ScheduleApi,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: JSON.stringify({
          requestType: "search",
          searchProviderId: Array.isArray(provider)
            ? provider?.map((i) => i?.value).join()
            : "",
          hospitalId: hospital,
          fromDate: startDate,
          toDate: EndDate,
        }),
      });
       
      setIsSearched(true);
      setLoading(false);
      {
        setSearchData(resp.data.providerLeavesView);
      }
    } catch (err) {
      setIsSearched(true);
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <>
      {hide ? (
        ''
      ) : (
        <div
          style={{
            backgroundColor: '#ffffff',
            width: isExpand ? '100%' : '100%',
            height: isExpand ? '20%' : '100%',
            padding: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginTop: '-15px' }}>
              <h3>Physician Scheduling</h3>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ marginTop: '12px', cursor: 'pointer' }} onClick={handleClick}>
                <Icon icon='tabler:chevron-down' fontSize={18} />
              </div>
              <div style={{ marginTop: '12px', marginLeft: '18px', cursor: 'pointer' }}>
                <Icon icon='tabler:refresh' fontSize={18} />
              </div>
              <div style={{ marginTop: '12px', marginLeft: '18px', cursor: 'pointer' }}>
                <Icon icon='tabler:x' fontSize={18} onClick={hideToClick} />
              </div>
            </div>
          </div>
          {showScheduleButton && ( // Render the Schedule button only if showScheduleButton is true
            <div style={{ float: 'right', marginTop: '10px' }}>
              <Button variant='contained' size='small' onClick={handleOpen}>
                Schedule
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box sx={style}>
                  <div>
                    <Typography
                      id='modal-modal-title'
                      style={{ backgroundColor: '#F8F8F8', padding: '2px', borderRadius: '5px' }}
                    >
                      <h3 style={{ margin: '6px', color: '#7367F0' }}> Scheduling</h3>
                    </Typography>
                    <div
                      style={{
                        position: 'absolute',
                        left: '96%',
                        bottom: '94%',
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                        borderRadius: '20%',
                        padding: '5px',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        height: '30px',
                        width: '30px'
                      }}
                      onClick={handleClose}
                    >
                      <Icon icon='tabler:x' fontSize={20} style={{ color: '#7367F0' }} />
                    </div>
                  </div>
                  <div style={{ margin: '20px', padding: '10px' }}>
                    <Autocomplete
                      disablePortal
                      id='Provider'
                      getOptionLabel={option => option.firstName}
                      options={providerOptions}
                      value={providerData}
                      onChange={(event, newValue) => {
                        setProviderData(newValue)
                        console.log('Selected Provider:', newValue)
                        // Update the selected hospital's hospitalId
                        if (newValue) {
                          setselectedProviderId(newValue.hospitalId)
                        } else {
                          setselectedProviderId(null)
                        }
                      }}
                      size='small'
                      style={{ marginTop: '23px' }}
                      renderInput={params => <TextField {...params} label='Provider' placeholder='Select Provider' />}
                    />
                    <Autocomplete
                      disablePortal
                      id='Hospital'
                      options={hospitalOptios}
                      getOptionLabel={option => option.hospitalName} // Specify the property to display
                      value={hospitalData}
                      size='small'
                      onChange={(event, newValue) => {
                        setHospitalData(newValue)
                        console.log('Selected his:', newValue)
                        // Update the selected hospital's hospitalId
                        if (newValue) {
                          setSelectedHospitalId(newValue.hospitalId)
                        } else {
                          setSelectedHospitalId(null)
                        }
                      }}
                      style={{ marginTop: '23px' }}
                      renderInput={params => <TextField {...params} label='Hospital' placeholder='Select Hospital' />}
                    />
                    <DatePicker
                      selected={startDateModal}
                      onChange={date => setStartDateModal(date)}
                      customInput={
                        <TextField
                          {...params}
                          label='Start Date'
                          placeholder='Select Start Date'
                          size='small'
                          style={{ marginTop: '23px', width: '440px' }}
                        />
                      }
                      popperPlacement='top'
                      dateFormat='dd MMMM, yyyy' // Set the custom date format
                      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <button onClick={decreaseMonth}>{'<'}</button>
                          <span>{format(date, 'MMMM yyyy')}</span>
                          <button onClick={increaseMonth}>{'>'}</button>
                        </div>
                      )}
                    />
                    <DatePicker
                      selected={endDateModal}
                      onChange={date => setEndDateModal(date)}
                      customInput={
                        <TextField
                          {...params}
                          label='End Date'
                          placeholder='Select End Date'
                          size='small'
                          style={{ marginTop: '23px', width: '440px' }}
                        />
                      }
                      popperPlacement='top'
                      dateFormat='dd MMMM, yyyy' // Set the custom date format
                      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <button onClick={decreaseMonth}>{'<'}</button>
                          <span>{format(date, 'MMMM yyyy')}</span>
                          <button onClick={increaseMonth}>{'>'}</button>
                        </div>
                      )}
                    />
                  </div>
                  <div style={{ borderTop: '1px solid #ebeae8' }}></div>
                  <div style={{ float: 'right', padding: '23px' }}>
                    <Button variant='contained' size='small' onClick={ScheduleFetch}>
                      Proceed
                    </Button>
                    <Button
                      size='small'
                      style={{ marginLeft: '15px', backgroundColor: '#82868B', color: 'white' }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </div>
                </Box>
              </Modal>
            </div>
          )}
          {showScheduleButton && (
            <Grid container rowSpacing={6} columnSpacing={{ xs: 3, sm: 5, md: 6 }} style={{ marginTop: '50px' }}>
              <Grid item xs={6}>
                <Autocomplete
                  multiple
                  id='Provider'
                  size='small'
                  getOptionLabel={option => option.firstName}
                  options={providerOptions}
                  value={providerData}
                  onChange={(event, newValue) => {
                    setProviderData(newValue)
                  }}
                  renderInput={params => <TextField {...params} label='Provider' placeholder='Select Provider' />}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  id='Hospital'
                  options={hospitalOptios}
                  getOptionLabel={option => option.hospitalName} // Specify the property to display
                  value={hospitalData}
                  size='small'
                  onChange={(event, newValue) => {
                    setHospitalData(newValue)
                  }}
                  renderInput={params => <TextField {...params} label='Hospital' placeholder='Select Hospital' />}
                />
              </Grid>
              <Grid item xs={6} style={{ display: 'flex', zIndex: '999', position: 'relative' }}>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  customInput={
                    <TextField {...params} label='Select Start Date' placeholder='Select Start Date' size='small' />
                  }
                  popperPlacement='bottom'
                  dateFormat='dd MMMM, yyyy' // Set the custom date format
                  renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <button onClick={decreaseMonth}>{'<'}</button>
                      <span>{format(date, 'MMMM yyyy')}</span>
                      <button onClick={increaseMonth}>{'>'}</button>
                    </div>
                  )}
                />
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  customInput={
                    <TextField
                      {...params}
                      label='Select End Date'
                      placeholder='Select End Date'
                      size='small'
                      style={{ float: 'right' }}
                    />
                  }
                  popperPlacement='bottom'
                  dateFormat='dd MMMM, yyyy' // Set the custom date format
                  renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <button onClick={decreaseMonth}>{'<'}</button>
                      <span>{format(date, 'MMMM yyyy')}</span>
                      <button onClick={increaseMonth}>{'>'}</button>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={6} style={{ marginTop: '30px' }}>
                <FormControlLabel control={<Checkbox />} label='Show only leaves' />
                <Button variant='contained' size='small' onClick={SearchFetch}>
                  Search
                </Button>
                <Button size='small' style={{ marginLeft: '20px', backgroundColor: '#82868B', color: 'white' }}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          )}
        </div>
      )}
    </>
  )
}

export default MailLog
