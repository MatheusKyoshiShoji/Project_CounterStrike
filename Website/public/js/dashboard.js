// DATA STORAGE
var partidas = sessionStorage.PARTIDAS;
var partidasGanha = sessionStorage.PARTIDAS_GANHA 
var roundsJogados = sessionStorage.ROUNDS_JOGADOS 
var mvps = sessionStorage.MVP 
var abates = sessionStorage.ABATES 
var mortes = sessionStorage.MORTES 
var danoCausado = sessionStorage.DANO_CAUSADO 
var hs = sessionStorage.HS 
var bombasPlantadas = sessionStorage.BOMBAS_PLANTADAS 
var bombasDefusadas = sessionStorage.BOMBAS_DEFUSADAS 
var melhoresMapas = sessionStorage.MELHORES_MAPA 
var mapasWr = sessionStorage.MELHORES_MAPA_WR 
var melhorMapa = sessionStorage.MELHOR_MAPA 
var piorMapa = sessionStorage.PIOR_MAPA 
// DATA CALCULO
var taxaVitoria = (partidasGanha / partidas) * 100;
var taxaHs = (hs / abates) * 100;
var adr = (danoCausado / roundsJogados).toFixed(0);
var kd = abates / mortes;
var kpr = abates / roundsJogados;
var dpr = mortes / roundsJogados;
var rating = (kpr + dpr + kd) / 3;

console.log(melhoresMapas);
console.log(mapasWr);

function exibirDados() {
    var idPartidasGanhasPerfil = document.querySelector(".partidas-ganha-perfil")
    var idPartidasGanhas = document.querySelector(".partidas-ganha")
    idPartidasGanhasPerfil.innerHTML = `${partidasGanha}` 
    idPartidasGanhas.innerHTML = `${partidasGanha}` 
    var idTaxaVitoria = document.getElementById('taxa-vitoria')
    idTaxaVitoria.innerHTML = `${taxaVitoria.toFixed(2)}%` 
    var idPartidasJogadas = document.getElementById('partidas-jogadas')
    idPartidasJogadas.innerHTML = `${partidas}` 
    var idMvp = document.getElementById('mvps')
    idMvp.innerHTML = `${mvps}` 
    var idTaxaHs = document.getElementById('taxa-hs')
    idTaxaHs.innerHTML = `${taxaHs.toFixed(2)}%` 
    var idAbates = document.getElementById('abates')
    idAbates.innerHTML = `${abates}` 
    var idMortes = document.getElementById('mortes')
    idMortes.innerHTML = `${mortes}` 
    var idHs = document.getElementById('hs')
    idHs.innerHTML = `${hs}` 
    var idAdr = document.getElementById('adr')
    idAdr.innerHTML = `${adr}` 
    var idDanoCausado = document.getElementById('dano-causado')
    idDanoCausado.innerHTML = `${danoCausado}` 
    var idRoundsJogados = document.getElementById('rounds-jogado')
    idRoundsJogados.innerHTML = `${roundsJogados}` 
    var idBombasPlantadas = document.getElementById('bombas-plantadas')
    idBombasPlantadas.innerHTML = `${bombasPlantadas}` 
    var idBombasDefusadas = document.getElementById('bombas-defusadas')
    idBombasDefusadas.innerHTML = `${bombasDefusadas}` 
    var idMapaFavorito = document.getElementById('mapa-favorito')
    idMapaFavorito.innerHTML = `${melhorMapa}` 

    var imgMapaFavorito = document.getElementById('mapa-favorito-img');
    imgMapaFavorito.src = `../assets/img/Maps/${melhorMapa}_logo.png`
}

document.addEventListener("DOMContentLoaded", () => { 
    exibirDados();
});


// GRÁFICOS

const ctxMapPlayed = document.getElementById('map_played').getContext('2d');
const ctxWeapon = document.getElementById('weapon_used').getContext('2d');

