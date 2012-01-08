<?php

/**
 * @author andylah
 * @copyright 2011
 */
session_start();
require("class-db.php");

$task = ($_REQUEST['task']) ? ($_REQUEST['task']) : null;

switch($task){
	//case "loadID":
	//	loadID();
	//	break;
    case "getIndex":
		getIndex();
		break;    
    case "getAcc":
		getAcc();
		break;  
    case "ProcessDetail":
		processDetail();
		break;    
    
default:
   echo "{failure:true}";
   break;
}

function getIndex(){
    $sql=new mysql;
	$sql->query("SELECT index_no, CONCAT(index_no,':',cash_type) AS cash_type FROM tbl_index");
	if ($sql->num_row() <= 0)
	{
		echo '{results:false,errorInfo:"Index not found"}';
		
	}else{
		while($rec = $sql->fetch_assoc()){
        	$arr[] = $rec;
		};
		$data = json_encode($arr);  
		
		echo '({"results":' . $data . '})';
	}
	$sql->free_result();
}
function getAcc(){
    $sql=new mysql;
	$sql->query("SELECT acc_num, CONCAT(acc_num,':',acc_name) AS acc_name FROM tbl_acc_list");
	if ($sql->num_row() <= 0)
	{
		echo '{results:false,errorInfo:"Account not found"}';
		
	}else{
		while($rec = $sql->fetch_assoc()){
        	$arr[] = $rec;
		};
		$data = json_encode($arr);  
		
		echo '({"results":' . $data . '})';
	}
	$sql->free_result();
}
function processDetail(){
    if (!$_SESSION['trans_sess'] && !$_COOKIE['trans_cookie'])
	{
		$_SESSION['trans_sess'] = md5(uniqid(rand()));  
		$waktu = time();
		$expired_time = $waktu - 900;
		mysql_query("DELETE FROM temp_trans_detail WHERE time <= '$expired_time'"); 
  		SETCOOKIE("trans_cookie", "".$_SESSION['trans_sess']."",time()+ 900);
		
	}
    
    if ($_POST['phase'] == "saveDetail"){
        if ($_COOKIE['trans_cookie'])
		{
			$_SESSION['trans_sess'] = $_COOKIE['trans_cookie'];
		}
        
        if ($_POST['cmd_index'] == "Please select ...")
            $_POST['cmd_index'] = "";
        
        if($_POST['cmd_acc'] == "Please select ...")
            $_POST['cmd_acc'] = "";
        
        $index = explode(":",$_POST['cmd_index']);
        $acc =explode(":",$_POST['cmd_acc']);
        
        $sqlcek=new mysql;
		$sqlcek->query("SELECT *FROM temp_trans_detail WHERE session_id='".$_SESSION['trans_sess']."' && index_no='$index[0]' && acc_num='$acc[0]' && trans_id='".$_POST['trans_id']."'");
		$jmlcek=$sqlcek->num_row();
        if ($jmlcek<=0)
		{
		  $sql = new mysql;
		  $sql->query("INSERT INTO temp_trans_detail VALUES ('','".$_SESSION['trans_sess']."','$index[0]','$acc[0]','".$_POST['debet']."','".$_POST['credit']."','".$_POST['trans_id']."')");
          
          echo '{success:true,errorInfo:"Save detail successfull"}';
		}else{
		  $sql = new mysql;
		  $sql->query("UPDATE temp_trans_detail SET debet='".$_POST['debet']."',credit='".$_POST['credit']."' WHERE index_no='$index[0]' && session_id='".$_SESSION['trans_sess']."' && acc_num='$acc[0]' && trans_id='".$_POST['trans_id']."'");
          
          echo '{success:true,errorInfo:"Update detail successfull"}';
		}
    }
    if ($_POST['phase']=="LoadDetailGrid"){
        $waktu = time();
		$expired_time = $waktu - (900 + 900);
		mysql_query("DELETE FROM temp_trans_detail WHERE time <= '$expired_time'");
        
        $sql=new mysql;
		$sql->query("SELECT session_id, index_no, acc_num, debet, credit, trans_id FROM temp_trans_detail a WHERE a.session_id='".$_SESSION['trans_sess']."'");
		
		if ($sql->num_row() <= 0)
		{
			echo '{results:false,errorInfo:"Data grid not found"}';
			
		}else{
			while($rec = $sql->fetch_assoc()){
				$arr[] = $rec;
			};
			$data = json_encode($arr);  
			
			echo '({"results":' . $data . '})';
		}
		$sql->free_result();
    }
    if($_POST['phase']=="DeleteDetailGrid")
	{
		$sql=new mysql;
		$sql->query("DELETE FROM temp_trans_detail WHERE session_id='".$_SESSION['trans_sess']."'");
		
		SETCOOKIE("trans_cookie", "".$_SESSION['trans_sess']."", time() - 1800);
		session_destroy();
		
		echo '{results:true,errorInfo:"Delete successfull"}';
	}
    if($_POST['phase']=="deleteDetail")
	{
        $sql = new mysql;
        $sql->query("DELETE FROM temp_trans_detail WHERE index_no='".$_POST['index_no']."' && session_id='".$_POST['session_id']."' && acc_num='".$_POST['acc_num']."'");
			
        $sql2=new mysql;
        $sql2->query("SELECT session_id, index_no, acc_num, debet, credit, trans_id FROM temp_trans_detail WHERE session_id='".$_SESSION['trans_sess']."' && trans_id='".$_POST['trans_id']."'");
        $jmlsql2 = $sql2->num_row();
        if ($jmlsql2 <= 0)
        {
			echo '{results:false,errorInfo:"Detail empty II"}';
        }else{
            while($rec = $sql2->fetch_assoc()){
			     $arr[] = $rec;
            };
            $data = json_encode($arr);  
				
            echo '({"results":' . $data . '})';
        }
    }
    if($_POST['phase']=="SaveAllData"){
        $sqlloaddetail = new mysql;
        $sqlloaddetail->query("SELECT *FROM temp_trans_detail WHERE session_id='".$_SESSION['trans_sess']."'");
        if ($sqlloaddetail->num_row() > 0){
            $sql=new mysql;
            $sql->query("INSERT INTO tbl_trans VALUES ('','".$_POST['trans_id']."','".$_POST['trans_inv']."','".$_POST['trans_memo']."')");
            
            
            
            while($rowtemp=$sqlloaddetail->fetch_num()) {
                $sqldetail = new mysql;
                $sqldetail->query("INSERT INTO tbl_trans_detail VALUES ('','".$_POST['trans_id']."','$rowtemp[2]','$rowtemp[3]','$rowtemp[4]','$rowtemp[5]','".$_POST['trans_date']."')");
            }
            
            $sql = new mysql;
            $sql->query("DELETE FROM temp_trans_detail WHERE session_id='".$_POST['session_id']."'");
            SETCOOKIE("trans_cookie", "".$_SESSION['trans_sess']."", time() - 1800);
            
            session_destroy();
    				
            echo '{success:true,errorInfo:"Save successfull"}';
        }else{
            echo '{success:false,errorInfo:"Failed to saved"}';
        }
    }
}
?>