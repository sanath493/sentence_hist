import React from "react";
import axios from 'axios';
import { Button, Card, Container } from "reactstrap";
// core components
import './App.css'

export default function App() {
  function changeBackground(e) {
    e.target.style.background = '#1688D7';

  }
  function changeBackground1(e) {
    e.target.style.background = '#0D5C66';
  }
  const [base64, setBase64] = React.useState('');
  const [imgUrl, setImgURl] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [vis4OP, setVis4OP] = React.useState('');
  const [vis5OP, setVis5OP] = React.useState('');

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    setFileName(event.target.files[0].name)
    setBase64(await convertBase64(file))
    // base64 = await convertBase64(file)
  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
  
  const getVis4 = (e) => {
    e.preventDefault()
    const payload = {
      "name" : base64.substring(23),
      "file_name" : fileName
    }
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios.post(proxyurl + 'https://us-central1-sanath-edupuganti.cloudfunctions.net/vis4',payload, {
      headers: {
        'Content-Type': `application/json`,
      }
    })
      .then((response) => {
        setVis4OP(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }
  const getVis5 = (e) => {
    e.preventDefault()
    const payload = {
      "name" : base64.substring(23),
      "file_name" : fileName
    }
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios.post(proxyurl + 'https://us-central1-sanath-edupuganti.cloudfunctions.net/vis5',payload, {
      headers: {
        'Content-Type': `application/json`,
      }
    })
      .then((response) => {
        setVis5OP(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      "name" : base64.substring(23),
      "file_name" : fileName
    }
    // console.log(base64.substring(23))
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios.post(proxyurl + 'https://us-central1-sanath-edupuganti.cloudfunctions.net/superres', payload, {
  
      headers: {
        'Content-Type': `application/json`,
      }
    })
      .then((response) => {
        console.log(response.data)
        setImgURl(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  };
  return (
    <>
      <div className="page-header">
        <Container style={{ width: '90vw', height: "50vw" }}>

          <Card className="card-register">
          <form onChange={handleFileRead}>
          <div style = {{ marginRight: '33rem', float:'right'}}>
          <input 
          name="image"
          type="file"
          accept = '.jpeg,.png,.jpg'
          placeholder="Enter URL" style={{
                width: '80%', padding: '12px 20px', margin: '8px 0',
                boxSizing: 'border-box', marginLeft: '2rem', maxWidth: '210px',
              }} />
          
          <Button
          onMouseOver={changeBackground}
          onMouseLeave={changeBackground1}
          color="danger"
          type="button"
          onClick= {handleSubmit}
          style={{  }}
          >Upload Image</Button>
          </div>

          <div style = {{float:'left', marginLeft : '20rem'}}>
          <Button
          onMouseOver={changeBackground}
          onMouseLeave={changeBackground1}
          color="danger"
          type="button"
          onClick= {getVis4}
          style={{ marginLeft: '2rem' }}
          >Safety Check</Button>

          <Button
          onMouseOver={changeBackground}
          onMouseLeave={changeBackground1}
          color="danger"
          type="button"
          onClick= {getVis5}
          style={{ marginLeft: '2rem' }}
          >Get labels</Button>
          </div>

          {imgUrl ? (
             <Button
             onMouseOver={changeBackground}
             onMouseLeave={changeBackground1}
             color="danger"
             type="button"
             href={imgUrl}
             target="_blank"
             style={{ marginLeft: '5rem' }}
             >View Processed Image</Button>
          // <a>{imgUrl}</a>
          ): null}
        {vis4OP ? <div>{vis4OP}</div> : null}
        {vis5OP ? <div style={{ overflowWrap: 'break-word', paddingTop: '10px' }}>{JSON.stringify(vis5OP)}</div> : null}
          </form>
          </Card>
        </Container>
        
      </div>
    </>
  );
}
