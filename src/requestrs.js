export const getShowsByKey = key => {
    return fetch(`https://api.tvmaze.com/singlesearch/shows?q=${ key }`).then(resp => resp.json())
}

export const getShowsById = id => {
    return fetch(`https://api.tvmaze.com/shows/${ id }?embed=cast`).then(resp => resp.json())
}