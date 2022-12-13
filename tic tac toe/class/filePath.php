<?php 
	class filePath
	{
		private static $imgType = array("image/jpg","image/png","image/jpeg");
		public static $erroe = 0; 
		public static function submitFile($file,$path){
			if(in_array($file["type"],self::$imgType)){
				$newName = self::fileName($file["name"]);
				if(move_uploaded_file($file["tmp_name"], $path .$newName)){
					return $newName;
				}else{
					return false;
				}
			}else{
				self::$erroe = "Error";
				exit();
			}
		}
		
		private static function fileName($fileName){
			$newName = time();
			$arr = array_merge(range("x", "z"),range("A","Z"));
			shuffle($arr);
			$newName .= $arr[0] . $arr[1] . $arr[2] . $arr[4] . $arr[7] 
						.strchr($fileName,".");
			return $newName;
		}
	}
