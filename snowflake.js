//////////snowflake//////////
//-------------------------//
//----List of variables----//
//-------------------------//

//new comment
const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let flake_array = []
let eachFlake = {}
const W = window.innerWidth
const H = window.innerHeight
const numFlakes = 300
const transparency = Math.random() + 0.1
const flakeColour = `rgba(255,255,255,${transparency})`
//-------------------------//
//---List of functions----///
//-------------------------//


//function to set canvas width
const fitBrowser = ()=>{

	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
}

//blueprint for flakes and child function to plot flakes on canvas
function Flake()  {




	this.x = Math.random()*W
	this.y = Math.random()*H
	this.r = Math.random()*2 +2
	this.d =  Math.random()*1
	this.angle = 0
	this.dy = Math.pow(this.d,2)+0.1


	// a function to plot the flakes onto the canvas
	this.draw = function() {

		ctx.beginPath()
		ctx.arc(this.x, this.y, this.r ,0, Math.PI*2,false )
		ctx.strokeStyle = 'black'
		ctx.fillStyle = flakeColour
		ctx.fill()
	}


	//a function to update the positions of the flakes
	this.update = function(){

		//this increments the angle in radians
		this.angle += 0.005
		//the last number
		this.dx = Math.sin(this.angle)*0.4     //the multiplier reduces the height of sin function.

		this.x = this.x + this.dx
		this.y = this.y + this.dy

		if ((this.y + this.r) > innerHeight  ){
			this.y = 0
			this.x = Math.random()*W
		}

	}

}	//end of flake function





//fill empty flake array with flakes with attributes
const createFlakes = ()=>{

	flake_array=[]
	for (let i = 0; i<numFlakes; i++){
		eachFlake = new Flake
		flake_array.push(eachFlake)

	}
}


//a function to plot the flakes//

const plot = ()=> {

	for (let i = 0; i<flake_array.length; i++){

		flake_array[i].draw()
	}
}


//A function to animate//

function animate() {

	const bg = new Image(100,100)
	bg.src = 'snowy_scene.jpg'

	 ctx.clearRect(0,0,W,H)
	  ctx.drawImage(bg,0,0,canvas.width,canvas.height)

	requestAnimationFrame(animate)



	for (let i = 0; i< numFlakes; i++){

		flake_array[i].update()
		flake_array[i].draw()


	}

}

//-------------------------//
//------Event Listeners----///
//-------------------------//

window.addEventListener('resize', ()=>{

	fitBrowser()
	createFlakes()


})





//-------------------------//
//------Execute-----------///
//-------------------------//
fitBrowser()
createFlakes()

animate()
