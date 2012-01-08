<?php
    include_once("../php/class-db.php");
    include_once("../report-php/process.php");
?>
<table celpadding="1" border="0" cellspacing="2" align="center" width="99%" style="border: 1px solid #000000">
    <tr bgcolor="#fffff" nowrap>
        <td align="center" height="20" width="100%" nowrap colspan="2">
            <h2><?php echo TITLE ;?></h2>
        </td>
    </tr>
    <tr bgcolor="#fffff" nowrap>
        <td align="center" height="20" width="100%" nowrap colspan="2">
            Profit Loss Report ( <?php echo $_POST['month']."-".$_POST['year']?> )
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
                    <td width="20%" bgcolor="#B8C9D8" height="20">Cost</td>
                    <td width="20%" bgcolor="#B8C9D8" height="20">Income</td>
                </tr>
            </table>
            <table width="100%" border="0" cellspacing="2" cellpadding="2">
                <?php
                    for ($i=0; $i<$jml_record_income; $i++){
                        //fmod($i,2) ? $line="<tr class='column-grid'>" : $line="<tr>";
                         echo  "<tr class='column-grid'><td width='10%' height='20'>$acc_num_income[$i]</td>
                                <td width='50%' height='20'>$acc_name_income[$i]</td>
                                <td width='20%' style='text-align:right;' height='20'>0</td>
                                <td width='20%' style='text-align:right;' height='20'>".number_format($total_income[$i],2)."</td>";                                          
                        $total_income_all = $total_income_all + $total_income[$i];
                    }
                ?>
                </tr>
            </table>
        </td>
    </tr>
    <tr bgcolor="#fffff" nowrap>
        <td valign="top" width="100%" nowrap height="20">&nbsp;</td>
    </tr>
    <tr bgcolor="#fffff" nowrap>
        <td valign="top" width="100%" nowrap>
            <table width="100%" border="0" cellspacing="2" cellpadding="2">
                <?php
                    for ($j=0; $j<$jml_record_biaya; $j++){
                        //fmod($j,2) ? $line="<tr class='column-grid'>" : $line="<tr>";
                        echo "<tr class='column-grid'><td width='10%' height='20'>$acc_num_biaya[$j]</td>
                                <td width='50%' height='20'>$acc_name_biaya[$j]</td>
                                <td width='20%' style='text-align:right;' height='20'>".number_format($total_biaya[$j],2)."</td>
                                <td width='20%' style='text-align:right;' height='20'>0</td>";                                          
                        $total_biaya_all = $total_biaya_all + $total_biaya[$j];
                    }
                ?>
                </tr>
            </table>
        </td>
    </tr>
    <tr bgcolor="#fffff" nowrap>
        <td valign="bottom" width="100%" nowrap>
            <table width="100%" border="0">
                <tr>
                    <td width="10%" height="20">&nbsp;</td>
                    <td width="50%" height="20">Total</td>
                    <td width="20%" style="text-align:right;" height="20"><?php echo number_format($total_biaya_all,2) ?></td>
                    <td width="20%" style="text-align:right;" height="20"><?php echo number_format($total_income_all,2) ?></td>
                </tr>
            </table>
        </td>
    </tr>
    <tr bgcolor="#fffff" nowrap>
        <td valign="top" width="100%" nowrap  height="20">&nbsp;</td>
    </tr>
    <tr bgcolor="#fffff" nowrap>
        <td valign="bottom" width="100%" nowrap>
            <table width="100%" border="0">
                <tr>
                    <?php
                    $total = $total_income_all - $total_biaya_all;
                    ?>
                    <td width="10%" height="20">&nbsp;</td>
                    <td width="70%" height="20">Profit / Loss (Income - Cost)</td>                
                    <td width="20%" style="text-align:right;" colspan="2" height="20"><?php echo number_format($total,2) ?></td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<?php
$sql_filter_income->free_result();
$sqlincome->free_result();
$sql_filter_biaya->free_result();
$sqlbiaya->free_result();
?>