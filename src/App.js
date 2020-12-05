import React from 'react';
import './App.css';

    //Formato Documento Eletrônico(ABNT)

    //Sobrenome, Nome. Titulo. Nome do Journal, cidade, volume, numero, paginas, mes, ano.
    //MONTEIRO, Marko. Construindo imagens e territórios: pensando a visualidade e a materialidade do sensoriamento remoto. Hist. cienc. saude-Manguinhos,  Rio de Janeiro ,  v. 22, n. 2, p. 577-591,  jun.  2015 .   Disponível em <http://www.scielo.br/scielo.php?script=sci_arttext&pid=S0104-59702015000200016&lng=pt&nrm=iso>. acessos em  29  nov.  2020.  https://doi.org/10.1590/S0104-59702015000200006.

function AbntItem({reference}) {

    const months = ['jan', 'fev', 'mar', 'abr', 'maio', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    //Format reference by ommiting lacking information, might not be the best solution.
    function formatReference(reference) {
        const authorsString = `${reference.authors.flatMap(item => `${item.family.toUpperCase()}, ${item.given}`).join('; ')}.`;
        const titleString = reference.title ? `${reference.title}.` : '';
        const journalString = reference.journal ? `${reference.journal},` : '';
        const volumeString = reference.volume ? `v. ${reference.volume},` : '';
        const issueString = reference.issue ? `n. ${reference.issue},` : '';
        const pagesString = reference.pages ? `p. ${reference.pages},` : '';
        const monthString = reference.month ? `${months[reference.month-1]}.` : '';
        const yearString = reference.year ? `${reference.year}.` : '';
        const availableAtSring = reference.availableAt ? `Disponível em: <${reference.availableAt}>` : '';
        const doiString = reference.doi ? `DOI: ${reference.doi}` : '';
       
        return [authorsString, titleString, journalString, volumeString, issueString, pagesString, monthString, yearString, availableAtSring, doiString].filter(val => val).join(' ');
    }
    

    return (
        <p>{formatReference(reference)}</p>
    //<p>{`${authors}. ${reference.title}. ${reference.journal}, v. ${reference.volume}, n. ${reference.issue}, p. ${reference.pages}, ${months[reference.month-1]}. ${reference.year}. Disponível em: <${reference.available_at}>, DOI: <${reference.doi}>`}</p>
    )
}

function useFetch(initialUrl, initialData, options) {
    const [data, setData] = React.useState(initialData);
    const [url, setUrl] = React.useState(initialUrl);

    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        console.log('to fetch')

        async function fetchData (url) {
            if(!url) return;
            console.log('fetching');
            setIsError(false);
            setIsLoading(true);
    
            try {
                const contentNegotiationHeader = new Headers({'Accept': 'application/vnd.citationstyles.csl+json, application/rdf+xml, text/x-bibliography; style=associacao-brasileira-de-norams-tecnicas'});
                const result = await fetch(url, {headers: contentNegotiationHeader, mode: 'cors'});
                const resultData = await result.json();
                
                console.log(resultData);
                setData(resultData);
                
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        }

        fetchData(url);
    },[url]);

    return [{data, isLoading, isError}, setUrl]
}

function ReferenceForm({setUrl}) {
    const [query, setQuery] = React.useState("");

    function handleSubmit(event) {
        event.preventDefault();
        //setUrl(`https://api.crossref.org/works/${query}`);
        const queryUrl = query.includes('https://doi.org/') ? query : 'https://doi.org/'+query;
        setUrl(queryUrl);
        setQuery('');
    }

    return (
        <form onSubmit={event => {handleSubmit(event)}}>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
}

function App() {
    const [dataList, setDataList] = React.useState({references: []});

    const contentNegotiationHeader = new Headers({'Accept': 'application/vnd.citationstyles.csl+json, application/rdf+xml, text/x-bibliography; style=associacao-brasileira-de-norams-tecnicas'});
    const [{data, isLoading, isError}, setUrl] = useFetch('', '', {headers: contentNegotiationHeader, mode: 'cors'});
    
    React.useEffect(() => {
        console.log('efecting')
        if(!data) return;

        function buildReferenceObject(data) {
            return {
                authors: data.author,
                title: data.title,
                journal: data['container-title'],
                volume: data.volume,
                issue: data.issue,
                pages: data.page,
                month: data.issued['date-parts'][0][1],
                year: data.issued['date-parts'][0][0],
                availableAt: data.link[0].URL,
                doi: data.URL
            }
        }
        const newReference = buildReferenceObject(data);
        setDataList(oldList => {
            console.log(`Addins ${newReference.title} to dataList`);
            return {references: [newReference, ...oldList.references]}
        });
        
    },[data]);

    return (
        <main className="App">
            <h1>Simple Reference</h1>
            <section>
                <p>
                    Input a DOI and get a ABNT formatted reference.
                </p>
                <p>
                    This uses simple content negotiation to retrieve metadata from DOIs.
                </p>
                <div>
                    <p>Here are some DOIs you can test:</p>
                    <div>https://doi.org/10.1590/S0104-59702015000200006</div>
                    <div>https://doi.org/10.1177/0306312717730428</div>
                    <div>https://doi.org/10.1177/0306312718783087</div>
                </div>
                <p></p>
                <article>
                    <ReferenceForm setUrl={setUrl} ></ReferenceForm>
                </article>
            </section>
            
            <section>
                <h2>Reference List</h2>
                
                {isError && <div>Opps, DOI: not found...</div>}
                {isLoading && <div>Loading...</div>}
            
                <ul className="left">
                    {
                        dataList.references.map( (item, index) => (
                            <AbntItem reference={item} key={index} index={index}></AbntItem>
                        ))
                    }
                </ul>
                
            </section>
        </main>
    );
}

export default App;
