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
	$sql->query("SELECT * FROM tbl_index WHERE index_no='".mysql_real_escape_string($_POST['index'])."'");
    if ($sql->num_row() >= 1)
	{
        $sqlupdate = new mysql;
        $sqlupdate->query("UPDATE tbl_index SET cash_type='".$_POST['cash_type']."' WHERE index_no='".mysql_real_escape_string($_POST['index'])."'");
        
        echo '{success:true,successInfo:"Update account successfull"}';
    }else{
        $sqlinsert= new mysql;
        $sqlinsert->query("INSERT INTO tbl_index VALUES('','".mysql_real_escape_string($_POST['index'])."','".$_POST['cash_type']."')");
        
        echo '{success:true,successInfo:"Saving account successfull"}';
    }
    
    $sql->free_result();
}
function loadForm(){
    $index_no = mysql_real_escape_string($_GET['id']);
    $sql = new mysql;
    $sql->query("SELECT index_no,cash_type FROM tbl_index WHERE index_no='$index_no'");
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
   	$sql->query("SELECT index_no,cash_type FROM tbl_index");
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