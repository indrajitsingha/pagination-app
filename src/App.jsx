import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { useQuery } from '@tanstack/react-query';
function App() {
  const [Pages, setPages] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [NumOfItems] = useState(10);
  const [Data, SetData] = useState([]);
  const fetchdata = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    return res.json();
  };
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['pagination'],
    queryFn: fetchdata,
  });

  useEffect(() => {
    if (!isLoading || !isFetching) {
      const numberOfPages = Math.ceil(
        parseInt(data.length) / parseInt(NumOfItems)
      );
      let arr = [];
      for (let x = 1; x <= numberOfPages; x++) {
        arr = [...arr, x];
      }
      setPages(arr);
    }
  }, [data, isFetching, isLoading]);
  console.log(Pages);

  useEffect(() => {
    if (!isLoading || !isFetching) {
      let arr = data.slice(
        CurrentPage * NumOfItems - 10,
        CurrentPage * NumOfItems
      );
      SetData(arr);
    }
  }, [data, isFetching, isLoading, CurrentPage]);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        {isFetching || isLoading ? (
          <h1>Loading...</h1>
        ) : (
          Data.map((x) => (
            <h1 className="h1text" key={x?.id}>
              {x?.id} {x?.title}
            </h1>
          ))
        )}
      </div>
      <div className="card">
        {Pages?.map((x) => (
          <button
            style={CurrentPage == x ? { background: '#5BBCFF',border:"none" } : {}}
            onClick={() => setCurrentPage(x)}
          >
            {x}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
