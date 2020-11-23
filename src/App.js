import React from "react";
import axios from 'axios';
// reactstrap component

import { Button, Card, Form, Input, Container } from "reactstrap";
import Plot from 'react-plotly.js';
// core components
import './App.css'
function App() {
  function changeBackground(e) {
    e.target.style.background = '#1688D7';

  }
  function changeBackground1(e) {
    e.target.style.background = '#0D5C66';
  }
  const [inputURL, setInputURL] = React.useState('');
  const [response, setResponse] = React.useState([]);
  const [keys, setKeys] = React.useState([]);
  const [values, setValues] = React.useState([]);
  const [showGraph, setShowGraph] = React.useState(false);
  let keys_arr = []; let vals_arr = [];

  const handleSubmit = () => {
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios.post('https://us-central1-sanath-edupuganti.cloudfunctions.net/test?name=' + inputURL, {
    })
      .then((response) => {
        var obj = JSON.parse(JSON.stringify(response.data));
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var value = obj[key];
            keys_arr.push(key);
            vals_arr.push(value);
          }
        }
        setKeys(keys_arr)
        setValues(vals_arr)
        setResponse(response.data)
        setShowGraph(true)
      })
      .catch((error) => {
        console.log(error)
      })

  };
  if(showGraph)
  return (
    <>
      <div className="page-header">
        <Container style={{ width: '90vw', height: "50vw" }}>

          <Card className="card-register">
            <Form className="register-form">
              <Input placeholder="Enter URL" type="text" onChange={event => setInputURL(event.target.value)} style={{
                width: '80%', padding: '12px 20px', margin: '8px 0',
                boxSizing: 'border-box'
              }} />
              <Button
                onMouseOver={changeBackground}
                onMouseLeave={changeBackground1}
                color="danger"
                type="button"
                onClick={() => {
                  handleSubmit()
                }}
                style={{ marginLeft: '5rem' }}
              >
                Get Results
                  </Button>
            </Form>
            <Plot
              data={[
                {
                  x: keys,
                  y: values,
                  type: 'bar',
                  marker: { color: '#0D5C66' },
                },
                { type: 'bar' },
              ]}
              layout={{ width: 1225, height: 500, title: 'Histogram of Sentence Lengths' }}
            />
            <div style={{ overflowWrap: 'break-word', paddingTop: '10px' }}>{JSON.stringify(response)}</div>
          </Card>
        </Container>

      </div>
    </>
  );

  if(!showGraph)
  return (
    <>
      <div className="page-header">
        <Container style={{ width: '90vw', height: "50vw" }}>

          <Card className="card-register">
            <Form className="register-form">
              <Input placeholder="Enter URL" type="text" onChange={event => setInputURL(event.target.value)} style={{
                width: '80%', padding: '12px 20px', margin: '8px 0',
                boxSizing: 'border-box'
              }} />
              <Button
                onMouseOver={changeBackground}
                onMouseLeave={changeBackground1}
                color="danger"
                type="button"
                onClick={() => {
                  handleSubmit()
                }}
                style={{ marginLeft: '5rem' }}
              >
                Get Results
                  </Button>
            </Form>
          </Card>
        </Container>

      </div>
    </>
  );

}

export default App;
