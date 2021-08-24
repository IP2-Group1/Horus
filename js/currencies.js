//add code here
let data = {};
let covid_data = {};

const chart_canvas = document.getElementById('currency_canvas');
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

function get_data() {
    const data = [];
    for (let data_point of covid_data) {
        const data_value = data_point["c"];
        if (data_value) {
            const date = new Date(data_point["t"]);
            console.log(date);
            data.push({
                x: date.toDateString(),
                y: data_value
            });
        }
    }
    return data;
}

function get_dataset() {

    return {
        label: "EURUSD",
        backgroundColor: "blue",
        fill: true,
        data: get_data(),
    };
}

function display_chart() {
    covid_data = data["results"];
    const dataset = get_dataset();

    chart_config['data'] = {
        datasets: [dataset]
    };

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(chart_canvas, chart_config);
    chart.draw();
}

async function fetch_currency_data() {
    
    const response = await fetch('https://api.polygon.io/v2/aggs/ticker/C:EURUSD/range/1/day/2019-10-14/2020-10-14?adjusted=true&sort=asc&limit=120&apiKey=7tIiqKdQ4yKrxC_rzxrUQb3UtJNGCpzq');
    data = await response.json();

        display_chart();
}

fetch_currency_data();
