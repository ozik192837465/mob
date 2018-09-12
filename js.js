var canvas, ctx,ctxW = 1300,ctxH = 1000,wheel,prize;
//by twobomb
window.onload = function () {
    canvas = document.createElement("Canvas");
    canvas.width = ctxW;
    canvas.height = ctxH;
    document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");
	canvas.addEventListener("click",function(e){
		var x = e.offsetX;
		var y = e.offsetY;
		if(x> btn.x && x < btn.x + btn.w && y > btn.y && y < btn.y + btn.h){
			wheel.speed = getRandNum(20,50,true);
			prize = "";
		}
	},false);
	wheel = new wheel(ctxW/2 ,ctxH/2 ,400,16,["#181b27","#181b27","#181b27","#181b27","#181b27","#181b27","#181b27","#181b27","#181b27","#181b27","#181b27","#181b27","#181b27","#181b27","#181b27","#181b27"],
	[10,1000,250,50,100,500,10,1000,250,50,100,500,10,1000,250,50]);
	window.btn = {x:wheel.x+wheel.r*0.7,y: wheel.y + wheel.r*0.7,w:220,h:50,draw:function(ctx){
		ctx.fillStyle = "#0087ff";
		ctx.fillRect(this.x,this.y,this.w,this.h);
		ctx.fillStyle = "#FFF";
		ctx.font = "Bold 25px Arial"
		ctx.fillText("Крутить барабан",this.x+3,this.y+23);
		}};
	handler();
}



function wheel(x,y,r,cells,color,text){
	this.x = x || 0;
	this.y = y || 0;
	this.r = r || 10;//радиус
	if(typeof color == "object")
		this.color = color;
	else{
		this.color = new Array;
		for(var i = 0; i < cells; i++)
			this.color.push(randColor());
	}
	if(typeof text == "object")
		this.text = text;
	else{
		this.text = new Array;
		for(var i = 0; i < cells; i++)
			this.text.push((i+1)*100);
	}
	this.cells = cells || 1;//Количество ячеек(долек)
	this.angle = 0;//угол
	this.speed = 0;//текущая скорость вращения
	this.brakeSpeed = -0.21;//скорость торможения
	this.move = function(){
		if(this.speed == 0)
			return false;
		this.angle = (this.angle+this.speed)%360;
		this.speed = (this.speed - this.brakeSpeed >0)?this.speed + this.brakeSpeed:0;
		if(this.speed  == 0){
			var a = this.cells - Math.ceil(this.angle/(360/this.cells));
			prize = this.text[a];
		}
	}
	this.draw = function(ctx){
		var angRast = (Math.PI*2)/this.cells;
		ctx.beginPath();
		ctx.strokeStyle = "#181b27";
		ctx.lineWidth = 10;
		ctx.arc(this.x,this.y,this.r,0,Math.PI * 2);
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.closePath();
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle.toRadian());
		ctx.translate(-this.x, -this.y);
		for(var i = 0; i < this.cells;i++){
			ctx.beginPath();
			ctx.fillStyle = this.color[i];
			ctx.arc(this.x,this.y,this.r,i*angRast,(i+1)*angRast);
			ctx.lineTo(this.x,this.y);
			ctx.fill();
			ctx.closePath();
		}

			ctx.beginPath();
			ctx.fillStyle = "#1a1e2b";
			ctx.strokeStyle = "#1a1e2b";
			ctx.lineWidth = 5;
			ctx.arc(this.x,this.y,120,0,Math.PI * 2);
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
			ctx.lineWidth = 6;

			ctx.fillText("0",this.x - 15,this.y+ 15);
			ctx.strokeText("0",this.x-15,this.y+15);

		ctx.restore();
		ctx.fillStyle = "#FFF";
		ctx.strokeStyle = "#FFF";
			ctx.font = "Normal 40px Impact";
		for(var i = 0; i < this.text.length; i++){
			ctx.save();
			ctx.translate(this.x, this.y);
			var angRast = (Math.PI*2)/this.cells;
			var ang = (this.angle - 90 + angRast/2+10).toRadian() + (i * angRast);
			ctx.rotate(ang);
			ctx.translate(-this.x, -this.y+10);
			ctx.fillText(this.text[i],this.x+150,this.y);
			//ctx.strokeText(this.text[i],this.x+80,this.y);
			ctx.restore();
		}
			ctx.beginPath();
			ctx.fillStyle = "#dedede";
			var x = this.x;
			var y = this.y - this.r;
			ctx.moveTo(x,y);
			ctx.lineTo(x-50,y-70);
			ctx.lineTo(x+50,y-70);
			ctx.fill();
			ctx.closePath();
	}
}
function draw(){
	ctx.clearRect(0,0,ctxW,ctxH);
	 wheel.draw(ctx);
	 if(prize){
		ctx.fillStyle = "#000";
		ctx.strokeStyle = "#FFF";
		ctx.font = "Normal 30px Impact";
		ctx.fillText("Ваш приз: "+prize,0,35);
		ctx.strokeText("Ваш приз: "+prize,0,35);

	 }
	 btn.draw(ctx);
}

function handler(){
	draw();
	wheel.move();
	setTimeout(handler,1000/60);
}


function getRandNum(min, max, check)
{
	if(!check)
		return Math.round(Math.random() * (max - min) + min);
	else
		return Math.random() * (max - min) + min;
}
function randColor(){
	var r = getRandNum(0,255);
	var g = getRandNum(0,255);
	var b = getRandNum(0,255);
	return "rgb("+r+","+g+","+b+")";
}

Number.prototype.toRadian = function () {
    return this * Math.PI / 180;
};
