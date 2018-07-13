export const proccessWikiPagesResponse = (resp) => {
    let response = [];
    const pages = resp && resp.query && resp.query.pages;

    pages && Object.keys(pages).forEach(key => {
        response.push({
            id: pages[key].pageid,
            title: pages[key].title,
            desc: pages[key].extract
        })
    });

    return response;
}

export const proccessSuggestionsResponse = (resp) => {

    return resp && resp[1];
}