$(function(){
	$("#hots").css("display","none");
	$(".time").html( " 0 sec");
	run();
	$.ajax({
		url:"index.php",
		data:{ajax:"y",where:"load"},
		dataType:"json",
		success:function(data){
			load(data);
		}
	});
})
function run(){
	start();
	UserGame();
	startBtn();
	moves();
	addTime();
	dataSubmit();
}
function start(){
	$(".field button").attr("class","btn img_tic").removeAttr("disabled");
}
function UserGame(){
	$(".field button").click(function(){
		$(this).attr("class","btn img_tic o").attr("disabled","");
		let index = $(this).attr("id") -1;
		$.ajax({
			url:"index.php",
			data:{ajax:"y",index:index,where:"user"},
			dataType:"json",
			success:function(data){
				if(data.game){
					if(data.game == "user"){
						load(data);
						clearInterval(timer);
						alert("Выиграл");
						window.location.href = "index.php?template=2";
					}
					disabled();
				}else{
					computer(data.index);
					load(data);
				}
			}
		});
	});
}
function computer(id){
		$("#" + id).attr("class","btn img_tic x").attr("disabled","");
	$.ajax({
			url:"index.php",
			data:{ajax:"y",index:id-1,where:"computer"},
			dataType:"json",
			success:function(data){
				if(data.game){
					if(data.game == "computer"){
						load(data);
						alert("проиграл");
						window.location.href = "index.php?template=2";
					}
					disabled();
				}else{
					load(data);
				}
			}
	});
}
function load(data){
	start();
	if(data.user){
		for(let i=0;i<data.user.length;i++){
			$(".field").eq(data.user[i]).children("button").attr("class","btn img_tic o").attr("disabled","");
		}
	}
	if(data.computer){
		for(let i=0;i<data.computer.length;i++){
			$(".field").eq(data.computer[i]).children("button").attr("class","btn img_tic x").attr("disabled","");
		}
	}
	if(data.alert){
		if(data.alert != false){
			$('.alert ').html(data.alert);
			disabled();
		}
	}
	if(data.addUser){
		addMoves("user",data.addUser);
	}	
	if(data.addComputer){
		addMoves("computer",data.addComputer);
	}
	if(data.time){
		$(".time").html(data.time + " sec");
	}
}
function startBtn(){
	$(".start").click(function(){
		$.ajax({
			url:"index.php",
			dataType:"json",
			data:{ajax:"y",where:"start"},
			success:function(data){
				alert();
				start();
			}
		});
	});
}
function disabled(){
	$(".field button").attr("disabled","");
}

function moves(){
	$(".moves").html("0");
}

function addMoves(where,add){
	switch(where){
		case "user":
			$(".usermoves").html(add);
			break;
		case "computer":
			$(".computermoves ").html(add);
			break;
	}
}
let timer = null;
function addTime(){
	timer = setInterval(function(){
		$.ajax({
			url:"index.php",
			dataType:"json",
			data:{ajax:"y",where:"time"},
			success:function(data){
				if(data.time){
					$(".time").html(data.time + " sec");
				}
				if(data.untime){
					clearInterval(timer);
				}
			}
		});
	},1000);
}

function dataSubmit(){
	$(".ok").on("click",function(e){
		if($("#nickname").val() == ""){
			$("#hots").css("display","block");
			e.preventDefault();
		}
	});
}