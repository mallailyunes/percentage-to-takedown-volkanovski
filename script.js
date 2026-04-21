let fighterList = []; // Initialize as empty array

// 1. Fetch the data once when the page loads
fetch('https://api.octagon-api.com/fighters')
  .then(response => {
    if (!response.ok) throw new Error("Could not reach Octagon API");
    return response.json();
  })
  .then(data => {
    console.log("Data loaded successfully:", data);
    // Adjust this: if the API returns { fighters: [...] }, use data.fighters
    fighterList = Object.values(data);
    console.log(fighterList);
  })
  .catch(err => console.error("Initial fetch error:", err));

const input = document.getElementById("fighter");
const resultsList = document.getElementById("results");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", () => {
  const query = input.value.trim().toLowerCase();
  
  // Clear previous results
  resultsList.innerHTML = "";

  if (!query) {
    resultsList.innerHTML = "<li>Please enter a name to search.</li>";
    return;
  }

  // 2. Search the LOCAL fighterList instead of fetching again
  const matches = fighterList.filter(fighter => 
    fighter.name.toLowerCase().includes(query)
  );

  if (matches.length > 0) {
    resultsList.innerHTML = matches
      .map(f => `<li>${f.name} (Weightclass: ${f.category || 'N/A'})</li>`)
      .join("");
  } else {
    resultsList.innerHTML = `<li>No matches found for "${query}".</li>`;
  }
});