const dataMap = {
    labels: [
        'Mirage',
        'Overpass',
        'Dust 2',
        'Vertigo',
    ],
    datasets: [{
        data: mapasWr,
        fill: true,
        backgroundColor: 'rgba(53, 97, 44, 0.6)',
        borderColor: 'rgb(62, 207, 68)',
        pointBackgroundColor: 'rgb(62, 207, 68)',
        pointBorderColor: 'rgb(62, 207, 68)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(62, 207, 68)'
    },]
};

const configMapPlayed = {
    type: 'radar',
    data: dataMap,
    options: {
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 100,
                backgroundColor: '#1F202F',
                ticks: {
                    maxTicksLimit: 6,
                    display: false
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Performance Mapas',
                color: '#fff',
                font: {
                    size: 16,
                }
            },
            legend: {
                display: false
            }
        }
    },
};

const mapsPlayedChart = new Chart(ctxMapPlayed, configMapPlayed);

const dataWeapon = {
    labels: [
        'Ak-47',
        'M4a1',
        'AWP',
        'Deagle',
        'Famas',
        'Galilar',
        'p90'
    ],
    datasets: [{
        data: [80, 70, 60, 64, 40, 38, 68],
        fill: true,
        backgroundColor: 'rgba(53, 97, 44, 0.6)',
        borderColor: 'rgb(62, 207, 68)',
        pointBackgroundColor: 'rgb(62, 207, 68)',
        pointBorderColor: 'rgb(62, 207, 68)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(62, 207, 68)'
    },]
};

const configWeapon = {
    type: 'radar',
    data: dataWeapon,
    options: {
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 100,
                backgroundColor: '#1F202F',
                ticks: {
                    maxTicksLimit: 6,
                    display: false,
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Performace armas',
                color: '#fff',
                font: {
                    size: 16,
                }
            },
            legend: {
                display: false
            }
        }
    },
};

const weaponChart = new Chart(ctxWeapon, configWeapon);

// GRÁFICOS KD E Rating

const dataValueKd = [kd.toFixed(2), kd.toFixed(2) - 1.5]
const dataKd = {
    datasets: [{
        data: dataValueKd,
        backgroundColor: ['rgb(113, 178, 76)', 'rgb(202, 81, 81)'],
        borderColor: ['rgb(113, 178, 76)', 'rgb(202, 81, 81)'],
        borderWidth: 1,
        cutout: '95%',
        radius: '70%',
    }]
}

const textoPorcentagemKd = {
    id: 'textoPorcentagemKd',
    afterDatasetsDraw(chart, args, pluginOptions) {
        const { ctx } = chart;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 21px sans-serif';
        ctx.fillStyle = '#fff'
        const texto = `${dataValueKd[0]}`;
        const textoWidth = ctx.measureText(texto).width

        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;
        ctx.fillText(texto, x, y);

    }
}

const configKd = {
    type: 'doughnut',
    data: dataKd,
    options: {
        aspectRatio: 1,
        plugins: {
            title: {
                display: true,
                text: 'K/D',
                color: '#fff',
                font: {
                    size: 14,
                },
                padding: {
                    top: 5,
                    bottom: 5
                }
            },
            legend: {
                display: false
            },
            scales: {
                suggestedMin: 0,
                suggestedMax: 1.5,
            }
        }
    },
    plugins: [textoPorcentagemKd],
}

const ctxKd = document.getElementById('chart_kd').getContext('2d');
const kdChart = new Chart(ctxKd, configKd);

const dataValueRating = [rating.toFixed(2), rating - 1.5]
const dataRating = {
    datasets: [{
        data: dataValueRating,
        backgroundColor: ['rgb(113, 178, 76)', 'rgb(202, 81, 81)'],
        borderColor: ['rgb(113, 178, 76)', 'rgb(202, 81, 81)'],
        borderWidth: 1,
        cutout: '95%',
        radius: '70%',
    }]
}

