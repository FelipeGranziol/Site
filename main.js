function trunc(num, digits) {
    const factor = Math.pow(10, digits);
    return Math.floor(num * factor) / factor;
}
function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function metodoAleatorio(){
    const enterValuesField = document.getElementById("randomWindSpeed")
    const otherField = document.getElementById("fixWindSpeed");
    otherField.innerHTML = ""
    enterValuesField.innerHTML = `<h2>Velocidade do Vento</h2>
        <div class="form-container">
            <form>
              <div class="form-group">
                <label for="minWind">Velocidade mínima do vento (km/h)</label>
                <input type="number" id="minWind" name="minWind" step="0.1" min="0" placeholder="Ex: 1">
              </div>
        
              <div class="form-group">
                <label for="maxWind">Velocidade máxima do vento (km/h)</label>
                <input type="number" id="maxWind" name="maxWind" step="0.1" min="0" placeholder="Ex: 7">
              </div>
              <div class="form-group">
                <label for="maxWind">Número de testes</label>
                <input type="number" id="testNumber" name="testNumber" step="0.1" min="0" placeholder="Ex: 10">
              </div>
              <div class="form-group">
                <label for="maxWind">Delay em segundos</label>
                <input type="number" id="delay" name="delay" step="0.1" min="0" placeholder="Ex: 10">
              </div>
        
              <button type="button" onclick = "aleatorio(event)" class= "buttoncalc">Calcular</button>
              <button type="reset" class= "buttonclear">Limpar</button>
            </form>
            </div>`
}


function metodoEscolhido(){
    const enterValuesField = document.getElementById("fixWindSpeed")
    const otherField = document.getElementById("randomWindSpeed");
    otherField.innerHTML = ""
    enterValuesField.innerHTML = `<h2>Valores da Velocidade do Vento</h2>
         <div class="form-container">
            
            <form>
                <div class="form-group">
                  <label for="minWind">Velocidade do vento (km/h)</label>
                  <input type="number" id="Wind" name="Wind" step="0.1" min="0" placeholder="Ex: 1">
                </div>
          
                <button type="submit" class= "buttoncalc" onclick = "escolhido(event)">Calcular</button>
                <button type="reset" class = "buttonclear">Limpar</button>
              </form>


          </div>`
}

function escolhido(event) {
    event.preventDefault();
    let vt = parseFloat(document.getElementById("Wind").value);
    let vento = trunc(vt / 3.6, 2);
    const valuesResponse = document.getElementById("windValue")
    const D = Math.sqrt((0.000326 * vento) / 9800) * 1000000;
    valuesResponse.innerHTML = `
    <div class="form-container">
            <div class="form-group">
            <p>Velocidade do vento = ${vt} km/h</p>
            <p>Diâmetro da gota = ${D.toFixed(2)} milímetros</p>
            </div>
        
  </div>`
   
    
}


function aleatorio(event) {
    event.preventDefault();
    const valuesResponse = document.getElementById("windValue");
    let vtMin = parseFloat(document.getElementById("minWind").value);
    let vtMax = parseFloat(document.getElementById("maxWind").value);
    let testes = parseInt(document.getElementById("testNumber").value);
    let delay = parseFloat(document.getElementById("delay").value);

    let tries = 0;
    let resultados = [];

    function loop() {
        setTimeout(() => {
            let vt = gerarNumeroAleatorio(vtMin, vtMax);
            let vento = trunc(vt / 3.6, 2);
            let d = Math.sqrt((0.000326 * vento) / 9800) * 1000000;

            resultados.push({ vt, vento, d });

            
            valuesResponse.innerHTML = `
                <div class="form-container">
                    <div class="form-group">
                        <p>Velocidade do vento = ${vt} km/h</p>
                        <p>Diâmetro da gota = ${d.toFixed(2)} milímetros</p>
                    </div>
                </div>
            `;

            tries++;

          
            if (tries >= testes) {
                let tabelaHTML = `
                    <h3 style="text-align": center;>Resultados:</h3>
                    <table style="margin: 0 auto;" border="1" cellpadding="5" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Velocidade do Vento (km/h)</th>
                                <th>Velocidade (m/s)</th>
                                <th>Diâmetro da Gota (mm)</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                resultados.forEach((res, index) => {
                    tabelaHTML += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${res.vt}</td>
                            <td>${res.vento}</td>
                            <td>${res.d.toFixed(2)}</td>
                        </tr>
                    `;
                });

                tabelaHTML += `</tbody></table>`;
                
                setTimeout(() => {
                    valuesResponse.innerHTML = tabelaHTML;
                }, delay * 1000);
            } else {
               
                loop();
            }
        }, delay * 1000);
    }

    valuesResponse.innerHTML = "<p>Iniciando cálculos...</p>";
    loop();
}
