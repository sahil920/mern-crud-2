import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [clients, setClients] = useState([])
  const [fields, setFields] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    project: ""
  })
  const [flag, setFlag] = useState(false)

  const handleChange = (name, e) => {
    const data = e.target.value
    setFields((p) => ({ ...p, [name]: data }))
  }

  useEffect(() => { console.log("fields", fields) }, [fields])

  useEffect(() => {
    callfunc();
  }, [flag]);

  const callfunc = async () => {
    let hhh = await axios.get("http://localhost:5004/client/get-clients")
    setClients(hhh.data.clients)
    setFlag(!flag)
  }

  const onSubmit = async () => {
    const resultt = await axios.post("http://localhost:5004/client/create-client", fields)
    if (typeof resultt !== 'undefined' && resultt) {
      setFields((p) => ({
        ...p,
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        project: ""
      }));
      console.log("Fields updated:", fields); // Add this line to check the state
      alert("Successfully submitted");
    } else {
      alert("Failed to submit");
    }



  }

  const mydelete = async (id) => {
    const tata = await axios.delete(`http://localhost:5004/client/remove/${id}`);
    if (tata.data.success === true) {
      alert(`${tata.name} delete successfully`)
      window.location.reload();
    }
  };
  return (
    <>
      <div className='nazim'>
        {/* table start   */}
        <table className="table table-striped" >
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile No. </th>
              <th scope="col">Project</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 ? (
              clients.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.project}</td>
                  <td><button onClick={() => mydelete(item._id)} className="btn btn-danger" colorScheme='red' size="sm"> Delete</button></td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Clients Found</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* table end  */}

        {/* form start */}
        <form>
          <div>
            <label>Name</label>
            <input type="text" id="name" placeholder="Enter name" onChange={(e) => handleChange("name", e)} />
          </div>

          <div>
            <label>Last Name</label>
            <input type="text" id="lastName" placeholder="Enter last name" onChange={(e) => handleChange("lastName", e)} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" id="email" placeholder="Enter email" onChange={(e) => handleChange("email", e)} />
          </div>
          <div>
            <label>Mobile Number</label>
            <input type="text" id="phoneNumber" placeholder="Enter mobile number" onChange={(e) => handleChange("phoneNumber", e)} />
          </div>
          <div>
            <label>Project</label>
            <input type="text" id="project" placeholder="Enter project" onChange={(e) => handleChange("project", e)} />
          </div>

          <button type="button" onClick={onSubmit}>Submit</button>
        </form>
        {/* form end */}
      </div>
    </>
  )
}

export default App
