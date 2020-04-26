import {useState} from 'react'
import {useHistory} from 'react-router-dom'

const changeToGroceryForm = () => {
  const history = useHistory()

  // PENDING: viewing purposes only, remove mock list items and replace 'items' state with empty array after connection to store is made to update buyer's list
  let mockListItems = [
    {
      name: 'Toilet Paper',
      qtyTotal: 24,
      unitType: 'single',
      qtyAvailable: 12
    },
    {
      name: 'Oranges',
      qtyTotal: 2,
      unitType: 'pack',
      qtyAvailable: 0
    },
    {
      name: 'Variety Chips',
      qtyTotal: 30,
      unitType: 'single',
      qtyAvailable: 20
    }
  ]

  const defaultItem = {unitType: 'single'}
  const [item, setItem] = useState(defaultItem)
  const [items, setItems] = useState(mockListItems)

  // Submit all items to buyer's list
  const handleSubmit = event => {
    if (event) {
      event.preventDefault()
      // PENDING: call to be made to store updating buyer's list with all items
      history.push('/home')
    }
  }

  const handleChange = event => {
    event.persist()
    setItem(() => {
      return {
        ...item,
        [event.target.name]: event.target.value
      }
    })
  }

  // Remove an item from the list
  const handleRemoveButton = event => {
    if (event) {
      event.preventDefault()
      let index = event.target.getAttribute('index')
      let splicedItems = [...items]
      splicedItems.splice(index, 1)
      setItems(splicedItems)
    }
  }

  // Add an item to the list
  const handleAddButton = event => {
    if (event) {
      event.preventDefault()
      setItems([...items, item])
      setItem(defaultItem)
    }
  }

  return {
    handleSubmit,
    handleChange,
    handleRemoveButton,
    handleAddButton,
    item,
    items
  }
}

export default changeToGroceryForm
