import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { API_URL } from '../proxy'

function Home () {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data....')
      setLoading(true)
      try {
        const { data: response } = await axios.get(`${API_URL}/books`)
        setData(response)
      } catch (error) {
        console.error(error.message)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div className='container my-5'>
        <h1 className='text-center mb-4'>Home</h1>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Pages</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              {
                loading
                  ? (
                    <tr>
                      <td colSpan='5' className='text-center'>
                        Loading...
                      </td>
                    </tr>
                    )
                  : (
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.title}</td>
                          <td>{item.author}</td>
                          <td>{item.pages}</td>
                          <td>{item.genre}</td>
                        </tr>
                      ))
                    )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home
