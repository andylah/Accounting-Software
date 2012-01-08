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
            Journal Transaction Report ( <?php echo $_POST['month']."-".$_POST['year']?> )
        </td>
    </tr>
    <tr bgcolor="#fffff" nowrap>
        <td valign="top" width="100%" nowrap>
            <table width="100%" border="0" cellspacing="2" cellpadding="2">
                <!--<tr>
                    <td width="100%" colspan="3"><h3>Aktiva</h3></td>
                </tr>-->
                <tr>
                    <td width="10%" bgcolor="#B8C9D8" height="20">Date</td>
                    <td width="10%" bgcolor="#B8C9D8" height="20">Acc #</td>
                    <td width="40%" bgcolor="#B8C9D8" height="20">Account Name</td>
                    <td width="20%" bgcolor="#B8C9D8" height="20">Debet</td>
                    <td width="20%" bgcolor="#B8C9D8" height="20">Credit</td>
                </tr>
            </table>
            <table width="100%" border="0" cellspacing="2">
                <?php
                    
                    $trans_id_1 = "";
                    $i = 0;
                    $lo = "";
                    while ($rowjournal=$sqljournal->fetch_num()){
                        //$rowfilter_journal = $sqlfilter_journal->fetch_num();
                        if ($trans_id_1 == ""){
                            $trans_id_1 = $rowjournal[5];
                            $lo = $rowjournal[6];
                        }
                        //echo $trans_id_1."<br/>";
                        //if ($_POST['category'] !="All"){
                            //fmod($i,4) ? $line="<tr class='column-grid'>" : $line="<tr>";
                        //}else{
                        //    fmod($i,4) ? $line="<tr class='column-grid'>" : $line="<tr>";
                        //}
                        $i++;
                        if ($trans_id_1 != $rowjournal[5] && $_POST['category'] == "All"){
                            
                            $bottom = "</tr>
                                  <tr>
                                    <td width='10%' height='20'>&nbsp;</td>
                                    <td width='10%' height='20'>&nbsp;</td>
                                    <td height='20' colspan='3'>$lo</td>
                                  </tr>";
                            $trans_id_1 = $rowjournal[5];
                            $lo = $rowjournal[6];
                        }else{
                            
                            $bottom = "</tr>";
                            //$trans_id_1 = $rowfilter_journal[5];
                            
                        }
                        echo $bottom;
                        echo "<tr class='column-grid'><td width='10%' height='20'>$rowjournal[0]</td>
                            <td width='10' height='20'>$rowjournal[1]</td>
                            <td width='40%' height='20'>$rowjournal[2]</td>
                            <td width='20%' style='text-align:right;' height='20'>".number_format($rowjournal[3],2)."</td>
                            <td width='20%' style='text-align:right;' height='20'>".number_format($rowjournal[4],2)."</td>"; 
                        
                        
                        $total_all_debet = $total_all_debet+$rowjournal[3];
                        $total_all_credit = $total_all_credit+$rowjournal[4];
                        $i++;
                    }
                    $bottom = "</tr>
                        <tr>
                            <td width='10%' height='20'>&nbsp;</td>
                            <td width='10%' height='20'>&nbsp;</td>
                            <td height='20' colspan='3'>$lo</td>
                        </tr>";
                    echo $bottom;
                ?>
            </table>
        </td>
    </tr>
    <tr bgcolor="#fffff" nowrap>
        <td valign="bottom" width="100%" nowrap>
            <table width="100%" border="0">
                <tr>
                    <td width="10%" height="20">&nbsp;</td>
                    <td width="50%" height="20">Total Journal <?php echo $_POST['category'] ?></td>
                    <td width="20%" style="text-align:right;" height="20"><?php echo number_format($total_all_debet,2) ?></td>
                    <td width="20%" style="text-align:right;" height="20"><?php echo number_format($total_all_credit,2) ?></td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<?php
$sqljournal->free_result();
?>