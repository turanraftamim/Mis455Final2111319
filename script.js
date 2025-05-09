function searchCountry() {
    const country = document.getElementById('countryInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous result
  
    if (!country) {
      alert("Please enter a country name.");
      return;
    }
  
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(response => {
        if (!response.ok) throw new Error('Country not found');
        return response.json();
      })
      .then(data => {
        const countryData = data[0]; // Use first result
        const name = countryData.name.common;
        const capital = countryData.capital ? countryData.capital[0] : 'N/A';
        const flag = countryData.flags.svg;
        const currency = Object.values(countryData.currencies)[0].name;
        const population = countryData.population.toLocaleString();
        const region = countryData.region;
        const timezone = countryData.timezones[0];
  
        resultDiv.innerHTML = `
          <h2>${name}</h2>
          <img class="flag" src="${flag}" alt="Flag of ${name}" />
          <p><strong>Capital:</strong> ${capital}</p>
          <p><strong>Currency:</strong> ${currency}</p>
          <p><strong>Population:</strong> ${population}</p>
          <p><strong>Region:</strong> ${region}</p>
          <p><strong>Timezone:</strong> ${timezone}</p>
        `;
      })
      .catch(error => {
        resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
      });
  }
  