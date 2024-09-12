let allCharacters = [];
let allLocations = [];
let allEpisodes = [];

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    const modal = document.getElementById('modal');
    const closeButton = document.getElementsByClassName('close')[0];

    closeButton.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    fetchAllCharacters();
    fetchAllLocations();
    fetchAllEpisodes();
});

async function fetchAllCharacters() {
    try {
        let url = 'https://rickandmortyapi.com/api/character';
        while (url) {
            const response = await fetch(url);
            const data = await response.json();
            allCharacters = allCharacters.concat(data.results);
            url = data.info.next;
        }
    } catch (error) {
        console.error('Error fetching all characters:', error);
    }
}

async function fetchAllLocations() {
    try {
        let url = 'https://rickandmortyapi.com/api/location';
        while (url) {
            const response = await fetch(url);
            const data = await response.json();
            allLocations = allLocations.concat(data.results);
            url = data.info.next;
        }
    } catch (error) {
        console.error('Error fetching all locations:', error);
    }
}

async function fetchAllEpisodes() {
    try {
        let url = 'https://rickandmortyapi.com/api/episode';
        while (url) {
            const response = await fetch(url);
            const data = await response.json();
            allEpisodes = allEpisodes.concat(data.results);
            url = data.info.next;
        }
    } catch (error) {
        console.error('Error fetching all episodes:', error);
    }
}

function performSearch() {
    const searchMode = document.getElementById('searchMode').value;
    if (searchMode === 'character') {
        searchCharacters();
    } else if (searchMode === 'location') {
        searchLocations();
    } else {
        searchEpisodes();
    }
}

async function searchCharacters() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    const relatedSearchesDiv = document.getElementById('relatedSearches');
    resultsDiv.innerHTML = 'Searching...';
    relatedSearchesDiv.innerHTML = '';

    // First, try to find exact matches
    const exactMatches = allCharacters.filter(character => 
        character.name.toLowerCase() === searchInput
    );

    if (exactMatches.length > 0) {
        displayCharacters(exactMatches);
        return;
    }

    // If no exact matches, use Fuse.js for fuzzy search
    const fuse = new Fuse(allCharacters, {
        keys: ['name'],
        includeScore: true,
        threshold: 0.3, // Lower threshold for stricter matching
    });

    const results = fuse.search(searchInput);

    if (results.length === 0) {
        resultsDiv.innerHTML = 'No characters found.';
        showRelatedSearches(searchInput, 'character');
        return;
    }

    // Filter results to include only those that start with the search term
    const filteredResults = results.filter(result => 
        result.item.name.toLowerCase().startsWith(searchInput)
    );

    if (filteredResults.length > 0) {
        displayCharacters(filteredResults.map(result => result.item));
    } else {
        displayCharacters(results.slice(0, 5).map(result => result.item));
    }
}

async function searchLocations() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    const relatedSearchesDiv = document.getElementById('relatedSearches');
    resultsDiv.innerHTML = 'Searching...';
    relatedSearchesDiv.innerHTML = '';

    // First, try to find exact matches
    const exactMatches = allLocations.filter(location => 
        location.name.toLowerCase() === searchInput
    );

    if (exactMatches.length > 0) {
        displayLocations(exactMatches);
        return;
    }

    // If no exact matches, use Fuse.js for fuzzy search
    const fuse = new Fuse(allLocations, {
        keys: ['name'],
        includeScore: true,
        threshold: 0.3,
    });

    const results = fuse.search(searchInput);

    if (results.length === 0) {
        resultsDiv.innerHTML = 'No locations found.';
        showRelatedSearches(searchInput, 'location');
        return;
    }

    displayLocations(results.slice(0, 5).map(result => result.item));
}

async function searchEpisodes() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    const relatedSearchesDiv = document.getElementById('relatedSearches');
    resultsDiv.innerHTML = 'Searching...';
    relatedSearchesDiv.innerHTML = '';

    // First, try to find exact matches
    const exactMatches = allEpisodes.filter(episode => 
        episode.name.toLowerCase() === searchInput || episode.episode.toLowerCase() === searchInput
    );

    if (exactMatches.length > 0) {
        displayEpisodes(exactMatches);
        return;
    }

    // If no exact matches, use Fuse.js for fuzzy search
    const fuse = new Fuse(allEpisodes, {
        keys: ['name', 'episode'],
        includeScore: true,
        threshold: 0.3,
    });

    const results = fuse.search(searchInput);

    if (results.length === 0) {
        resultsDiv.innerHTML = 'No episodes found.';
        showRelatedSearches(searchInput, 'episode');
        return;
    }

    displayEpisodes(results.slice(0, 5).map(result => result.item));
}

function displayCharacters(characters) {
    const resultsDiv = document.getElementById('results');
    let html = '';
    characters.forEach(character => {
        html += `
            <div class="character" onclick="showCharacterDetails(${character.id})">
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Species:</strong> ${character.species}</p>
                <p><strong>Gender:</strong> ${character.gender}</p>
                <p><strong>Origin:</strong> ${character.origin.name}</p>
            </div>
        `;
    });
    resultsDiv.innerHTML = html;
}