const textoPorcentagemRating = {
    id: 'textoPorcentagemRating',
    afterDatasetsDraw(chart, args, pluginOptions) {
        const { ctx } = chart;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 21px sans-serif';
        ctx.fillStyle = '#fff'
        const texto = `${dataValueRating[0]}`;
        const textoWidth = ctx.measureText(texto).width

        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;
        ctx.fillText(texto, x, y);

    }
}

const configRating = {
    type: 'doughnut',
    data: dataRating,
    options: {
        aspectRatio: 1,
        plugins: {
            title: {
                display: true,
                text: 'Rating',
                color: '#fff',
                font: {
                    size: 14,
                },
                padding: {
                    top: 5,
                    bottom: 5
                }
            },
            legend: {
                display: false
            }
        }
    },
    plugins: [textoPorcentagemRating],
}

const ctxRating = document.getElementById('chart_Rating').getContext('2d');
const RatingChart = new Chart(ctxRating, configRating);


const data = {
    labels: [
        'Mirage',
        'Overpass',
        'Dust 2',
        'Vertigo',
        'Inferno',
    ],
    datasets: [{
        data: [68, 60, 54, 52, 51],
        fill: true,
        backgroundColor: [
            'rgb(113, 178, 76)',
            'rgb(113, 178, 76)',
            'rgb(113, 178, 76)',
            'rgb(113, 178, 76)',
            'rgb(113, 178, 76)',
        ],
        borderColor: [
            'rgba(202, 81, 81, 0.8)',
            'rgba(202, 81, 81, 0.8)',
            'rgba(202, 81, 81, 0.8)',
            'rgba(202, 81, 81, 0.8)',
            'rgba(202, 81, 81, 0.8)',
          ],
        borderWidth: 0,
        borderSkipped: false,
        borderRadius: 10,
        barPercentage: 0.2,
        categoryPercentage: 0.8,
    },]
};

// Barra de progresso

const progressBar = {
    id: 'progressBar',
    beforeDatasetsDraw(chart, args, pluginsOptions) {
        const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

        ctx.save();
        const barHeight = height / y.ticks.length * data.datasets[0].barPercentage * 
        data.datasets[0].categoryPercentage;

        data.datasets[0].data.forEach((datapoint, index) => {
            const fontSizeLabel = 12;
            ctx.font = `${fontSizeLabel}px sans-serif`;
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 5);

            const fontSizeDatapoint = 12;
            ctx.font = `bolder ${fontSizeDatapoint}px sans-serif`;
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(datapoint, right, y.getPixelForValue(index) - fontSizeDatapoint - 5);

            ctx.beginPath();
            ctx.fillStyle = data.datasets[0].borderColor[index];
            ctx.fillRect(left, y.getPixelForValue(index) - (barHeight / 2), width, barHeight)
        });
    }
}

// config 
const configTopMap = {
    type: 'bar',
    data,
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    display: false
                }
            },
        }
    },
    plugins: [progressBar]
};

// render init block
const chartTopMap = new Chart(
    document.getElementById('top_map'),
    configTopMap
);



const dataTopWeapon = {
    labels: [
        'AK-47',
        'M4A1',
        'AWP',
        'Degle',
        'P90',
    ],
    datasets: [{
        data: [80, 72, 60, 50, 48],
        fill: true,
        backgroundColor: 'rgba(53, 97, 44, 0.6)',
        backgroundColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
        ],
        borderColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
        borderWidth: 0,
        borderSkipped: false,
        borderRadius: 10,
        barPercentage: 0.2,
        categoryPercentage: 0.8,
    },]
};

const configTopWeapon = {
    type: 'bar',
    data: dataTopWeapon,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    display: false
                }
            },
        }
    },
    plugins: [progressBar]
};

// render init block
const chartTopWeapon = new Chart(
    document.getElementById('top_weapon'),
    configTopWeapon
);
