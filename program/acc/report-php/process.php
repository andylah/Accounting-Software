<?php

if ($_POST['phase'] == 'balancesheet') {
    $month_arr = array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    for ($i = 0; $i <= 11; $i++) {
        if ($month_arr[$i] == $_POST['month']) {
            $month_fix = ($i + 1);
        }
    }
    $sqlfilter = new mysql;
    $sqlfilter->query("SELECT acc_num FROM tbl_acc_list");
    $count_filter = $sqlfilter->num_row();
    $jml_record = 0;
    while ($rowfilter = $sqlfilter->fetch_num()) {
        $sqlaktiva = new mysql;
        $sqlaktiva->query("SELECT a.acc_num, SUM(a.debet) as debet, SUM(a.credit) as credit, (SELECT b.acc_name FROM tbl_acc_list b WHERE b.acc_num = a.acc_num) AS acc_name, (SELECT c.category FROM tbl_acc_list c WHERE c.acc_num = a.acc_num) AS acc_cat FROM tbl_trans_detail a WHERE a.acc_num='$rowfilter[0]' AND MONTH(trans_date)='$month_fix' AND YEAR(trans_date)='" . $_POST['year'] . "' GROUP BY a.acc_num");
        $countaktiva = $sqlaktiva->num_row();
        $rowaktiva = $sqlaktiva->fetch_num();
        if ($countaktiva > 0) {
            $acc_num[] = $rowaktiva[0];
            $total[] = $rowaktiva[1] - $rowaktiva[2];
            $acc_name[] = $rowaktiva[3];
            $acc_cat[] = $rowaktiva[4];
            $jml_record++;
        }
    }

    /*$sqlfilter2 = new mysql;
    $sqlfilter2->query("SELECT acc_num FROM tbl_acc_list WHERE category=1");
    $count_filter2 = $sqlfilter2->num_row();
    $jml_record2 = 0;
    while ($rowfilter2 = $sqlfilter2->fetch_num()) {
        $sqlpassiva = new mysql;
        $sqlpassiva->query("SELECT a.acc_num, SUM(a.debet) as debet, SUM(a.credit) as credit, (SELECT b.acc_name FROM tbl_acc_list b WHERE b.acc_num = a.acc_num) AS acc_name FROM tbl_trans_detail a WHERE a.acc_num='$rowfilter2[0]' AND MONTH(trans_date)='$month_fix' AND YEAR(trans_date)='" . $_POST['year'] . "' GROUP BY a.acc_num");
        $countpassiva = $sqlpassiva->num_row();
        $rowpassiva = $sqlpassiva->fetch_num();
        if ($countpassiva > 0) {
            $acc_num2[] = $rowpassiva[0];
            $total2[] = $rowpassiva[1] - $rowpassiva[2];
            $acc_name2[] = $rowpassiva[3];
            $jml_record2++;
        }
    }*/
}

if($_POST['phase'] == 'profitloss'){
    $month_arr = array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    for ($i = 0; $i <= 11; $i++) {
        if ($month_arr[$i] == $_POST['month']) {
            $month_fix = ($i + 1);
        }
    }
    
    $sql_filter_income = new mysql;
    $sql_filter_income->query("SELECT acc_num FROM tbl_acc_list WHERE category = '3' OR acc_num LIKE '8%' OR acc_num LIKE '4%'");
    $count_filter_income = $sql_filter_income->num_row();
    $jml_record_income = 0;
    while ($row_filter_income = $sql_filter_income->fetch_num()){
        $sqlincome = new mysql;
        $sqlincome->query("SELECT a.acc_num, SUM(a.debet) as debet, SUM(a.credit) as credit, (SELECT b.acc_name FROM tbl_acc_list b WHERE b.acc_num = a.acc_num) AS acc_name FROM tbl_trans_detail a WHERE a.acc_num='$row_filter_income[0]' AND MONTH(trans_date)='$month_fix' AND YEAR(trans_date)='" . $_POST['year'] . "' GROUP BY a.acc_num");
        $countincome = $sqlincome->num_row();
        $rowincome = $sqlincome->fetch_num();
        if ($countincome > 0) {
            $acc_num_income[] = $rowincome[0];
            $total_income[] = $rowincome[1] - $rowincome[2];
            $acc_name_income[] = $rowincome[3];
            $jml_record_income++;
        }
    }
    
    $sql_filter_biaya = new mysql;
    $sql_filter_biaya->query("SELECT acc_num FROM tbl_acc_list WHERE acc_num LIKE '5%' OR acc_num LIKE '6%' OR category='4'");
    $count_filter_biaya = $sql_filter_biaya->num_row();
    $jml_record_biaya = 0;
    while ($row_filter_biaya = $sql_filter_biaya->fetch_num()){
        $sqlbiaya = new mysql;
        $sqlbiaya->query("SELECT a.acc_num, SUM(a.debet) as debet, SUM(a.credit) as credit, (SELECT b.acc_name FROM tbl_acc_list b WHERE b.acc_num = a.acc_num) AS acc_name FROM tbl_trans_detail a WHERE a.acc_num='$row_filter_biaya[0]' AND MONTH(trans_date)='$month_fix' AND YEAR(trans_date)='" . $_POST['year'] . "' GROUP BY a.acc_num");
        $countbiaya = $sqlbiaya->num_row();
        $rowbiaya = $sqlbiaya->fetch_num();
        if ($countbiaya > 0) {
            $acc_num_biaya[] = $rowbiaya[0];
            $total_biaya[] = $rowbiaya[1] - $rowbiaya[2];
            $acc_name_biaya[] = $rowbiaya[3];
            $jml_record_biaya++;
        }
    }
}

