import FullItem from "../src/Model/FullList";

interface DomList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullItem: FullItem): void;
}


export default class ListTemplate implements DomList{
    ul: HTMLUListElement
    
    static instance: ListTemplate= new ListTemplate()
    private constructor() {
        this.ul=document.getElementById("listItems") as HTMLUListElement
    }
    clear(): void{
        this.ul.innerHTML=''
    }

    render(fullItem: FullItem): void{
        this.clear()
        fullItem.list.forEach(item => {
            const li = document.createElement('li') as HTMLLIElement
            li.className = 'item'
            
            const check = document.createElement('input') as HTMLInputElement
            check.type='checkbox'
            check.id = item.id
            
            check.tabIndex = 0
            check.checked = item.checked
            li.append(check)

            check.addEventListener('change', () => {
                item.checked = !item.checked
                fullItem.save()
            })

            const label = document.createElement('label') as HTMLLabelElement
            
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button = document.createElement('button') as HTMLButtonElement
            button.className = 'button'
            button.innerHTML = 'X'
            
            li.append(button)
            button.addEventListener('click', () => {
                console.log(item.id)
                fullItem.removeItem(item.id)
                this.render(fullItem)
            })

            this.ul.append(li)

        })
    }
}
