import {useState} from 'react'

const changeToGroceryForm = () => {
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
    console.log(item)
  }

  const handleChangeButton = event => {
    if (event) {
      if (event.target.name === 'add-item') {
        setItems([...items, item])
        setItem(defaultItem)
      } else if (event.target.name === 'remove-item') {
        let index = event.target.getAttribute('index')
        let splicedItems = [...items]
        splicedItems.splice(index, 1)
        setItems(splicedItems)
      }
    }
  }

  return {
    handleSubmit,
    handleChange,
    handleChangeButton,
    item,
    items
  }
}

export default changeToGroceryForm
