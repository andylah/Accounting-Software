<?php 
define("PER_PAGE", 15);
define("TITLE", "PT. Sumber Makmur - Accounting Software ".date("Y"));


$rs = mysql_connect("localhost","root","afronova");
if($rs){
	mysql_select_db("project");
}else{
	return false;
}
class mysql{
 var $result;
 var $db;
	
 	function query($query)
 	{
 		$this->query=$query;
 		$this->result=mysql_query($query);
 	}
	function num_row()
	{
		$this->num_rows=mysql_num_rows($this->result);
		return $this->num_rows;
	}
	function fetch_assoc()
	{
		if ($this->row=mysql_fetch_array($this->result,MYSQL_ASSOC))
		return $this->row;
		else
		return false;
	}
	function fetch_num()
	{
		if ($this->row=mysql_fetch_array($this->result,MYSQL_NUM))
		return $this->row;
		else
		return false;
	}
	function fetch_object()
	{
		if ($this->row=mysql_fetch_object($this->result,MYSQL_NUM))
		return $this->row;
		else
		return false;
	}
	function free_result()
	{
		$this->free=mysql_free_result($this->result);
		return $this->free;
	}
}

?>