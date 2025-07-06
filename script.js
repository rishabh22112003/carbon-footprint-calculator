// Show welcome message with animation on page load
window.onload = function () {
    let welcomeModal = document.getElementById("welcomeModal");
    welcomeModal.style.display = "flex";
    setTimeout(() => {
        welcomeModal.style.opacity = "1";
        welcomeModal.style.transform = "scale(1)";
    }, 100);
};

// Close welcome message
function closeWelcome() {
    let welcomeModal = document.getElementById("welcomeModal");
    welcomeModal.style.opacity = "0";
    welcomeModal.style.transform = "scale(0.8)";
    setTimeout(() => {
        welcomeModal.style.display = "none";
    }, 300);
}

// Calculate Carbon Footprint
function calculateFootprint() {
    let name = document.getElementById("name").value || "Anonymous";
    let travel = parseFloat(document.getElementById("travel").value) || 0;
    let energy = parseFloat(document.getElementById("energy").value) || 0;
    let waste = parseFloat(document.getElementById("waste").value) || 0;
    let consumption = parseFloat(document.getElementById("consumption").value) || 0;

    let travelCO2 = travel * 0.2;
    let energyCO2 = energy * 0.5;
    let wasteCO2 = waste * 1.2;
    let consumptionCO2 = consumption * 0.3;

    let totalCO2 = travelCO2 + energyCO2 + wasteCO2 + consumptionCO2;
    document.getElementById("result").innerHTML = `<h3>${name}'s Carbon Footprint: ${totalCO2.toFixed(2)} kg CO₂</h3>`;

    showRecommendations(travelCO2, energyCO2, wasteCO2, consumptionCO2, totalCO2);
    saveToLeaderboard(name, totalCO2);

    // Clear input fields after calculation
    document.getElementById("name").value = "";
    document.getElementById("travel").value = "";
    document.getElementById("energy").value = "";
    document.getElementById("waste").value = "";
    document.getElementById("consumption").value = "";
}

// Generate recommendations based on footprint score
function showRecommendations(travelCO2, energyCO2, wasteCO2, consumptionCO2, totalCO2) {
    let recommendations = document.getElementById("recommendations");
    recommendations.innerHTML = "<h3>How to Reduce Your Carbon Footprint:</h3>";

    if (travelCO2 > 20) recommendations.innerHTML += "<p>🚲 Consider using public transport, biking, or carpooling.</p>";
    if (energyCO2 > 50) recommendations.innerHTML += "<p>💡 Switch to renewable energy sources and use energy-efficient appliances.</p>";
    if (wasteCO2 > 30) recommendations.innerHTML += "<p>🔄 Reduce, Reuse, Recycle. Minimize plastic use.</p>";
    if (consumptionCO2 > 40) recommendations.innerHTML += "<p>👕 Buy eco-friendly products and avoid overconsumption.</p>";
    if (totalCO2 < 30) recommendations.innerHTML += "<p>🎉 Great job! Your carbon footprint is low.</p>";
}

// Show a random Sustainable Development Goal (SDG) fact
function showFact() {
    let facts = [
        "🌱 The UN Sustainable Development Goals aim to end poverty and protect the planet by 2030.",
        "💧 SDG 6 focuses on clean water and sanitation for all.",
        "🌞 SDG 7 promotes affordable and clean energy.",
        "🏡 SDG 11 supports sustainable cities and communities.",
        "🌿 Planting trees helps combat climate change (SDG 13).",
        "🌊 SDG 14 aims to protect life below water.",
        "🌍 SDG 15 focuses on protecting life on land, including forests and biodiversity."
    ];

    let randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById("factDisplay").innerText = randomFact;
}

// Show and hide the Carbon Footprint Container
function showContainer() {
    let container = document.getElementById("footprintContainer");
    container.style.display = "block";
    setTimeout(() => {
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
    }, 100);
}

function hideContainer() {
    let container = document.getElementById("footprintContainer");
    container.style.opacity = "0";
    container.style.transform = "translateY(-20px)";
    setTimeout(() => {
        container.style.display = "none";
    }, 300);
}

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Check if Dark Mode was previously enabled
    if (localStorage.getItem("dark-mode") === "enabled") {
        enableDarkMode();
    }

    darkModeToggle.addEventListener("click", function () {
        if (document.body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        document.body.classList.add("dark-mode");
        darkModeToggle.innerText = "☀️ Light Mode";
        localStorage.setItem("dark-mode", "enabled");
    }

    function disableDarkMode() {
        document.body.classList.remove("dark-mode");
        darkModeToggle.innerText = "🌙 Dark Mode";
        localStorage.setItem("dark-mode", "disabled");
    }
});

// Save and Load Leaderboard with Names and Ranks
function saveToLeaderboard(name, score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => a.score - b.score); // Sort by score (ascending)
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    loadLeaderboard();
}

function loadLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let leaderboardList = document.getElementById("leaderboardList");
    leaderboardList.innerHTML = "";

    leaderboard.slice(0, 5).forEach((entry, index) => {
        let li = document.createElement("li");
        li.innerHTML = `#${index + 1}: ${entry.name} - ${entry.score.toFixed(2)} kg CO₂`;
        leaderboardList.appendChild(li);
    });
}

// Clear Leaderboard
function clearLeaderboard() {
    localStorage.removeItem("leaderboard");
    loadLeaderboard(); // Refresh leaderboard after clearing
}