import './CSS/style.css'
import FullItem from './Model/FullList'
import ListItem from './Model/ListItem'

import ListTemplate from '../templates/listTemplate.ts'



const initApp = (): void=>{
  const fullItem = FullItem.instance
  const template = ListTemplate.instance
  

  const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement
  
  itemEntryForm.addEventListener('submit', (event: SubmitEvent):void => {
    event.preventDefault()
    
    const input = document.getElementById('newItem') as HTMLInputElement
    
    const newEntryText: string = input.value
    
    if (!newEntryText) {
      return
    }
   
    const itemId: number = fullItem.list.length ? parseInt(fullItem.list[fullItem.list.length - 1].id)+1 : 1
    
    const newItem = new ListItem(itemId.toString(), newEntryText)
    
    fullItem.addItem(newItem)
 
    
    template.render(fullItem)
  })
  const clearItem = document.getElementById('clearItemsButton') as HTMLButtonElement
  clearItem.addEventListener('click', (): void => {
    fullItem.clearList()
    template.clear()
  })
  fullItem.load()
  template.clear()

}

document.addEventListener("DOMContentLoaded",initApp)