document.addEventListener('DOMContentLoaded', function () {

    const table = document.getElementById('userdata'),
        age = document.getElementById('age'),
        name = document.getElementById('name'),
        th = document.querySelectorAll('th'),
        tHead = document.getElementById('head');


    const request = new XMLHttpRequest();
    request.open('GET', 'src/small_data_persons.json');
    request.setRequestHeader('Content-type', 'application/json;', 'charset=utf-8');
    request.send();
    request.addEventListener('load', () => {

        const data = JSON.parse(request.response);

        createData(table);


        function createData(arr) {

            const bodyToRemove = document.getElementById('tbody');

            if (bodyToRemove) {
                table.removeChild(bodyToRemove);
            }


            if (request.status === 200) {
                const tBody = document.createElement('tbody');
                tBody.id = 'tbody';
                table.appendChild(tBody);
                console.log(data);
                data.forEach(function (row) {

                    let tr = document.createElement('tr');
                    Object.keys(row).forEach(function (key) {
                        let td = document.createElement('td');
                        td.innerHTML = row[key];
                        tr.appendChild(td);
                    });
                    arr.appendChild(tr);
                    tBody.appendChild(tr);
                });
            }
        }

        const bodyRow = table.querySelectorAll('tbody tr');
        for (let i = 0; i < bodyRow.length; i++) {
            bodyRow[i].innerHTML += '<td><button  title="Remove"></td>';
        }

        table.addEventListener('click', (e) => {
            if (e.target.nodeName == "BUTTON") {
                let cell = e.target.parentNode;     
                cell.parentNode.classList.add("hidden");
                e.target.remove();
            }
        });



        function sortDataByName() {
            data.sort(function (a, b) {
                return ('' + a.Name).localeCompare(b.Name);
            });
            createData(table);
        }


        function sortDataByAge() {
            data.sort(function (a, b) {
                return ('' + a.Age).localeCompare(b.Age);
            });
            createData(table);
        }


        age.addEventListener('click', sortDataByAge);
        name.addEventListener('click', sortDataByName);


    });



});