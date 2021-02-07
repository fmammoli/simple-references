import React, { useState, useEffect } from "react";

//Transform the response from DOI content negotiation into an simpler object
function transformJournalArticle(data) {
  const months = [
    "jan",
    "fev",
    "mar",
    "abr",
    "maio",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];

  const reference = {
    authors: data.author,
    title: data.title,
    subTitle: data.subtitle,
    journal: data["container-title"],
    volume: data.volume,
    issue: data.issue,
    pages: data.page,
    month: data.issued["date-parts"][0][1],
    year: data.issued["date-parts"][0][0],
    availableAt: data.link[0].URL,
    doi: data.URL,
    type: data.type,
  };
}

function useFetch2(initialUrl, initialOptions = "") {
  const [data, setData] = React.useState(null);
  //const [url, setUrl] = React.useState(initialUrl);
  //const [options, setOptions] = React.useState(initialOptions);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [request, setRequest] = React.useState({
    url: initialUrl,
    options: { ...initialOptions },
  });

  React.useEffect(() => {
    console.log("to fetch");
    //if(!request.url) return;

    async function fetchData(url, options = "") {
      console.log(url);
      if (!url || url === "") {
        console.log("Empty url, value: " + url);
        return;
      }
      console.log("fetching");

      setIsError(false);
      setIsLoading(true);

      try {
        console.log(`with options ${options.mode}`);
        const result = options
          ? await fetch(url, { ...options })
          : await fetch(url);
        const resultData = await result.json();
        console.log(resultData);
        // if (
        //   options.headers.get("Accept") ===
        //   "text/x-bibliography; style=associacao-brasileira-de-normas-tecnicas"
        // ) {
        //   console.log("aqui");
        //   resultData = await result.text();
        // } else {
        //   console.log("aqui");
        //   resultData = await result.json();
        // }
        setData(resultData);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }

    fetchData(request.url, request.options);
  }, [request]);

  return [{ data, isLoading, isError }, setRequest];
}

//Implementação antiga, nem sei mais pq é diferente
function useFetch(initialUrl, initialOptions = "") {
  const [data, setData] = React.useState(null);
  //const [url, setUrl] = React.useState(initialUrl);
  //const [options, setOptions] = React.useState(initialOptions);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [request, setRequest] = React.useState({
    url: initialUrl,
    options: { ...initialOptions },
  });

  React.useEffect(() => {
    console.log("to fetch");
    //if(!request.url) return;

    async function fetchData(url, options = "") {
      console.log(url);
      if (!url || url === "") {
        console.log("Empty url, value: " + url);
        return;
      }
      console.log("fetching");

      setIsError(false);
      setIsLoading(true);

      try {
        console.log(`with options ${options.mode}`);
        const result = options
          ? await fetch(url, { ...options })
          : await fetch(url);
        const resultData = await result.json();
        //const resultData = await result.text();
        console.log(resultData);
        setData(resultData);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }

    fetchData(request.url, request.options);
  }, [request]);

  return [{ data, isLoading, isError }, setRequest];
}

function useDOITextResponse(initialDOI) {
  const contentNegotiationHeader = new Headers({
    Accept:
      "text/x-bibliography; style=associacao-brasileira-de-normas-tecnicas",
  });
  const options = { headers: contentNegotiationHeader, mode: "cors" };

  const [{ data: fetchData, isLoading, isError }, setRequest] = useFetch2(
    initialDOI,
    options
  );

  const [doiData, setDoiData] = React.useState("");

  function setDOI(doi) {
    const queryUrl = doi.includes("https://doi.org/")
      ? doi
      : "https://doi.org/" + doi;
    setRequest({ url: queryUrl, options: { ...options } });
  }

  React.useEffect(() => {
    if (fetchData) {
      setDoiData(fetchData);
    }
  }, [fetchData]);

  return [{ data: doiData, isLoading, isError }, setDOI];
}

