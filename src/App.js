import React from 'react';
import './App.css';

    //Formato Documento Eletrônico(ABNT)

    //Sobrenome, Nome. Titulo. Nome do Journal, cidade, volume, numero, paginas, mes, ano.
    //MONTEIRO, Marko. Construindo imagens e territórios: pensando a visualidade e a materialidade do sensoriamento remoto. Hist. cienc. saude-Manguinhos,  Rio de Janeiro ,  v. 22, n. 2, p. 577-591,  jun.  2015 .   Disponível em <http://www.scielo.br/scielo.php?script=sci_arttext&pid=S0104-59702015000200016&lng=pt&nrm=iso>. acessos em  29  nov.  2020.  https://doi.org/10.1590/S0104-59702015000200006.

function AbntItem({reference}) {
    console.log(reference);
    const authors = reference.authors.flatMap(item => `${item.family.toUpperCase()}, ${item.given}`).join('; ');

    const months = ['jan', 'fev', 'mar', 'abr', 'maio', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    return (
    <p>{`${authors}. ${reference.title}. ${reference.journal}, v. ${reference.volume}, n. ${reference.issue}, p. ${reference.pages}, ${months[reference.month-1]}. ${reference.year}. Disponível em: <${reference.available_at}>`}</p>
    )
}

function useCrossRefApi(initialUrl, initialData) {
    const [data, setData] = React.useState(initialData);
    const [url, setUrl] = React.useState(initialUrl);

    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    async function fetchData (url) {
        if(!url) return;

        setIsError(false);
        setIsLoading(true);

        try {
            const result = await fetch(url);
            const resultData = await result.json();
            console.log('fetching');
            
            setData(resultData);
            
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    }

    React.useEffect(() => {
        console.log('to fetch')
        fetchData(url);
    },[url]);

    return [{data, isLoading, isError}, setUrl]
}

function ReferenceForm({setUrl}) {
    const [query, setQuery] = React.useState("");

    return (
        <form onSubmit={event => {
            event.preventDefault();
            setUrl(`https://api.crossref.org/works/${query}`);
            setQuery('');
        }}>
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

    const [{data, isLoading, isError}, setUrl] = useCrossRefApi('', '');
    
    React.useEffect(() => {
        console.log('efecting')
        if(!data) return;

        function buildReferenceObject(data) {
            return {
                authors: data.message.author,
                title: data.message.title[0],
                journal: data.message['container-title'][0],
                volume: data.message.volume,
                issue: data.message.issue,
                pages: data.message.page,
                month: data.message.issued['date-parts'][0][1],
                year: data.message.issued['date-parts'][0][0],
                available_at: data.message.URL
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
                    This uses CrossRef free and open API so be mindfull about the number of requests.
                </p>
                <div>
                    <p>Here are some DOIs you can test:</p>
                    <div>https://doi.org/10.1590/S0104-59702015000200006</div>
                    <div>https://doi.org/10.1177/0306312717730428</div>
                </div>
                <p></p>
                <article>
                    <ReferenceForm setUrl={setUrl} ></ReferenceForm>
                </article>
            </section>
            
            <section>
                <h2>Reference List</h2>
                
                {isError && <div>Opps, DOI not found...</div>}
                {isLoading && <div>Loading...</div>}
            
                <ul className="left">
                    {
                        dataList.references.map( (item, index) => (
                            <AbntItem reference={item} key={item.available_at}></AbntItem>
                        ))
                    }
                </ul>
                
            </section>
        </main>
    );
}

export default App;
