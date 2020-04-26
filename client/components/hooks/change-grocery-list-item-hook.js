import {useState} from 'react'
import {useHistory} from 'react-router-dom'

const changeToGroceryForm = () => {
  const history = useHistory()

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

  const handleSubmit = event => {
    if (event) {
      event.preventDefault()
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

  const handleRemoveButton = event => {
    if (event) {
      event.preventDefault()
      let index = event.target.getAttribute('index')
      let splicedItems = [...items]
      splicedItems.splice(index, 1)
      setItems(splicedItems)
    }
  }

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
