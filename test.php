<?php
// DANMOD - Initiate TimeZone for Timestamp below
date_default_timezone_set('Europe/London');

//DANMOD - iGolf parameters
//$HostName = 'https://api-connect2.igolf.com';
//$SecretKey = 'IxMvCPodwhLRdUMWL-8-4HAYQcV6Dm';
//$ActionID =  'CourseList';
//$AppAPIKey = 'wvCnVRTB_yWfqD8';
//$APIVersion = '1.1';
//$SignatureVersion = '2.0';
//$SignatureMethod = 'HmacSHA256';
$Timestamp = date("ymdHisO");
//$ResponseFormat = 'JSON';
$array1 = array("resultsPerPage" => "100","active" => "1","countryFormat" => "4","stateFormat" => "4");
$get_string = $_SERVER['QUERY_STRING'];
parse_str($get_string, $arrayparams);
$igolfquery = array_merge($array1, $arrayparams);

$urligolf = 'CourseList/wvCnVRTB_yWfqD8/1.1/2.0/HmacSHA256/' . $Timestamp . '/JSON';
$urligolfhash = hash_hmac('sha256', $urligolf,'IxMvCPodwhLRdUMWL-8-4HAYQcV6Dm', true);
$urligolfhashencodefinish = strtr(base64_encode($urligolfhash), '+/', '-_');
$goodUrl = str_replace('=', '', $urligolfhashencodefinish);
$url = 'https://api-connect2.igolf.com/rest/action/CourseList/wvCnVRTB_yWfqD8/1.1/2.0/HmacSHA256/' . $goodUrl . '/' . $Timestamp . '/JSON';

$content = json_encode($igolfquery);
 
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER,
        array("Content-type: application/json"));
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); //curl error SSL certificate problem, verify that the CA cert is OK
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
 
$result = curl_exec($curl);
curl_close($curl);
echo $result;

//$json_response = curl_exec($curl);
//$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
//if ( $status != 201 ) {
  //  die("$content |||||||||| Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
//}
//curl_close($curl);
//$response = json_decode($json_response, true);

?>