const voltageSpan = document.getElementById("voltage");
const currentSpan = document.getElementById("current");
const powerSpan = document.getElementById("power");
const refreshBtn = document.getElementById("refreshBtn");
const downloadBtn = document.getElementById("downloadBtn");

let chart;
let dataLog = []; // stores all historical data

function getCurrentTime() {
  return new Date().toLocaleTimeString();
}

function generateFakeData() {
  const voltage = 18 + Math.random() * 2;
  const current = 2 + Math.random();
  const power = voltage * current;
  const timestamp = getCurrentTime();

  return { voltage, current, power, timestamp };
}

function updateUI({ voltage, current, power, timestamp }) {
  voltageSpan.textContent = voltage.toFixed(2);
  currentSpan.textContent = current.toFixed(2);
  powerSpan.textContent = power.toFixed(2);

  chart.data.labels.push(timestamp);
  chart.data.datasets[0].data.push(power);
  chart.update();

  dataLog.push({ voltage, current, power, timestamp });
}

function refreshData() {
  const data = generateFakeData();
  updateUI(data);
}

// 5 min refresh trigger via button
refreshBtn.addEventListener("click", refreshData);

// CSV Download
downloadBtn.addEventListener("click", () => {
  let csvContent = "data:text/csv;charset=utf-8,Time,Voltage,Current,Power\n";
  dataLog.forEach(entry => {
    csvContent += `${entry.timestamp},${entry.voltage.toFixed(2)},${entry.current.toFixed(2)},${entry.power.toFixed(2)}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "solar_data_log.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

window.onload = () => {
  const ctx = document.getElementById('graph').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Power (W)',
        borderColor: '#f39c12',
        data: []
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Time' } },
        y: { title: { display: true, text: 'Watts' } }
      }
    }
  });
};
