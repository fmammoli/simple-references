import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";

import SearchWidget from "./Components/SearchWidget";
import { useDoiTextResponse } from "./Hooks";

const Title = styled.h1`
  color: greenyellow;
`;

function App2(props) {
  const [refList, setRefList] = useState([]);
  const el = useRef(null);
  const [{ data, isLoading, isError }, setDOI] = useDoiTextResponse(null);

  const [textRefs, setTextRef] = useState();

  function addToRefList(doi) {
    //TODO add only if it is new to the array
    //setRefList((refs) => [{ doi: doi, text: "Loading..." }, ...refs]);
    // This feels like a dirty solution
    setRefList((refs) => {
      if (refs.find((item) => item.doi === doi)) {
        return [...refs];
      } else {
        setDOI(doi);
        return [{ doi: doi, text: "Loading..." }, ...refs];
      }
    });
  }

  function clearRefList() {
    setRefList([]);
  }

  function removeFromRefList(doi) {
    setRefList((refs) => {
      return [...refs.filter((item) => item.doi !== doi)];
    });
  }

  function copyToClipboard(e) {
    setTextRef(() => {
      let text = "";
      refList.forEach((item) => {
        text += item.text + "\n";
      });
      el.current.value = text;
      el.current.select();
      document.execCommand("copy");
    });
  }

  useEffect(() => {
    if (data) {
      setRefList((refs) => {
        const updated = refs.map((item) => {
          if (item.doi === data.doi) return { doi: item.doi, text: data.text };
          return item;
        });
        return [...updated];
      });
    }
  }, [data]);

  return (
    <main>
      <header>
        <Title>Simple Reference</Title>
      </header>
      <SearchWidget addToRefList={addToRefList}></SearchWidget>
      <h2>My References</h2>
      {refList.length > 0 && <button onClick={clearRefList}>Clear</button>}
      {refList.length > 0 && (
        <button onClick={(e) => copyToClipboard(e)}>Copy To ClipBoard</button>
      )}
      <div>
        {refList.map((item, index) => (
          <ul key={index}>
            {/* <li>{item.doi}</li> */}
            <li>{item.text}</li>
            <button onClick={() => removeFromRefList(item.doi)}> X </button>
          </ul>
        ))}
      </div>
      <div>
        <p>Export Area</p>
        <textarea
          ref={el}
          name=""
          id="textArea"
          cols="30"
          rows="10"
          value={textRefs}
        ></textarea>
      </div>
    </main>
  );
}

// function App(props) {
//   return (
//     <main className="App">
//       <header>
//         <Title>Simple Reference</Title>
//         <Subtext>A tool for simple bibligraphic references</Subtext>
//       </header>
//       <section>
//         <SearchBar>
//           <form action="">
//             <input type="text" placeholder="author" />
//             <input type="text" placeholder="title" />
//             <SearchButton>Search</SearchButton>
//           </form>
//         </SearchBar>
//         <SearchResults>
//           <ActionsMenu>
//             <ApplyButton>V</ApplyButton>
//             <ClearButton>X</ClearButton>
//           </ActionsMenu>
//           <SearchItem>
//             <TextPart></TextPart>
//             <AddButton>+</AddButton>
//           </SearchItem>
//         </SearchResults>
//       </section>
//       <section>
//         <DoiSearchBar>
//           <form action="">
//             <input type="text" placeholder="doi" />
//             <button type="submit"></button>
//           </form>
//         </DoiSearchBar>
//       </section>
//       <section>
//         <ReferenceList>
//           <ListHeader>References</ListHeader>
//           <ReferencesActionMenu>
//             <CopyToClipboard>V</CopyToClipboard>
//             <ClearAll>X</ClearAll>
//           </ReferencesActionMenu>
//           <ReferenceFormats>
//             <Format>NBR</Format>
//             <Format>Chicago</Format>
//             <Format>APA</Format>
//           </ReferenceFormats>
//           <ReferenceListContent>
//             <ReferenceListItem>
//               <ReferenceText></ReferenceText>
//               <RemoveItem></RemoveItem>
//             </ReferenceListItem>
//           </ReferenceListContent>
//         </ReferenceList>
//       </section>
//       <section>
//         <Footer>Stuff on the footer</Footer>
//       </section>
//     </main>
//   );
// }

export default App2;