if ($_POST['phase'] == 'journal'){
    $month_arr = array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    for ($i = 0; $i <= 11; $i++) {
        if ($month_arr[$i] == $_POST['month']) {
            $month_fix = ($i + 1);
        }
    }
    //$sqlfilter_journal = new mysql;
    //$sqlfilter_journal->query("SELECT trans_id FROM tbl_trans ORDER BY trans_id ASC");
    
    $sqljournal = new mysql;
    $sql = "SELECT a.trans_date, a.acc_num, (SELECT b.acc_name FROM tbl_acc_list b WHERE b.acc_num = a.acc_num) AS acc_name, a.debet, a.credit, a.trans_id,
    (SELECT d.trans_memo FROM tbl_trans d WHERE d.trans_id=a.trans_id) AS trans_memo FROM tbl_trans_detail a WHERE MONTH(trans_date)='$month_fix' AND YEAR(trans_date)='" . $_POST['year'] . "'";
    switch($category) {
        case "All":
            $filter="";
            $sqljournal->query($sql." ORDER BY a.trans_id ASC");
            break;
        case "Aktiva":
            $filter="(SELECT c.acc_num FROM tbl_acc_list c WHERE c.acc_num = a.acc_num AND category = 0)";
            $sqljournal->query($sql." AND ".$filter." ORDER BY a.trans_id ASC");
            break;
       case "Pasiva":
            $filter="(SELECT c.acc_num FROM tbl_acc_list c WHERE c.acc_num = a.acc_num AND category = 1)";
            $sqljournal->query($sql." AND ".$filter." ORDER BY a.trans_id ASC");
            break;
        case "Capital":
            $filter="(SELECT c.acc_num FROM tbl_acc_list c WHERE c.acc_num = a.acc_num AND category = 2)";
            $sqljournal->query($sql." AND ".$filter." ORDER BY a.trans_id ASC");
            break;
        case "Pendapatan Operasional":
            $filter="(SELECT c.acc_num FROM tbl_acc_list c WHERE c.acc_num = a.acc_num AND category = 3)";
            $sqljournal->query($sql." AND ".$filter." ORDER BY a.trans_id ASC");
            break;
        case "Beban Operasional":
            $filter="(SELECT c.acc_num FROM tbl_acc_list c WHERE c.acc_num = a.acc_num AND category = 4)";
            $sqljournal->query($sql." AND ".$filter." ORDER BY a.trans_id ASC");
            break;
    }
    
   
    /*while ($rowjournal = $sqljournal->fetch_num()){
        $trans_date[] = $rowjournal[0];
        $acc_num[] = $rowjournal[1];
        $acc_name[] = $rowjournal[2];
        $debet[] = $rowjournal[3];
        $credit[] = $rowjournal[4];
        $trans_id[] = $rowjournal[5];
        $trans_memo[] = $rowjournal[6];
    }*/
    $jml_journal = $sqljournal->num_row();
}