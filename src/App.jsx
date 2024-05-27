import { useState, useEffect } from 'react'

function App() {
  const [apiUsers, setApiUsers] = useState([])
  // initialize the loading state as true
  const [loading, setLoading] = useState(true)
  // initialize the error state as null
  const [error, setError] = useState(null)
  const [searchItem, setSearchItem] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => {
        setApiUsers(data.users)
        setFilteredUsers(data.users)
        //console.log(FilteredUsers);
      })
      .catch(err => {
        console.log(err)
        // update the error state
        setError(err)
      })
      .finally(() => {
        // wether we sucessfully get the users or not, 
        // we update the loading state
        setLoading(false);
      })
  }, [])

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    // filter the items using the apiUsers state
    const filteredItems = apiUsers.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
    
  }

  return (
    <>
    
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Buradan Arama Yapabilirsin'
      />
      {/* if the data is loading, show a proper message */}
      {loading && <p>Loading...</p>}
      {/* if there's an error, show a proper message */}
      {error && <p>There was an error loading the users</p>}
      {/* if it finished loading, render the items */}
      {!loading && !error && filteredUsers.length === 0
        ? <p>No users found</p>
        : <ul>
          {filteredUsers.map(user => <li key={user.id}>{user.firstName}</li>)}
        </ul>


      }
    </>
    
    
  )
}

export default App
