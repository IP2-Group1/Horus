const covid_select = document.getElementById('covid_select');
let data = {};
let covid_data = {};

const chart_canvas = document.getElementById('covid_canvas');
let chart = null;

const chart_config = {
    type: 'line',
    options: {
        responsive: true,
        stacked: false,
        plugins: {
            decimation: {
                algorithm: 'lttb',
                samples: 10,
            }
        }
    }
};

function get_data(data_key) {
    const data = [];
    for (let data_point of covid_data['data']) {
        const data_value = data_point[data_key];
        if (data_value) {
            data.push({
                x: data_point['date'],
                y: data_value
            });
        }
    }
    return data;
}

function get_dataset(selected_option) {
    let color = selected_option.getAttribute('data-color');

    return {
        label: selected_option.textContent,
        backgroundColor: color,
        fill: true,
        data: get_data(selected_option.value),
    };
}
const selected_country = document.getElementById("country_select");
selected_country.addEventListener("input", display_chart);
covid_select.addEventListener('input', display_chart);

function display_chart() {
    let country = selected_country.selectedOptions[0];
    covid_data = data[country.value];
    const selected_option = covid_select.selectedOptions[0];
    const dataset = get_dataset(selected_option);

    chart_config['data'] = {
        datasets: [dataset]
    };

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(chart_canvas, chart_config);
    chart.draw();
}

async function fetch_covid_data() {
    
    const response = await fetch('https://covid.ourworldindata.org/data/owid-covid-data.json');
    data = await response.json();

        display_chart();
}

fetch_covid_data();
