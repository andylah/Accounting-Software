<?php
    include_once("../php/class-db.php");
    include_once("../report-php/process.php");
?>

<table celpadding="1" border="0" cellspacing="1" align="center" width="99%" style="border: #000000 1px solid">
    <tr bgcolor="#fffff" nowrap>
        <td align="center" height="20" width="100%" nowrap colspan="2">
            <h2><?php echo TITLE ;?></h2>
        </td>
    </tr>
    <tr bgcolor="#fffff" nowrap>
        <td align="center" height="20" width="100%" nowrap colspan="2">
            Balance Sheet Report ( <?php echo $_POST['month']."-".$_POST['year']?> )
        </td>
    </tr>
    <tr bgcolor="#fffff" nowrap>
        <td valign="top" width="100%" nowrap>
            <table width="100%" border="0" cellspacing="2" cellpadding="2">
                <!--<tr>
                    <td width="100%" colspan="3"><h3>Aktiva</h3></td>
                </tr>-->
                <tr>
                    <td width="10%" bgcolor="#B8C9D8" height="20">Acc #</td>
                    <td width="50%" bgcolor="#B8C9D8" height="20">Account Name</td>
                    <td width="20%" bgcolor="#B8C9D8" height="20">Debet</td>
                    <td width="20%" bgcolor="#B8C9D8" height="20">Credit</td>
                </tr>
            </table>
            <table width="100%" border="0" cellspacing="2" cellpadding="2">
                <?php
                    for ($i=0; $i<$jml_record; $i++){
                        fmod($i,2) ? $line="<tr class='column-grid'>" : $line="<tr>";
                           echo $line."<td width='10%' height='20'>$acc_num[$i]</td>
                                <td width='50%' height='20'>$acc_name[$i]</td>";
                                switch($acc_cat[$i]){
                                    case "0":
                                    echo "<td width='20%' style='text-align:right;' height='20'>".number_format($total[$i],2)."</td>
                                         <td width='20%' style='text-align:right;' height='20'>0</td>";
                                    $total_all_debet = $total_all_debet+$total[$i]; 
                                    break;
                                    case "1":
                                    echo "<td width='20%' style='text-align:right;' height='20'>0</td>
                                          <td width='20%' style='text-align:right;' height='20'>".number_format($total[$i],2)."</td>";
                                    $total_all_credit = $total_all_credit+$total[$i];
                                    break;
                                    case "2":
                                    echo "<td width='20%' style='text-align:right;' height='20'>0</td>
                                          <td width='20%' style='text-align:right;' height='20'>".number_format($total[$i],2)."</td>";
                                    $total_all_credit = $total_all_credit+$total[$i];
                                    break;
                                    case "3":
                                    echo "<td width='20%' style='text-align:right;' height='20'>0</td>
                                          <td width='20%' style='text-align:right;' height='20'>".number_format($total[$i],2)."</td>";
                                    $total_all_credit = $total_all_credit+$total[$i];
                                    break;
                                    case "4":
                                    echo "<td width='20%' style='text-align:right;' height='20'>".number_format($total[$i],2)."</td>
                                         <td width='20%' style='text-align:right;' height='20'>0</td>";
                                    $total_all_debet = $total_all_debet+$total[$i]; 
                                    break;
                                }
                       
                               
                    }
                ?>
                </tr>
            </table>
        </td>
        <!--<td valign="top" width="50%" nowrap>
            <table width="100%" border="0">
                <tr>
                    <td width="100%" colspan="3" style="text-align:right;"><h3>Passiva</h3></td>
                </tr>
                <tr>
                    <td width="20%" bgcolor="#B8C9D8">Acc #</td>
                    <td width="50%" bgcolor="#B8C9D8">Account Name</td>
                    <td width="30%" bgcolor="#B8C9D8">Total</td>
                </tr>
            </table>
            <table width="100%" border="0">
                <?php
                //    for ($j=0; $j<$jml_record2; $j++){
                //        echo "<tr>
                //                <td width='20%'>$acc_num2[$j]</td>
                //                <td width='50%'>$acc_name2[$j]</td>
                //                <td width='30%' style='text-align:right;'>".number_format($total2[$j],2)."</td>
                //        ";
                //        $total_all_passiva = $total_all_passiva+$total2[$j];
                //    }
                ?>
                </tr>
            </table>-->
        </td>
    </tr>
    <tr bgcolor="#fffff" nowrap>
        <td valign="bottom" width="100%" nowrap>
            <table width="100%" border="0">
                <tr>
                    <td width="10%" height="20">&nbsp;</td>
                    <td width="50%" height="20">Total All</td>
                    <td width="20%" style="text-align:right;" height="20"><?php echo number_format($total_all_debet,2) ?></td>
                    <td width="20%" style="text-align:right;" height="20"><?php echo number_format($total_all_credit,2) ?></td>
                </tr>
            </table>
        </td>
        <!--<td valign="bottom" width="50%" nowrap>
            <table width="100%" border="0">
                <tr>
                    <td width="20%">&nbsp;</td>
                    <td width="50%">Total All</td>
                    <td width="30%" style="text-align:right;"><?php echo number_format($total_all_passiva,2) ?></td>
                </tr>
            </table>
        </td>-->
    </tr>
</table>
<?php
$sqlaktiva->free_result();
$sqlfilter->free_result();
?>