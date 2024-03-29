
import '../components/BookTable';
import axios from 'axios';
import React, {useState, useEffect} from 'react';



function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get('/books');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className='container my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Genre</th>
          </tr>
          </thead>
          <tbody>
            { data.map(item => (
              <tr key={item.book_id}>
                <td>{item.book_id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.pages}</td>
                <td>{item.genre}</td>
              </tr>
            ))}
          </tbody>
        </table> 
      </div>
  )};

export default App;

