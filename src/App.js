import React from 'react';
import logo from './logo.svg';
import './App.css';
const apiKey = 'c4a22c9f29794f399af3b02463014e76';
function App() {
  const [images, setImages] = React.useState([]);
  const [text, setText] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  React.useEffect(() => {
  }, [])
  const sendQuery = async () => {
    setLoader(true);
    let host = 'https://api.cognitive.microsoft.com';
    let path = '/bing/v7.0/images/search';
    let request_params = {
      method : 'GET',
      hostname : host,
      path : path + '?q=' + encodeURIComponent(text),
      headers : {
        'Ocp-Apim-Subscription-Key' : apiKey,
      }
    };
    fetch(host + request_params.path, {
      method: 'GET',
      headers: request_params.headers
    }).then(res => {
      setLoader(false);
      console.log(res)
      res.json().then(response => {
        console.log(response.value);
        setImages(response.value)
      }).then(error => {
        console.log(error);
      })
    }).catch(err => {
      setLoader(false);
      console.log(err)
    });
};
  return (
    <div className="App">
      <h1 style={{padding: 10}}>Hey welcome to my search engine</h1>
      <br/>
      <input type="text" onChange={(ev) => setText(ev.target.value)} placeholder={'serach here'}/>
      <button onClick={() => sendQuery()}>search</button>
      {loader && <h1>Loading please wait</h1>}
      <div style={{width: '90%', display: 'flex', marginLeft: 'auto', marginRight: 'auto', flexWrap: 'wrap'}}>
      {
        images.map((item , index) => (
            <img src={item.contentUrl} width={'30%'} style={{ margin: 10}} height={200} alt=""/>
        ))
      }
      </div>
    </div>
  );
}

export default App;
