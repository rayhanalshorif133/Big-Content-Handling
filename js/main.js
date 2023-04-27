/*
* Title: 
* Description: 
* Author: Rayhan Al Shorif
* Email: rayhanalshorif@gmail.com
* Date: 
*/

// Dependencies
// const http = require('http');
// const fs = require('fs');

// App object - module scaffolding
const app = {};

// Configuration


// Create server
app.main = () => {
    // thumbnail
    const small_data = 'https://big-data-api-f1be2-default-rtdb.firebaseio.com/small_data.json';
    const big_data = 'https://big-data-api-f1be2-default-rtdb.firebaseio.com/big_data.json';
    const large_data = 'https://big-data-api-f1be2-default-rtdb.firebaseio.com/large_data.json';
    const semi_small_data = 'https://big-data-api-f1be2-default-rtdb.firebaseio.com/semi_small_data.json';
    const middle_small_data = 'https://big-data-api-f1be2-default-rtdb.firebaseio.com/middle_small_data.json';

    // getUserAsync(big_data)
    //     .then(data => console.log(data)); 

    getUserInBuffer(middle_small_data);
};


async function getUserAsync(name) {
    let response = await fetch(name);
    let data = await response.json()
    return data;
}


async function getUserInBuffer(name) {
    // fetch data in buffer
    let response = await fetch(name);
    let reader = response.body.getReader();
    // convert buffer to string
    let decoder = new TextDecoder();

    while (true) {
        let { done, value } = await reader.read();

        if (done) {
            break;
        }


        let value_string = decoder.decode(value);
        console.log(value_string);
        let value_json = [];



        // string to json manually
        let temp = "";
        let flag = false;
        for (let i = 0; i < value_string.length; i++) {
            if (value_string[i] == '{') {
                flag = true;
            }
            if (flag) {
                temp += value_string[i];
            }
            if (value_string[i] == '}') {
                flag = false;
                let jsonData = "";
                try{
                   jsonData = JSON.parse(temp);
                }catch(e){
                    continue;
                }
                value_json.push(jsonData);
                temp = "";
            }
        }


        value_json.forEach(element => {
            let html = `
            <div class="col-md-6">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <h3 class="mb-0">${element.title}</h3>
                  <div class="mb-1 text-muted">${element.date}</div>
                  <p class="card-text mb-auto">${element.description}</p>
                  <a href="#" class="stretched-link">Continue reading</a>
                </div>
                <div class="col-auto d-none d-lg-block">
                  <img src="${element.thumbnail}" alt="..." class="img-fluid thumbnail">
                </div>
              </div>
            </div>
            `;
            $(".append").append(html);
        });



    }
    return true;

}

// start the server
app.main();