<?php
if(isset($_POST)) {
  extract($_POST);
  $todaysMenu = $_POST['todaysMenu'];
  $getTodaysMenuArray = explode(',', $todaysMenu);

  include './script/func/_funcCommon.php';


  function showNutrients($aGetData, $aWeight) {

    include './script/inc/_incArray.php';

    $showResult = '';

    for($cnt=0;$cnt<count($nutrientsJaArray);++$cnt) {
      if(isset($aGetData[$cnt]) && is_numeric($aGetData[$cnt])) {
        if($showResult) {
          $showResult .= '、';
        }
        $showResult .= $nutrientsJaArray[$cnt] . '：' . (float)$aGetData[$nutrientsIndexArray[$cnt]]*$aWeight/100 . $nutrientsUnitArray[$cnt];
      }
    }
    return $showResult;
  }


  $arrangeMenuArray = arrangeMenuArray($getTodaysMenuArray);

  if($arrangeMenuArray) {
    $whenArray = array('朝食', 'ブランチ', '昼食', '間食', '夕食', '夜食');
    $showMenuData = '';

    for($cnt=0;$cnt<count($whenArray);++$cnt) {//朝食、昼食などごとに表示
      if(isset($arrangeMenuArray[$cnt][0])) {
        $showMenuData .= '<dl class="menuDetails"><dt class="menuDetails__dt">' . $whenArray[$cnt] . '</dt><dd>';
        for($cnt2=0;$cnt2<count($arrangeMenuArray[$cnt]);++$cnt2) {//各メニューごとに表示
        $showMenuData .= '<div class="menuDetails__container"><p>' . $arrangeMenuArray[$cnt][$cnt2][0] . '</p><ul>';
        $tempMenuDataIngredients = '';
          for($cnt3=0;$cnt3<count($arrangeMenuArray[$cnt][$cnt2][4]);++$cnt3) {//各材料ごとに
            $getData = getData($arrangeMenuArray[$cnt][$cnt2][4][$cnt3][0], $arrangeMenuArray[$cnt][$cnt2][4][$cnt3][1]);
            $getDataArray[] = $getData;
            $weightArray[] = $arrangeMenuArray[$cnt][$cnt2][4][$cnt3][2];
            if(isset($arrangeMenuArray[$cnt][$cnt2][4][$cnt3][2]) && isset($getData[3])) {
              $showNutrients = showNutrients($getData, $arrangeMenuArray[$cnt][$cnt2][4][$cnt3][2]);
              $tempMenuDataIngredients .= '<li data-index="' . $cnt . '-' . $cnt2 . '-' . $cnt3 . '"><span class="btn--delete js-deleteList">✖️削除</span><span class="js-nutrientsList"><span class="icon icon--close"></span>' . $getData[3] . ' ' . $arrangeMenuArray[$cnt][$cnt2][4][$cnt3][2] . 'g</span><br><small class="js-nutrientsListData disp--none">（' . $showNutrients . '）</small></li>';
            }
          }
          $showMenuData .= $tempMenuDataIngredients . '</ul></div>';
        }
        $showMenuData .= '</dd></dl>';
      }
    }
    print $showMenuData;
    $getTotalData = getTotalData($getDataArray, $weightArray);
  }
  else {
    return;
  }
}
?>


<h3>今日摂取した栄養素の合計</h3>

  <div style="background:#fff; margin:20px;">

  <?php
    // 基本設定
    include './script/inc/_incTable.php';
  ?>

  </div>
