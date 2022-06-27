import { mapListToDOMEElements } from './DOMActions.js'

class TvApp {
    constructor() {
        this.viewElems = {}
        this.showNameButtons = {}
        this.selectedname = "harry"
        this.inizializeApp()
        
    }

    inizializeApp = () => {
        this.connectDOMElements()
        this.setupListeners() 

    } 

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id)
        const listOfShowNames = Array.from(document.querySelectorAll('[data-show-name]')).map(elem => elem.dataset.showName)

        console.log(listOfIds)
        console.log(listOfShowNames)

        // this.showNameButtons = 

        this.viewElems = mapListToDOMEElements(listOfIds, 'id')
        this.showNameButtons = mapListToDOMEElements(listOfShowNames, 'data-show-name')
   }

    setupListeners = () => {
        Object.keys(this.showNameButtons).forEach(showName => {
            this.showNameButtons[showName].addEventListener('click', this.setCurrentNameFilter)
        })
    }

    setCurrentNameFilter = () => {
        this.selectedname = event.target.dataset.showName
    }
}

document.addEventListener('DOMContentLoaded', new TvApp())