bf = [[["red", "red", "red"],
         ["red", "red", "red"],
         ["red", "red", "red"]], "f"];

br = [[["blue", "blue", "blue"],
         ["blue", "blue", "blue"],
         ["blue", "blue", "blue"]], "r"];

bb = [[["orange", "orange", "orange"],
         ["orange", "orange", "orange"],
         ["orange", "orange", "orange"]], "b"];

bl = [[["green", "green", "green"],
         ["green", "green", "green"],
         ["green", "green", "green"]], "l"];

bd = [[["yellow", "yellow", "yellow"],
         ["yellow", "yellow", "yellow"],
         ["yellow", "yellow", "yellow"]], "d"];

bu = [[["white", "white", "white"],
         ["white", "white", "white"],
         ["white", "white", "white"]], "u"];


f = [[["red", "red", "red"],
         ["red", "red", "red"],
         ["red", "red", "red"]], "f"];

r = [[["blue", "blue", "blue"],
         ["blue", "blue", "blue"],
         ["blue", "blue", "blue"]], "r"];

b = [[["orange", "orange", "orange"],
         ["orange", "orange", "orange"],
         ["orange", "orange", "orange"]], "b"];

l = [[["green", "green", "green"],
         ["green", "green", "green"],
         ["green", "green", "green"]], "l"];

d = [[["yellow", "yellow", "yellow"],
         ["yellow", "yellow", "yellow"],
         ["yellow", "yellow", "yellow"]], "d"];

u = [[["white", "white", "white"],
         ["white", "white", "white"],
         ["white", "white", "white"]], "u"];

empty = [[["empty", "empty", "empty"],
         ["empty", "empty", "empty"],
         ["empty", "empty", "empty"]], "e"];

function randomizeCube() {
    maps = [f,r,b,l,d,u];
    cells = [];
    colors = ["red", "red", "red", "red", "red", "red", "red", "red", "green", "green", "green", "green", "green", "green", "green", "green", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "white", "white", "white", "white", "white", "white", "white", "white"];
    arr = []
    while(arr.length < 48){
        x = Math.floor(Math.random()*48) + 1;
        if(arr.indexOf(x) === -1) arr.push(x);
    }
    maps.forEach(function(mapData){
        map = mapData[0];
        first_row = map[0];
        second_row = map[1];
        third_row = map[2];
        first_row.forEach(function(part, index, theArray){
            cells.push(mapData[1] + " 0 " + index);            
        });
        second_row.forEach(function(part, index, theArray){
            if(index != 1){
                cells.push(mapData[1] + " 1 " + index);
            }           
        });
        third_row.forEach(function(part, index, theArray){
            cells.push(mapData[1] + " 2 " + index);          
        });
    })
    
    for(i = 0; i < 48; i++){
        cell = cells[i];
        cell = cell.split(" ");
        pos = cell[0];
        row = cell[1];
        cell = cell[2];
        if(pos == "f"){
            f[0][row][cell] = colors[arr[i]];
        } else if(pos == "r"){
            r[0][row][cell] = colors[arr[i]];
        } else if(pos == "l"){
            l[0][row][cell] = colors[arr[i]];
        } else if(pos == "u"){
            u[0][row][cell] = colors[arr[i]];
        }else if(pos == "d"){
            d[0][row][cell] = colors[arr[i]];
        }else if(pos == "b"){
            b[0][row][cell] = colors[arr[i]];
        }
    }
    init();
}

