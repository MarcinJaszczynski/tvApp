import { mapListToDOMEElements } from './DOMActions.js'
import { createDOMElement } from './DOMActions.js'
import { getShowsByKey } from './requestrs.js'
import { getShowsById } from './requestrs.js'

class TvApp {
	constructor() {
		this.viewElems = {}
		this.showNameButtons = {}
		this.selectedname = 'harry'
		this.inizializeApp()
	}

	inizializeApp = () => {
		this.connectDOMElements()
		this.setupListeners()
	}

	connectDOMElements = () => {
		const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id)
		const listOfShowNames = Array.from(document.querySelectorAll('[data-show-name]')).map(elem => elem.dataset.showName)
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
		this.fetchAndDisplayShows()
	}

	fetchAndDisplayShows = () => {
		getShowsByKey(this.selectedname).then(shows => this.renderCards(shows))
	}

	renderCards = shows => {
		console.log(shows)
		for (const { show } of shows) {
			this.createShowCard(show)
		}
	}

	createShowCard = show => {
		const divCard = createDOMElement('div', 'card')
		let img, p
		if (show.image.medium) {
			img = createDOMElement('img', 'card-img-top', null, show.image.medium)
		} else {
			img = createDOMElement('img', 'card-img-top', null, 'https://via.placeholder.com/210x295')
		}
		const divCardBody = createDOMElement('div', 'card-body')
		const h5 = createDOMElement('h5', 'card-title', show.name)
		if (show.summary) {
			p = createDOMElement('p', 'card-text', show.summary)
		} else {
			p = createDOMElement('p', 'card-text', 'Not summary yet :(')
		}
		const btn = createDOMElement('button', 'btn btn-primary', 'Show details')

		divCard.appendChild(divCardBody)

		divCardBody.appendChild(img)
		divCardBody.appendChild(h5)
		divCardBody.appendChild(btn)

		this.viewElems.showsWrapper.appendChild(divCard)
	}
}

document.addEventListener('DOMContentLoaded', new TvApp())
