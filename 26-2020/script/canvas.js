const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Veličina canvas-a
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Pozadina canvas-a
ctx.fillStyle ="white";
ctx.fillRect(0,0,canvas.width,canvas.height);

let crtanje = false;
let dodavanjeTeksta = false;
let brisanje = false;

function Draw(e){
    
    // Stil crtanja
    ctx.strokeStyle = document.getElementById("boja").value;
    ctx.lineWidth = document.getElementById("size").value;
    ctx.lineCap = "round";  
    
    // Olovka
    if(document.getElementById("pencil").checked && crtanje){
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }

    // Četkica
    if(document.getElementById("brush").checked && crtanje){
        ctx.ellipse(e.clientX, e.clientY, 16,5,0,document.getElementById("size").value,document.getElementById("size").value);
        ctx.stroke();
        ctx.moveTo(e.clientX, e.clientY);
    }

    // Linija
    if(document.getElementById("line").checked){
        var startX, startY, startA, startB;
        var linija = false;

        // Nalazimo početne koordinate
        function MouseDown(e){
            if(document.getElementById("line").checked){
                startX = e.clientX;
                startY = e.clientY;
                linija = true;
            }
        }

        // Spajamo početnu i krajnju koordinatu i dobijamo liniju
        function MouseUp(e){
            if(document.getElementById("line").checked){
                linija = false;
                ctx.beginPath();
                ctx.moveTo(startX, startY)
                ctx.lineTo(startA,startB);
                ctx.stroke();
                ctx.closePath();
            }
        }

        // Nalazimo krajnje koordinate
        function MouseMove(e){
            if(document.getElementById("line").checked && linija){
                startA = e.clientX;
                startB = e.clientY;
            }
        }

    }

    // Pravugaonik
    if(document.getElementById("rect").checked){
        var isDown = false;
        var startX, startY;
        var startA  = 0, startB = 0;

        ctx.fillStyle = document.getElementById("boja").value;

        // Nalazimo početne koordinate
        function MouseDown(e) {
            if(document.getElementById("rect").checked){
                startX = e.clientX;
                startY = e.clientY;
                isDown = true;
            }
        }

        // Crtamo pravugaonik na osnovu početnih i krajnjih koordinata
        function MouseUp(e) {
            if(document.getElementById("rect").checked){
                isDown = false;
                ctx.strokeRect(startX, startY, startA, startB);
            }
        }

        // Nalazimo krajnje koordinate
        function MouseMove(e) {
            if(document.getElementById("rect").checked && isDown){
                startA = e.clientX - startX;
                startB = e.clientY - startY;
            }
        }
    }
    
    // Gumica
    if(document.getElementById("eraser").checked && brisanje){
        ctx.strokeStyle = "white";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }

    // Popunjen pravugaonik
    if(document.getElementById("fill").checked){
        var isDown = false;
        var startX, startY;
        var startA  = 0, startB = 0;

        ctx.fillStyle = document.getElementById("boja").value;

        function MouseDown(e) {
            if(document.getElementById("fill").checked){
                startX = e.clientX;
                startY = e.clientY;
                isDown = true;
            }
        }

        function MouseUp(e) {
            if(document.getElementById("fill").checked){
                isDown = false;
                ctx.fillRect(startX, startY, startA, startB);
            }
        }

        function MouseMove(e) {
            if(document.getElementById("fill").checked && isDown){
                startA = e.clientX - startX;
                startB = e.clientY - startY;
            }
        }
    }
    
    // Tekst
    function AddText(e){
        if(document.getElementById("text").checked && dodavanjeTeksta){   
            var text = document.getElementById("input-text").value;
            ctx.font = '24px Arial';
            ctx.fillStyle = document.getElementById("boja").value;
            ctx.fillText(text, e.clientX, e.clientY);
        }
    }
    
    // EventListener-i
    canvas.addEventListener("mousedown", Drawing);
    canvas.addEventListener("mouseup", NotDrawing);
    canvas.addEventListener("mousedown", MouseDown);
    canvas.addEventListener("mousemove", MouseMove);
    canvas.addEventListener("mouseup", MouseUp);
    canvas.addEventListener("mousedown", AddText);
}

canvas.addEventListener("mousemove", Draw);

// Reset funkcija
function reset(){
    ctx.fillStyle ="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

// Funkcija za proveru da li crtamo
function Drawing(){
    crtanje = true;
    dodavanjeTeksta = true;
    brisanje = true;
}

// Funkcija za proveru kada ne crtamo
function NotDrawing(){
    crtanje = false;
    dodavanjeTeksta = false;
    brisanje = false;
    ctx.beginPath();
}

// Funkcija za čuvanje canvas-a kao sliku
function download(){
    var download = document.getElementById("download");
    var image = document.getElementById("canvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}

// Funkcija za promenu pozadine canvas-a
function background(){
    ctx.fillStyle = document.getElementById("boja").value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
