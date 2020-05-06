document.addEventListener('keydown', function (evento) {
  if (evento.keyCode == 32) {
    if (!nivel.muerto) {
      saltar();
    } else {
      nivel.velocidad = 9;
      nivel.puntuación = 0;
      nivel.marcador = 1;
      nube.velocidad = 1;
      cactus.x = ancho + 100;
      nivel.muerto = false;
    }
  }
});

var imgRex, imgNube, imgCactus, imgSuelo;

function cargaImagenes() {
  imgRex = new Image();
  imgCactus = new Image();
  imgNube = new Image();
  imgSuelo = new Image();

  imgRex.src = 'img/rex.png';
  imgCactus.src = 'img/cactus.png';
  imgNube.src = 'img/nube.png';
  imgSuelo.src = 'img/cactus.png';
}

var ancho = 700;
var alto = 300;

var canvas, ctx;

function inicializa() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  cargaImagenes();
}

function borraCanvas() {
  canvas.width = ancho;
  canvas.height = alto;
}

var suelo = 250;
var trex = {
  y: 250,
  vy: 0,
  gravedad: 2,
  salto: 28,
  vym: 9,
  saltando: false,
};
var nivel = {
  velocidad: 9,
  puntuación: 0,
  muerto: false,
  marcador: 1,
};
var cactus = { x: ancho + 100, y: suelo };
var nube = { x: 400, y: 10, velocidad: 1, subiendo: true };
var suelog = { x: 0, y: suelo + 30 };

function dibujaRex() {
  ctx.drawImage(imgRex, 0, 0, 64, 64, 100, trex.y, 50, 50);
}

function dibujaCactus() {
  ctx.drawImage(imgCactus, 0, 0, 64, 64, cactus.x, cactus.y, 50, 50);
}

function dibujaNube() {
  ctx.drawImage(imgNube, 0, 0, 64, 64, nube.x, nube.y, 100, 100);
}

function dibujaSuelo() {
  ctx.drawImage(imgSuelo, suelog.x, 0, 700, 30, 0, suelog.y, 700, 30);
}

function logicaSuelo() {
  if (suelog.x > 700) {
    suelog.x = 0;
  } else {
    suelog.x += nivel.velocidad;
  }
}

function logicaCactus() {
  if (cactus.x < -100) {
    cactus.x = ancho + 100;
    nivel.puntuación++;
    if (nivel.puntuación % 3 == 0) {
      nivel.marcador++;
    }
  } else {
    cactus.x -= nivel.velocidad;
  }
}

function logicaNube() {
  if (nube.x < -100) {
    nube.x = ancho + 100;
  } else {
    nube.x -= nube.velocidad;
  }
  console.log(nube.y, nube.subiendo);
  // nube.subiendo ? nube.y-- : nube.y++;
  if (nube.subiendo) {
    nube.y = nube.y - 1;
  } else {
    nube.y = nube.y + 1;
  }
  if (nube.y < 1) {
    console.log('Ya llegaste a cero');
    nube.subiendo = false;
  } else if (nube.y > 30) {
    nube.subiendo = true;
  }
}

function saltar() {
  trex.saltando = true;
  trex.vy = trex.salto;
}

function gravedad() {
  if (trex.saltando) {
    if (trex.y - trex.vy - trex.gravedad > suelo) {
      trex.saltando = false;
      trex.vy = 0;
      trex.y = 250;
    } else {
      trex.vy -= trex.gravedad;
      trex.y -= trex.vy;
    }
  }
}

function colision() {
  if (cactus.x >= 100 && cactus.x <= 150) {
    if (trex.y >= suelo - 25) {
      nivel.muerto = true;
      nivel.velocidad = 0;
      nube.velocidad = 0;
    } else {
      nivel.velocidad *= 1.05;
    }
  }
}

function puntuacion() {
  ctx.font = '30px impact';
  ctx.fillStye = '#55555';
  ctx.fillText(`Nivel: ${nivel.marcador}`, 550, 50);
  ctx.fillText(`Puntuación: ${nivel.puntuación}`, 471, 80);
  if (nivel.muerto == true) {
    ctx.font = '60px impact';
    ctx.fillText(`ERES UN IDIOTA`, 240, 150);
  }
}

// Bucle principal
var FPS = 50;
setInterval(() => {
  principal();
}, 1000 / FPS);

function principal() {
  console.log('Principal');
  borraCanvas();
  console.log('Dibuja Rex');
  gravedad();
  colision();
  logicaSuelo();
  dibujaSuelo();
  dibujaRex();
  logicaCactus();
  dibujaCactus();
  logicaNube();
  dibujaNube();
  puntuacion();
}
