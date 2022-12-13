<?php 
	include "class/filePath.php";
	include "class/isWin.php";
	
	class Game
	{
		
		private function isShow(){
			$_SESSION["template"] = isset($_GET["template"])?
								$_GET["template"]:
								0;
			include "front.php";
		}
		
		private function isGET(){
			$this->isShow();
		}
		
		private function isPOST(){
				if(!empty($_FILES["photo"]) and $_FILES["photo"]["tmp_name"] != null){
					$path = "uploads/";
					$fileName = filePath::submitFile($_FILES["photo"],$path);
					if($fileName !=false){
						$_SESSION["file"] = $path .$fileName;
					}else{
						echo "Ошибка загрузки";
						die;
					}
				}
				isWin::start();
				$this->isShow();
		}
		
		private function isAjax(){
			isWin::isGame($_GET["where"]);
		}
		
		public function run(){
			if(!empty($_POST)){
				$this->isPOST();
			}elseif(isset($_GET["ajax"]) and $_GET["ajax"] == "y"){
				$this->isAjax();
			}else{
				$this->isGET();
			}
		}
	}
