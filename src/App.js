import React, {useState} from 'react';
import './App.css';
import office from "./images/office.jpg";

function App() {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const handleSearch = () => {
  const url =
  `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=495479ac&app_key=bf9d91177d26a794d6eee0b9ec0a7038&results_per_page=10&what=${query}&content-type=application/json`;

fetch(url, {
  method: 'GET',
  mode: 'cors', // Ensure this is 'cors' if the API supports it
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => setJobs(data.results || []))
  .catch((error) => console.error('Error:', error));
};
  return (
    <div className="App">
      <img src={office} alt="office" className='office'/>
    <div className="search-container">
      <h1>React Job Search</h1>
      <div className='input-field'>
      <input 
      type="text"
      placeholder='Search for a job'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul class="list">
      {jobs.map((job) => {
        return(
        <li key={job.id}>
          <span className="job-title">{job.title}</span>
          <span className="salary">{job.salary_min} - {job.salary_max}</span>
          <span className="location">{job.location.display_name}</span>
          <p className="description">{job.description}</p>
        </li>
        )
      })}
      </ul>
    </div>
     </div>
  );
}

export default App;
