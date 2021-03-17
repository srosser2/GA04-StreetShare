import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import 'bulma'
import axios from 'axios'

import Form from '../components/form'
import SideDraw from '../components/sideDraw'
import ItemTab from '../components/profile/itemTab'
import BookingTab from '../components/profile/bookingTab'


import { getLoggedInUser } from '../lib/auth'
import useAxios from '../hooks/useAxios'
import { useFileUploads } from '../contexts/FileUploadProvider'

const Profile = ({ match, location }) => {

  const ITEMS = 'items'
  const BOOKINGS = 'bookings'
  const BORROWING = 'borrowing'

  const currentUser = getLoggedInUser()
  const token = localStorage.getItem('token')

  const { loading, results, error } = useAxios({ url: `/api/users/${match.params.id}`, method: 'get' })
  const { loading: bookingLoading, results: bookingResults, error: bookingError } = useAxios({ url: `/api/users/${match.params.id}/bookings`, method: 'get' })
  const { selectedFile, updateSelectedFile, getBase64, fileBase64, uploadImageHandler, fileIsUploading } = useFileUploads()
  const { loading: categoriesLoading, results: categoryResults, error: categoryError } = useAxios({ url: '/api/categories', method: 'get' })
  const [showSideDraw, updateShowSideDraw] = useState(false)
  const [itemForm, updateItemForm] = useState({
    title: {
      label: 'Item',
      element: 'input',
      type: 'text',
      placeholder: 'Enter an item name',
      classes: ['input'],
      value: '',
      validation: {
        required: true
      },
      dirty: false
    },
    category: {
      label: 'Category',
      element: 'select',
      type: 'select',
      isMulti: false,
      value: [],
      options: [],
      validation: {
        required: false
      }
    },
    description: {
      label: 'Description',
      element: 'textarea',
      type: 'text',
      placeholder: 'Enter a description',
      value: '',
      classes: ['textarea'],
      validation: {
        required: true
      },
      dirty: false
    },
    note: {
      label: 'Notes',
      element: 'input',
      classes: ['input'],
      type: 'text',
      placeholder: 'Enter a note',
      value: '',
      validation: {
      },
      dirty: false
    },
    image: {
      label: 'Upload an Image',
      element: 'file-input',
      type: 'select',
      value: '',
      validation: {
        required: false
      }
    }
  })
  const [currentTab, updateCurrentTab] = useState('items')

  useEffect(() => {
    if (categoryResults && categoryResults.length < 1) return
    const categories = categoryResults.map(category => {
      return {
        label: category.name,
        value: category.id
      }
    })
    const updatedItemForm = { ...itemForm }
    updatedItemForm.category.options = categories
    updateItemForm(updatedItemForm)
  }, [categoryResults])

  useEffect(() => {
    if (selectedFile instanceof File) {
      getBase64(selectedFile)
    }
  }, [selectedFile])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tab = params.get('tab')
    updateCurrentTab(tab)
  }, [match.params])

  // Display something while loading
  if (loading) {
    return <h1>Loading</h1>
  }

  // If user is not found
  if (!results.id) {
    return <h1>User not found</h1>
  }

  const sideMenuItems = [
    {
      label: 'My Items',
      img: "https://img.icons8.com/dusk/30/000000/package.png",
      link: `/profile/${match.params.id}?tab=${ITEMS}`
    },
    {
      label: ' My Booking Agreements',
      img: "https://img.icons8.com/dusk/30/000000/agreement.png",
      link: `/profile/${match.params.id}?tab=${BOOKINGS}`
    },
    {
      img: "https://img.icons8.com/dusk/30/000000/cancel-subscription.png",
      label: ' My Borrowing Agreements',
      link: `/profile/${match.params.id}?tab=${BORROWING}`
    }
  ]



  const sideMenu = sideMenuItems.map((menuItem, i) => {
    return (
      <div style={{ margin: '30px 30px', display: 'flex', alignItems: 'center' }} key={i}>
        <img src={menuItem.img} style={{ marginRight: '15px' }} />
        <NavLink to={menuItem.link} style={{ fontSize: '14px' }}>{menuItem.label}</NavLink>
      </div>
    )
  })


  // const userItems = results.items.map(item => {
  //   return <div key={item.id} className={'card'}>
  //     <div className={'card-image-container'}>
  //       <img src={item.image} />
  //     </div>
  //     <div className={'card-description-container'}>
  //       <h4>{item.title}</h4>
  //       <p>{item.description}</p>
  //     </div>
  //   </div>
  // })

  // const itemTable = results.items.map(item => {
  //   return <tr key={item.id} className={'table-row'} >
  //     <td>
  //       <div className={'table-row-item'}>
  //         <div className={'table-image-container'}>
  //           <img src={item.image} />
  //         </div>
  //         <p>{item.title}</p>
  //       </div>
  //     </td>
  //     <td>{item.category}</td>
  //     <td>{item.description}</td>
  //     <td>Status</td>
  //   </tr>
  // })

  const bookingsTab = <>
    <div>
      <h2>My Bookings</h2>
    </div>
  </>

  const borrowingTab = <>
    <div>
      <h2>Borrowed Items</h2>
    </div>
  </>

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...itemForm }
    updatedForm[name].value = value
    updateItemForm(updatedForm)
  }

  const handleSelectChange = (e, name) => {
    const updatedForm = { ...itemForm }
    updatedForm[name].value = e.value
    updateItemForm(updatedForm)
  }

  const formControls = {
    submit: {
      label: 'Create Item',
      handler: async () => {
        const file = await uploadImageHandler()

        const itemObj = {}

        for (const field in itemForm) {
          itemObj[field] = itemForm[field].value
        }
        itemObj.image = file.url

        const axiosConfig = {
          url: '/api/items',
          method: 'post',
          data: itemObj,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        axios.request(axiosConfig).then(({ data }) => {
          console.log(data)
        })
      },
      classes: ['button is-success', 'addOn']
    }
  }

  const handleFileChange = (e) => {
    updateSelectedFile(e.target.files[0])
  }

  const itemFormElement = <Form
    config={itemForm}
    controls={formControls}
    onChange={handleChange}
    onSelectChange={handleSelectChange}
    onFileChange={handleFileChange}
  />

  let tabBody

  switch (currentTab) {
    case ITEMS: {
      tabBody = <ItemTab items={results.items} showSideDrawHandler={updateShowSideDraw} match={1} />
      break
    }
    case BOOKINGS: {
      tabBody = <BookingTab bookings={results.bookings} showSideDrawHandler={updateShowSideDraw} />
      break
    }
    case BORROWING: {
      tabBody = borrowingTab
      break
    }
    default: {
      tabBody = <ItemTab items={results.items} showSideDrawHandler={updateShowSideDraw} match={match} />
    }
  }

  const sideDraw = showSideDraw ?
    <SideDraw closeSideDrawHandler={() => updateShowSideDraw(false)}>
      {itemFormElement}
      {fileIsUploading ? <p>Item uploading</p> : <p></p>}
    </SideDraw> : null

  return <div className={'profile-container'}>
    <div className={'side-menu'}>
      <div className={'side-menu-avatar-container'}>
        <figure className={'side-menu-avatar'}>
          <img src={results.profilePic} alt={results.lastName} />
        </figure>
      </div>
      <div className={'side-menu-nav-container'}>
        {sideMenu}
      </div>
    </div>
    <div className={'profile-main-container'}>

      <div className={'profile-title-section'}>
        <h1>{results.firstName} {results.lastName}</h1>
        <h2>{results.address}</h2>
      </div>
      <div className={'profile-body-container'}>

        {tabBody}
        {/* <div className={'card-container'}>
          {userItems}
        </div> */}
      </div>

    </div>

    {sideDraw}
  </div>
}

export default Profile