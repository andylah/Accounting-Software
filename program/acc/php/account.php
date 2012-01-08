<?php

/**
 * @author andylah
 * @copyright 2011
 */
require("class-db.php");

$task = ($_REQUEST['task']) ? ($_REQUEST['task']) : null;

switch ($task) {
    case "getType":
        getAccType();
        break;
    case "getCategory":
        getCategory();
        break;
    case "processlist":
        processList();
        break;
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

function getAccType() {
    $sql = new mysql;
    $sql->query("SELECT type_no,CONCAT(type_no,':',acc_type) AS acc_type FROM tbl_acc_type");

    if ($sql->num_row() <= 0) {
        echo '{results:failure,errorInfo:"Type not found"}';
    } else {
        while ($rec = $sql->fetch_assoc()) {
            $arr[] = $rec;
        };
        $data = json_encode($arr);

        echo '({"results":' . $data . '})';
    }
    $sql->free_result();
}

function saveData() {
    $type_no = explode(":", $_POST['cmb_type']);
    $sql = new mysql;
    $sql->query("SELECT * FROM tbl_acc_list WHERE acc_num='" . mysql_real_escape_string($_POST['acc_no']) . "'");
    if ($sql->num_row() >= 1) {
        $sqlupdate = new mysql;
        $sqlupdate->query("UPDATE tbl_acc_list SET acc_name='" . $_POST['acc_name'] . "',type_no='$type_no[0]',category='" . $_POST['radio_account'] . "' WHERE acc_num='" . mysql_real_escape_string($_POST['acc_no']) . "'");

        echo '{success:true,successInfo:"Update account successfull"}';
    } else {
        $sqlinsert = new mysql;
        $sqlinsert->query("INSERT INTO tbl_acc_list VALUES('','" . mysql_real_escape_string($_POST['acc_no']) . "','" . $_POST['acc_name'] . "','$type_no[0]','" . $_POST['radio_account'] . "')");

        echo '{success:true,successInfo:"Saving account successfull"}';
    }

    $sql->free_result();
}

function loadForm() {
    $acc_num = mysql_real_escape_string($_GET['id']);
    $sql = new mysql;
    $sql->query("SELECT acc_num, acc_name,(SELECT CONCAT(type_no,':',acc_type) FROM tbl_acc_type b WHERE b.type_no=a.type_no) AS type_name,category AS cat_account FROM tbl_acc_list a WHERE a.acc_num='$acc_num'");
    if ($sql->num_row() >= 1) {
        while ($rec = $sql->fetch_assoc()) {
            $arr[] = $rec;
        };
        $data = json_encode($arr);

        echo '({"results":' . $data . '})';
    } else {
        echo '{results:false,errorInfo:"Data not found"}';
    }
    $sql->free_result();
}

function searchList() {
    $sql = new mysql;
    $sql->query("SELECT acc_num,acc_name,(SELECT acc_type FROM tbl_acc_type b WHERE b.type_no=a.type_no) AS type_name, category AS cat_account FROM tbl_acc_list a");
    if ($sql->num_row() >= 1) {
        while ($rec = $sql->fetch_assoc()) {
            if ($rec["cat_account"] == "0") {
                $rec["cat_account"] = "Aktiva";
            } elseif ($rec["cat_account"] == "1") {
                $rec["cat_account"] = "Pasiva";
            } elseif ($rec["cat_account"] == "2") {
                $rec["cat_account"] = "Capital";
            } elseif ($rec["cat_account"] == "3") {
                $rec["cat_account"] = "Pendapatan Operasional";
            } elseif ($rec["cat_account"] == "4") {
                $rec["cat_account"] = "Beban Operasional";
            }
            $arr[] = $rec;
        };
        $data = json_encode($arr);

        echo '({"results":' . $data . '})';
    } else {
        echo '{results:false,errorInfo:"Data not found"}';
    }
    $sql->free_result();
}

//function getCategory() {
//    echo '({"results":[{"name":"radio_account","boxLabel":"Aktiva","inputValue":"1","checked":"true"}]})';
//}
function processList() {
    if ($_POST['phase'] == "loadgrid") {
        $start = $_REQUEST["start"];
        $limit = $_REQUEST["limit"];

        $start = $start ? $start : 0;
        $limit = $limit ? $limit : 15;

        $sqlall = new mysql;
        $sqlall->query("SELECT *FROM tbl_acc_list");
        $jml_all = $sqlall->num_row();


        $sql = new mysql;
        $sql->query("SELECT acc_num,acc_name,(SELECT acc_type FROM tbl_acc_type b WHERE b.type_no=a.type_no) AS type_name, category AS cat_account FROM tbl_acc_list a LIMIT $start,$limit");
        if ($sql->num_row() >= 1) {
            while ($rec = $sql->fetch_assoc()) {

                if ($rec["cat_account"] == "0") {
                    $rec["cat_account"] = "Aktiva";
                } elseif ($rec["cat_account"] == "1") {
                    $rec["cat_account"] = "Pasiva";
                } elseif ($rec["cat_account"] == "2") {
                    $rec["cat_account"] = "Capital";
                } elseif ($rec["cat_account"] == "3") {
                    $rec["cat_account"] = "Pendapatan Operasional";
                } elseif ($rec["cat_account"] == "4") {
                    $rec["cat_account"] = "Beban Operasional";
                }
                $arr[] = $rec;
            };
            $data = json_encode($arr);

            echo '({"total":' . $jml_all . ',"results":' . $data . '})';
        } else {
            echo '{results:false,errorInfo:"Data not found"}';
        }

        $sql->free_result();
    }
    if ($_POST['del_list']) {

        $sql = new mysql;
        $sql->query("DELETE FORM tbl_acc_list WHERE acc_num = '" . mysql_real_escape_string($_POST['id']) . "'");

        echo '{results:true,errorInfo:"Delete successfull"}';
    }
}

?>