function displayLocations(locations) {
    const resultsDiv = document.getElementById('results');
    let html = '';
    locations.forEach(location => {
        html += `
            <div class="location" onclick="showLocationDetails(${location.id})">
                <h2>${location.name}</h2>
                <p><strong>Type:</strong> ${location.type}</p>
                <p><strong>Dimension:</strong> ${location.dimension}</p>
                <p><strong>Residents:</strong> ${location.residents.length}</p>
            </div>
        `;
    });
    resultsDiv.innerHTML = html;
}

function displayEpisodes(episodes) {
    const resultsDiv = document.getElementById('results');
    let html = '';
    episodes.forEach(episode => {
        html += `
            <div class="episode" onclick="showEpisodeDetails(${episode.id})">
                <h2>${episode.name}</h2>
                <p><strong>Episode:</strong> ${episode.episode}</p>
                <p><strong>Air Date:</strong> ${episode.air_date}</p>
                <p><strong>Characters:</strong> ${episode.characters.length}</p>
            </div>
        `;
    });
    resultsDiv.innerHTML = html;
}

function showRelatedSearches(searchInput, type) {
    const relatedSearchesDiv = document.getElementById('relatedSearches');
    let searchArray;
    let keys;
    
    if (type === 'character') {
        searchArray = allCharacters;
        keys = ['name', 'species', 'status'];
    } else if (type === 'location') {
        searchArray = allLocations;
        keys = ['name', 'type', 'dimension'];
    } else {
        searchArray = allEpisodes;
        keys = ['name', 'episode'];
    }

    const fuse = new Fuse(searchArray, {
        keys: keys,
        includeScore: true,
        threshold: 0.6,
    });

    const results = fuse.search(searchInput);
    
    if (results.length === 0) {
        relatedSearchesDiv.innerHTML = '<h3>No related searches found.</h3>';
        return;
    }

    let html = '<h3>Related Searches:</h3>';
    results.slice(0, 5).forEach(result => {
        html += `<span class="relatedSearch" onclick="searchSpecific('${result.item.name}', '${type}')">${result.item.name}</span>`;
    });
    relatedSearchesDiv.innerHTML = html;
}

function searchSpecific(name, type) {
    document.getElementById('searchMode').value = type;
    document.getElementById('searchInput').value = name;
    performSearch();
}

async function showCharacterDetails(characterId) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = 'Loading...';
    modal.style.display = "block";

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
        const character = await response.json();

        let episodesList = await Promise.all(character.episode.map(async (url) => {
            const episodeResponse = await fetch(url);
            const episodeData = await episodeResponse.json();
            return `<li>${episodeData.name} (${episodeData.episode})</li>`;
        }));

        modalContent.innerHTML = `
            <img src="${character.image}" alt="${character.name}" style="width:200px;border-radius:4px;">
            <h2>${character.name}</h2>
            <p><strong>Status:</strong> ${character.status}</p>
            <p><strong>Species:</strong> ${character.species}</p>
            <p><strong>Type:</strong> ${character.type || 'N/A'}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Origin:</strong> ${character.origin.name}</p>
            <p><strong>Location:</strong> ${character.location.name}</p>
            <p><strong>Created:</strong> ${new Date(character.created).toLocaleDateString()}</p>
            <h3>Episodes:</h3>
            <ul>${episodesList.join('')}</ul>
        `;
    } catch (error) {
        modalContent.innerHTML = 'An error occurred while fetching character details.';
    }
}

async function showLocationDetails(locationId) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = 'Loading...';
    modal.style.display = "block";

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/location/${locationId}`);
        const location = await response.json();

        let residentsList = await Promise.all(location.residents.slice(0, 10).map(async (url) => {
            const residentResponse = await fetch(url);
            const residentData = await residentResponse.json();
            return `<li>${residentData.name}</li>`;
        }));

        modalContent.innerHTML = `
            <h2>${location.name}</h2>
            <p><strong>Type:</strong> ${location.type}</p>
            <p><strong>Dimension:</strong> ${location.dimension}</p>
            <p><strong>Created:</strong> ${new Date(location.created).toLocaleDateString()}</p>
            <h3>Residents (showing first 10):</h3>
            <ul>${residentsList.join('')}</ul>
            <p>Total Residents: ${location.residents.length}</p>
        `;
    } catch (error) {
        modalContent.innerHTML = 'An error occurred while fetching location details.';
    }
}

async function showEpisodeDetails(episodeId) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = 'Loading...';
    modal.style.display = "block";

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
        const episode = await response.json();

        let charactersList = await Promise.all(episode.characters.slice(0, 10).map(async (url) => {
            const characterResponse = await fetch(url);
            const characterData = await characterResponse.json();
            return `<li>${characterData.name}</li>`;
        }));

        modalContent.innerHTML = `
            <h2>${episode.name}</h2>
            <p><strong>Episode:</strong> ${episode.episode}</p>
            <p><strong>Air Date:</strong> ${episode.air_date}</p>
            <p><strong>Created:</strong> ${new Date(episode.created).toLocaleDateString()}</p>
            <h3>Characters (showing first 10):</h3>
            <ul>${charactersList.join('')}</ul>
            <p>Total Characters: ${episode.characters.length}</p>
        `;
    } catch (error) {
        modalContent.innerHTML = 'An error occurred while fetching episode details.';
    }
}