function useDOI(initialDOI) {
  const contentNegotiationHeader = new Headers({
    Accept: "application/vnd.citationstyles.csl+json, application/rdf+xml",
  });
  const options = { headers: contentNegotiationHeader, mode: "cors" };

  const [{ data: fetchData, isLoading, isError }, setRequest] = useFetch(
    initialDOI,
    options
  );

  const [doiData, setDoiData] = React.useState("");

  function setDOI(doi) {
    const queryUrl = doi.includes("https://doi.org/")
      ? doi
      : "https://doi.org/" + doi;
    setRequest({ url: queryUrl, options: { ...options } });
  }

  React.useEffect(() => {
    if (fetchData) {
      const reference = {
        authors: fetchData.author,
        title: fetchData.title,
        subTitle: fetchData.subtitle,
        journal: fetchData["container-title"]
          ? fetchData["container-title"]
          : "",
        volume: fetchData.volume,
        issue: fetchData.issue,
        pages: fetchData.page,
        month: fetchData.issued?.["date-parts"]?.[0][1],
        year: fetchData.issued?.["date-parts"]?.[0][0],
        availableAt: fetchData.link?.[0]?.URL,
        doi: fetchData.URL,
        type: fetchData.type,
      };
      setDoiData(reference);
    }
  }, [fetchData]);

  return [{ data: doiData, isLoading, isError }, setDOI];
}

function useDoiTextResponse(initialDoi) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [doi, setDoi] = useState(initialDoi);

  useEffect(() => {
    async function fetchDoi(doi) {
      console.log("Trying to fetch doi: ", doi);
      setIsLoading(true);
      try {
        const contentNegotiationHeader = new Headers({
          Accept:
            "text/x-bibliography; style=associacao-brasileira-de-normas-tecnicas",
        });
        const options = { headers: contentNegotiationHeader, mode: "cors" };
        const result = await fetch(doi, { ...options });
        const data = await result.text();
        setIsLoading(false);
        setData({ text: data, doi: doi });
      } catch (error) {
        setIsLoading(false);
        setIsError(error);
      }
    }

    if (doi && doi !== "") fetchDoi(doi);
  }, [doi]);

  return [{ data, isLoading, isError }, setDoi];
}

function useCrossRefApi(initialSearchQuery) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [req, setSearchQuery] = useState(initialSearchQuery);

  useEffect(() => {
    async function fetchCrossRefApi(req) {
      console.log("Trying to fetch from CrossRefAPI: ", req.query);
      console.log(
        `https://api.crossref.org/works?${req.query}&mailto=fmammoli@gmail.com&select=DOI,title,author,subtitle,issued,type,URL,publisher&sort=relevance&order=desc&filter=type:book-chapter`
      );
      setIsLoading(true);
      try {
        const result = await fetch(
          `https://api.crossref.org/works?${req.query}&mailto=fmammoli@gmail.com&select=DOI,title,author,subtitle,issued,type,URL,publisher&sort=relevance&order=desc&filter=type:journal-article`,
          req.options ? { ...req.options } : null
        );
        const data = await result.json();
        setIsLoading(false);
        setData(data.message.items);
      } catch (error) {
        setIsLoading(false);
        setIsError(error);
      }
    }

    if (req && req !== "") fetchCrossRefApi(req);
  }, [req]);

  return [{ data, isLoading, isError }, setSearchQuery];
}

function useFreeSearch(initialSearchQuery) {
  const [{ data, isLoading, isError }, setRequest] = useFetch(
    initialSearchQuery
  );

  function setSearchQuery(newSearchQuery) {
    const formattedQuery = newSearchQuery.split(" ").join("+");
    console.log(`Searching for for ${formattedQuery}`);
    //Making some adjustments on the search query
    // filter=type:journal-article
    setRequest({
      url: `https://api.crossref.org/works?query.author=${formattedQuery}&mailto=fmammoli@gmail.com&select=DOI,title,author,subtitle,issued,type,URL,publisher&sort=relevance&order=desc&rows=1`,
    });
  }

  return [{ data, isLoading, isError }, setSearchQuery];
}

export {
  useFetch,
  useDOI,
  useDOITextResponse,
  useFreeSearch,
  useCrossRefApi,
  useDoiTextResponse,
};
