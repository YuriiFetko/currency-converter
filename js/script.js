
let inputUan = document.getElementById('uan'),
    inputUsd = document.getElementById('usd');


function converter(typeCurrency) {
    typeCurrency.addEventListener('input', () => {
        function catchData() {
            return new Promise(function (resolve, reject) {
                let request = new XMLHttpRequest();

                request.open('GET', 'js/current.json');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                request.send();

                request.onload = function () {
                    if (request.readyState === 4) {
                        if (request.status == 200) {
                            resolve(this.response)
                        }
                        else {
                            reject('error');
                        }
                    }
                }
            });
        };
        catchData()
            .then(response => {
                console.log(response);
                let data = JSON.parse(response);
                inputUsd.value = typeCurrency.value / data.usd;
            })
            .catch(() => inputUsd.value = "Что-то пошло не так")
            .finally(console.log("finally block"))
    });
};

let output_data = converter(inputUan);