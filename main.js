const apiURL = "https://your-render-backend-url.onrender.com/data";
  // Flask endpoint
const panelArea = 0.5;                        // in m²
const irradiance = 1000;                      // W/m²

let chart;

async function fetchData() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (!data.length) return;

    const latest = data[data.length - 1];

    // Update text stats
    document.getElementById("voltage").innerText = `${latest.voltage.toFixed(2)} V`;
    document.getElementById("current").innerText = `${latest.current.toFixed(2)} A`;
    document.getElementById("power").innerText = `${latest.power.toFixed(2)} W`;

    const efficiency = (latest.power / (irradiance * panelArea)) * 100;
    document.getElementById("efficiency").innerText = `${efficiency.toFixed(2)} %`;

    document.getElementById("last-updated").innerText = `Last Updated: ${latest.timestamp}`;

    const labels = data.map(d => d.timestamp);
    const efficiencyValues = data.map(d => (d.power / (irradiance * panelArea)) * 100);

    updateChart(labels, efficiencyValues);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

function updateChart(labels, values) {
  const ctx = document.getElementById("efficiencyChart").getContext("2d");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Efficiency (%)",
        data: values,
        borderColor: "#f43f5e",
        backgroundColor: "rgba(244, 63, 94, 0.2)",
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

function exportCSV() {
  window.open("http://localhost:5000/data", "_blank");
}

// Auto-load on page open
window.onload = fetchData;
