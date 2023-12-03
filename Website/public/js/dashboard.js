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
var melhoresMapas = sessionStorage.MELHORES_MAPA.split(',')
var mapasWr = sessionStorage.MELHORES_MAPA_WR.split(',')
var armas = sessionStorage.ARMAS.split(',')
var armasAbate = sessionStorage.ARMAS_ABATE.split(',')
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
    labels: melhoresMapas,
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
        responsive: true,
        maintainAspectRatio: false,
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
                text: 'Melhores Mapas',
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
    labels: armas,
    datasets: [{
        data: armasAbate,
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
        responsive: true,
        maintainAspectRatio: false,
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

// Gráfico de barra melhores mapas

const borderColor = ['rgba(202, 81, 81, 0.8)', 'rgba(202, 81, 81, 0.8)', 'rgba(202, 81, 81, 0.8)', 'rgba(202, 81, 81, 0.8)', 'rgba(202, 81, 81, 0.8)',
'rgba(202, 81, 81, 0.8)'];
const backgroundColor = ['rgb(113, 178, 76)', 'rgb(113, 178, 76)', 'rgb(113, 178, 76)', 'rgb(113, 178, 76)', 'rgb(113, 178, 76)', 'rgb(113, 178, 76)',];

let merged = melhoresMapas.map((border, i) => {
    return {"border": borderColor[i], "background": backgroundColor[i], "datapoint": mapasWr[i], "label": melhoresMapas[i]}
});

const dataSort = merged.sort(function (a, b) {
    return  b.datapoint - a.datapoint 
}) 

const bcMap = [];
const bgcMap = [];
const dbMap = [];
const labMap = [];

for (var i = 0; i < dataSort.length; i++) {
    bcMap.push(dataSort[i].border);
    bgcMap.push(dataSort[i].background);
    dbMap.push(dataSort[i].datapoint);
    labMap.push(dataSort[i].label);
}

const data = {
    labels: labMap,
    datasets: [{
        data: dbMap,
        borderColor: bcMap,
        backgroundColor: bgcMap,
        fill: true,
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
            title: {
                display: true,
                text: 'Melhores mapas',
                color: '#fff',
                font: {
                    size: 16,
                },
                padding: {
                    top: 5,
                    bottom: 5
                }
            },
            legend: {
                display: false
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


const borderColorWep = ['rgba(28, 36, 79, 0.2)', 'rgba(28, 36, 79, 0.2)', 'rgba(28, 36, 79, 0.2)', 'rgba(28, 36, 79, 0.2)', 'rgba(28, 36, 79, 0.2)', 
'rgba(28, 36, 79, 0.2)',];
const backgroundColorWep = ['rgba(41, 52, 115, 1)', 'rgba(41, 52, 115, 1)', 'rgba(41, 52, 115, 1)', 'rgba(41, 52, 115, 1)', 'rgba(41, 52, 115, 1)',
'rgba(41, 52, 115, 1)',];

let mergedWep = armas.map((armasNome, i) => {
    return {"datapoint": armasAbate[i], "label": armas[i], }
});

const dataSortWep = mergedWep.sort(function (a, b) {
    return  b.datapoint - a.datapoint 
}) 

/* const bcWep = [];
const bgcWep = []; */
const dbWep = [];
const labWep = [];

for (var i = 0; i < dataSortWep.length; i++) {
/*     bcWep.push(dataSortWep[i].border);
    bgcWep.push(dataSortWep[i].background); */
    dbWep.push(dataSortWep[i].datapoint);
    labWep.push(dataSortWep[i].label);
}

const dataTopWeapon = {
    labels: labWep,
    datasets: [{
        data: dbWep,
        backgroundColor: backgroundColorWep,
        borderColor: borderColorWep,
        fill: true,
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
            title: {
                display: true,
                text: 'Mais abates',
                color: '#fff',
                font: {
                    size: 16,
                },
                padding: {
                    top: 5,
                    bottom: 5
                }
            },
            legend: {
                display: false
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
