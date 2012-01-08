<?php

/**
 * @author andylah
 * @copyright 2011
 */

require("class-db.php");

$task = ($_REQUEST['task']) ? ($_REQUEST['task']) : null;

switch($task){
    case "saveData":
		saveData();
		break;
	case "loadForm":
		loadForm();
		break;
    case "SearchList":
		searchList();
		break;    
default:
   echo "{failure:true}";
   break;
}
function saveData(){
    $sql=new mysql;
	$sql->query("SELECT * FROM tbl_acc_type WHERE type_no='".mysql_real_escape_string($_POST['type_no'])."'");
    if ($sql->num_row() >= 1)
	{
        $sqlupdate = new mysql;
        $sqlupdate->query("UPDATE tbl_acc_type SET acc_type='".$_POST['type_name']."' WHERE type_no='".mysql_real_escape_string($_POST['type_no'])."'");
        
        echo '{success:true,successInfo:"Update account successfull"}';
    }else{
        $sqlinsert= new mysql;
        $sqlinsert->query("INSERT INTO tbl_acc_type VALUES('','".mysql_real_escape_string($_POST['type_no'])."','".$_POST['type_name']."')");
        
        echo '{success:true,successInfo:"Saving account successfull"}';
    }
    
    $sql->free_result();
}
function loadForm(){
    $type_no = mysql_real_escape_string($_GET['id']);
    $sql = new mysql;
    $sql->query("SELECT type_no,acc_type FROM tbl_acc_type WHERE type_no='$type_no'");
    if ($sql->num_row() >= 1)
		{
			while($rec = $sql->fetch_assoc()){
        		$arr[] = $rec;
			};
			$data = json_encode($arr);
			 
			echo '({"results":' . $data . '})';
		}else{
			echo '{results:false,errorInfo:"Data not found"}';
		}
	$sql->free_result();
}
function searchList(){
    $sql = new mysql;
   	$sql->query("SELECT type_no,acc_type FROM tbl_acc_type");
	if ($sql->num_row() >= 1)
		{
			while($rec = $sql->fetch_assoc()){
        		$arr[] = $rec;
			};
			$data = json_encode($arr);
			 
			echo '({"results":' . $data . '})';
		}else{
			echo '{results:false,errorInfo:"Data not found"}';
		}
	$sql->free_result();
}
?>