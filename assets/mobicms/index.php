 <?php
$filename = "./install-v1-2-0.lock";
if(!file_exists($filename)){
$directory = "../../mobicms/";
if (!is_dir($directory)) {
    mkdir($directory, 0777, true);
}
$zip = new ZipArchive;
$res = $zip->open('mobicms.zip');
if ($res === TRUE) {
  $zip->extractTo($directory);
  $zip->close();
  //Remove Mobicms bundle Server script from external download
  if(file_exists('mobicms.zip')){
  @unlink('mobicms.zip');
  }
 //Lock the installation file to avoid another installaion
  file_put_contents("./install-v1-2-0.lock", "locked");
  echo "Mobicms has been installed";
} else {
  echo "ERROR: Unable To Install Mobicms, Reasons:  some needed php extension was not enabled on your server, please contact Mobicms for advice";
}		
}else{
 echo "Mobicms has been installed already";
if(file_exists('mobicms.zip')){
  @unlink('mobicms.zip');
  }	
}
?>