const getDataCVS = () => {
    const url = 'data.csv'
    return fetch(url)
        .then(res => res.text())
        .catch(console.error.bind(console, 'FETCH FAILED!'))
}

const csvToData = cvs => {
    const trimWhiteSpace = item => typeof item === 'string' ? item.trim() : item
    const lines = cvs.split('\n').filter(String)
    const seperator = ';'
    const headers = lines.splice(0, 1)[0].split(seperator).map(trimWhiteSpace)


    const result = []
    lines.forEach(item => {
        let obj = {}
        let currentline = item.split(seperator)

        headers.forEach((h, index) => {
            let value = currentline[index]
            obj[h] = trimWhiteSpace(value)
        })

        result.push(obj)
    })

    return result
}

const filterAnswer = (value, list) => list.filter(x => x['ANSWER'] === value)


const attachElement = (elementById, list) => {
    const labels = _.uniq(list.map(data => data['DATE']))
    const data = []
    labels.forEach(label => {
        const amount = list.filter(item => item['DATE'] === label).length
        data.push(amount)
    })


    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Yes',
                backgroundColor: 'red',
                borderColor: 'blue',
                data: data
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Precentage %'
                    }
                }]
            }
        }
    }
    var ctx = document.getElementById(elementById).getContext('2d')
    var myChart = new Chart(ctx, config)

    return list
}
getDataCVS()
.then(csvToData)
.then(filterAnswer.bind(null, 'yes'))
.then(attachElement.bind(null, 'myChart'))
.then(data => {
    console.log(JSON.stringify(data, null, 4))
    return data
})
.catch(console.error.bind(console, '#SOMETHING FAILED:'))