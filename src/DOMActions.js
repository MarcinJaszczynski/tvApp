const _getDOMElems = (atribute, value) => {
    return document.querySelector(`[${atribute}=${value}]`)
}

export const mapListToDOMEElements = (listOfValues,atribute) => {
    const _viewElems = {}

    for (const value of listOfValues){
        _viewElems[value] = _getDOMElems(atribute, value)
    }

    return _viewElems;
}