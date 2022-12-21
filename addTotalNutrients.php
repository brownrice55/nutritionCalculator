<?php
if(isset($_POST)) {
  extract($_POST);
  $thisDaysData = $_POST['thisDaysData'];
  $thisDaysDataArray = explode(',', $thisDaysData);
  $thToday = 'この日';

  include './script/func/_funcCommon.php';

  $arrangeMenuArray = arrangeMenuArray($thisDaysDataArray);

  for($cnt=0;$cnt<count($arrangeMenuArray);++$cnt) {//朝食、昼食などごとに表示
    if(isset($arrangeMenuArray[$cnt][0])) {
      for($cnt2=0;$cnt2<count($arrangeMenuArray[$cnt]);++$cnt2) {//各メニューごとに表示
        if(isset($arrangeMenuArray[$cnt][$cnt2][4])) {
          for($cnt3=0;$cnt3<count($arrangeMenuArray[$cnt][$cnt2][4]);++$cnt3) {//各材料ごとに
            $getData = getData($arrangeMenuArray[$cnt][$cnt2][4][$cnt3][0], $arrangeMenuArray[$cnt][$cnt2][4][$cnt3][1]);
            $getDataArray[] = $getData;
            $weightArray[] = $arrangeMenuArray[$cnt][$cnt2][4][$cnt3][2];
          }
        }
      }
    }
  }

  $getTotalData = getTotalData($getDataArray, $weightArray);

}
?>
<div style="background:#fff; margin:20px;">

<?php
  // 基本設定
  include './script/inc/_incTable.php';
?>

</div>
