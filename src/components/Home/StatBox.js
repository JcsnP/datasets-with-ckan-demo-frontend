import React, {useState, useEffect} from 'react';

export default function StatBox({title, api_resource}) {
  const [result, setResult] = useState(0);
  const [resultLoaded, setResultLoaded] = useState(false);
  useEffect(() => {
    // console.log(process.env.REACT_APP_CKAN_API)
    fetch(`${process.env.REACT_APP_CKAN_API}/${api_resource}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.ok) {
          setResult(data.number)
          setResultLoaded(true);
        } else {
          setResult(0)
        }
      })
  }, []);
  return(
    <div className='text-center text-light'>
      {
        resultLoaded && (
          <div>
            <h1>{result}</h1>
            <h3>{title}</h3>
          </div>
        ) 
      }
    </div>
  );
}