function displaySide(input) {
    matrix = input[0];
    pos = input[1];
    table = document.createElement('table');
    table.classList.add("table");
    table.classList.add(pos);
    tableBody = document.createElement('tbody');

    matrix.forEach(function(rowData) {
        row = document.createElement('tr');
        row.classList.add("row");

        rowData.forEach(function(cellData) {
            cell = document.createElement('td');
            cell = cell.appendChild(document.createElement('span'));
            cell.classList.add("cell");
            cell.classList.add(cellData);
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.body.appendChild(table);
    
    thisTable = document.querySelectorAll('table.' + pos)[0];
    center = thisTable.querySelectorAll('.cell')[4];
    if(!center.classList.contains("empty")){
        center.classList.add("center");
        center.classList.add(pos);
    }
}

function clear() {
    [...document.getElementsByClassName("table")].map(n => n && n.remove());
}

function hideBside(){
    
    var el = document.querySelectorAll('.table.b')[0];
    if (el.classList) {
      el.classList.toggle("hidden");
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf("hidden");

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push("hidden");

      el.className = classes.join(' ');
    }
}

function rotate(matrix) {          
    const N = matrix.length - 1;   
    const result = matrix.map((row, i) => 
         row.map((val, j) => matrix[N - j][i])
    );
    matrix.length = 0;       
    matrix.push(...result); 
    return matrix;
}

function rotateU() {
    rotate(u[0]);
    temp1 = l[0][0];
    temp2 = f[0][0];
    temp3 = r[0][0];
    temp4 = b[0][0];
    l[0][0] = temp2;
    f[0][0] = temp3;
    r[0][0] = temp4;
    b[0][0] = temp1;
    init();
}

function rotateUreverse() {
    rotate(u[0]);
    rotate(u[0]);
    rotate(u[0]);
    temp1 = l[0][0];
    temp2 = f[0][0];
    temp3 = r[0][0];
    temp4 = b[0][0];
    l[0][0] = temp4;
    f[0][0] = temp1;
    r[0][0] = temp2;
    b[0][0] = temp3;
    init();
}

function rotateD() {
    rotate(d[0]);
    temp1 = l[0][2];
    temp2 = f[0][2];
    temp3 = r[0][2];
    temp4 = b[0][2];
    l[0][2] = temp4;
    f[0][2] = temp1;
    r[0][2] = temp2;
    b[0][2] = temp3;
    init();
}

function rotateDreverse() {
    rotate(d[0]);
    rotate(d[0]);
    rotate(d[0]);
    temp1 = l[0][2];
    temp2 = f[0][2];
    temp3 = r[0][2];
    temp4 = b[0][2];
    l[0][2] = temp2;
    f[0][2] = temp3;
    r[0][2] = temp4;
    b[0][2] = temp1;
    init();
}

function rotateB() {
    rotate(b[0]);
    temp1 = r[0][0][2];
    temp2 = r[0][1][2];
    temp3 = r[0][2][2];
    
    
    temp4 = u[0][0][2];
    temp5 = u[0][1][2];
    temp6 = u[0][2][2];
    
    
    temp7 = d[0][0][2];
    temp8 = d[0][1][2];
    temp9 = d[0][2][2];
    
    
    temp10 = l[0][0][0];
    temp11 = l[0][1][0];
    temp12 = l[0][2][0];
    
    u[0][0][2] = temp1;
    u[0][1][2] = temp2;
    u[0][2][2] = temp3;
    
    l[0][0][0] = temp6;
    l[0][1][0] = temp5;
    l[0][2][0] = temp4;
    
    d[0][0][2] = temp12;
    d[0][1][2] = temp11;
    d[0][2][2] = temp10;
    
    r[0][0][2] = temp7;
    r[0][1][2] = temp8;
    r[0][2][2] = temp9;
    
    init();
}

function rotateBreverse() {
    rotate(b[0]);
    rotate(b[0]);
    rotate(b[0]);
    
    temp1 = r[0][0][2];
    temp2 = r[0][1][2];
    temp3 = r[0][2][2];
    
    
    temp4 = u[0][0][2];
    temp5 = u[0][1][2];
    temp6 = u[0][2][2];
    
    
    temp7 = d[0][0][2];
    temp8 = d[0][1][2];
    temp9 = d[0][2][2];
    
    
    temp10 = l[0][0][0];
    temp11 = l[0][1][0];
    temp12 = l[0][2][0];
    
    u[0][0][2] = temp12;
    u[0][1][2] = temp11;
    u[0][2][2] = temp10; 
    
    l[0][0][0] = temp9;
    l[0][1][0] = temp8;
    l[0][2][0] = temp7; 
    
    d[0][0][2] = temp1;
    d[0][1][2] = temp2;
    d[0][2][2] = temp3; 
    
    r[0][0][2] = temp4;
    r[0][1][2] = temp5;
    r[0][2][2] = temp6;
    
    init();
}


function rotateR() {
    rotate(r[0]);
    temp1 = f[0][0][2];
    temp2 = f[0][1][2];
    temp3 = f[0][2][2];
    
    
    temp4 = u[0][0][2];
    temp5 = u[0][1][2];
    temp6 = u[0][2][2];
    
    
    temp7 = d[0][0][2];
    temp8 = d[0][1][2];
    temp9 = d[0][2][2];
    
    
    temp10 = b[0][0][0];
    temp11 = b[0][1][0];
    temp12 = b[0][2][0];
    
    u[0][0][2] = temp1;
    u[0][1][2] = temp2;
    u[0][2][2] = temp3;
    
    b[0][0][0] = temp6;
    b[0][1][0] = temp5;
    b[0][2][0] = temp4;
    
    d[0][0][2] = temp12;
    d[0][1][2] = temp11;
    d[0][2][2] = temp10;
    
    f[0][0][2] = temp7;
    f[0][1][2] = temp8;
    f[0][2][2] = temp9;
    
    init();
}

function rotateRreverse() {
    rotate(r[0]);
    rotate(r[0]);
    rotate(r[0]);
    
    temp1 = f[0][0][2];
    temp2 = f[0][1][2];
    temp3 = f[0][2][2];
    
    
    temp4 = u[0][0][2];
    temp5 = u[0][1][2];
    temp6 = u[0][2][2];
    
    
    temp7 = d[0][0][2];
    temp8 = d[0][1][2];
    temp9 = d[0][2][2];
    
    
    temp10 = b[0][0][0];
    temp11 = b[0][1][0];
    temp12 = b[0][2][0];
    
    u[0][0][2] = temp12;
    u[0][1][2] = temp11;
    u[0][2][2] = temp10; 
    
    b[0][0][0] = temp9;
    b[0][1][0] = temp8;
    b[0][2][0] = temp7; 
    
    d[0][0][2] = temp1;
    d[0][1][2] = temp2;
    d[0][2][2] = temp3; 
    
    f[0][0][2] = temp4;
    f[0][1][2] = temp5;
    f[0][2][2] = temp6;
    
    init();
}

function rotateF() {
    rotateFreverse();
    rotateFreverse();
    rotateFreverse();
    
    init();
}

function rotateFreverse() {
    rotate(f[0]);
    rotate(f[0]);
    rotate(f[0]);
    
    temp1 = l[0][0][2];
    temp2 = l[0][1][2];
    temp3 = l[0][2][2];
    
    
    temp4 = u[0][2][0];
    temp5 = u[0][2][1];
    temp6 = u[0][2][2];
    
    
    temp7 = d[0][0][0];
    temp8 = d[0][0][1];
    temp9 = d[0][0][2];
    
    
    temp10 = r[0][0][0];
    temp11 = r[0][1][0];
    temp12 = r[0][2][0];
    
    u[0][2][0] = temp12;
    u[0][2][1] = temp11;
    u[0][2][2] = temp10; 
    
    r[0][0][0] = temp9;
    r[0][1][0] = temp8;
    r[0][2][0] = temp7; 
    
    d[0][0][0] = temp1;
    d[0][0][1] = temp2;
    d[0][0][2] = temp3; 
    
    l[0][0][2] = temp6;
    l[0][1][2] = temp5;
    l[0][2][2] = temp4;
    
    init();
}


function rotateL() {
    //nestihl
}

function rotateLreverse() {
    //nestihl
}

function fixCube() {
    clear();
    displaySide(empty);
    displaySide(bu);
    displaySide(empty);
    displaySide(empty);
    displaySide(bl);
    displaySide(bf);
    displaySide(br);
    displaySide(bb);
    displaySide(empty);
    displaySide(bd);
    displaySide(empty);
    displaySide(empty);
}

function init() {
    clear();
    displaySide(empty);
    displaySide(u);
    displaySide(empty);
    displaySide(empty);
    displaySide(l);
    displaySide(f);
    displaySide(r);
    displaySide(b);
    displaySide(empty);
    displaySide(d);
    displaySide(empty);
    displaySide(empty);
}


init();