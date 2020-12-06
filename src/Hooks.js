import React from 'react';

function useFetch(initialUrl, initialData, initialOptions = '') {
    const [data, setData] = React.useState(initialData);
    //const [url, setUrl] = React.useState(initialUrl);
    //const [options, setOptions] = React.useState(initialOptions);

    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const [request, setRequest] = React.useState({url: initialUrl, options: {...initialOptions}});

    React.useEffect(() => {
        console.log('to fetch')
        if(!request.url) return;

        async function fetchData (url, options = '') {
            if(!url) return;
            console.log('fetching');
            
            setIsError(false);
            setIsLoading(true);
    
            try {
                console.log(`with options ${options.mode}`)
                const result = options ? await fetch(url, {...options}) : await fetch(url);
                const resultData = await result.json();                
                console.log(resultData);
                
                setData(resultData);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        }

        fetchData(request.url, request.options);
    },[request]);

    return [{data, isLoading, isError}, setRequest]
}

function useDOI(initialDOI) {
    const contentNegotiationHeader = new Headers({'Accept': 'application/vnd.citationstyles.csl+json, application/rdf+xml, text/x-bibliography; style=associacao-brasileira-de-norams-tecnicas'});
    const options = {headers: contentNegotiationHeader, mode:'cors'};
    const [{data, isLoading, isError}, setRequest] = useFetch(initialDOI, '', options);

    function setDOI(doi) {
        const queryUrl = doi.includes('https://doi.org/') ? doi : 'https://doi.org/'+doi;
        setRequest({url: queryUrl, options: {...options}})
    }

    return [{data, isLoading, isError}, setDOI]
}

function useFreeSearch(initialSearchQuery) {
    const [{data, isLoading, isError}, setRequest] = useFetch(initialSearchQuery,'');

    function setSearchQuery(newSearchQuery) {
        const formattedQuery = newSearchQuery.split(' ').join('+');
        console.log(`Searching for for ${formattedQuery}`);
        setRequest({url: `https://api.crossref.org/works?query.bibliographic=${formattedQuery}&mailto=fmammoli@gmail.com`});
    }

    return [{data, isLoading, isError}, setSearchQuery]
}

export {useFetch, useDOI, useFreeSearch}