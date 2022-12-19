<?php
if(isset($_POST)) {
  extract($_POST);

  $getTodaysMenuArray = explode(',', $_POST['todaysMenu']);

  function arrangeMenuArray($aGetTodaysMenuArray) {
    $cnt2 = 0;
    $todaysMenuArray = array();
    $todaysMenuArray4 = array();

    if(is_array($aGetTodaysMenuArray)) {
      for($cnt=0;$cnt<count($aGetTodaysMenuArray);++$cnt) {
        if($cnt && $cnt%5==0) {
          ++$cnt2;
        }
        if($cnt%5==4) {
          $getTodaysMenuArray4 = explode('_', $aGetTodaysMenuArray[$cnt]);
          for($cnt3=0;$cnt3<count($getTodaysMenuArray4);++$cnt3) {
            $tempTodaysMenuArray4 = explode('-', $getTodaysMenuArray4[$cnt3]);
            array_push($todaysMenuArray4, $tempTodaysMenuArray4);
          }
          $todaysMenuArray[$cnt2][] = $todaysMenuArray4;
          $todaysMenuArray4 = array();
        }
        else {
          $todaysMenuArray[$cnt2][] = $aGetTodaysMenuArray[$cnt];
        }
      }
    }
    else {
      return;
    }

    $todaysMenuArrayByCategory = array();
    if(is_array($todaysMenuArray)) {
      for($cnt=0;$cnt<count($todaysMenuArray);++$cnt) {
        $todaysMenuArrayByCategory[($todaysMenuArray[$cnt][1]-1)][] = $todaysMenuArray[$cnt];
      }
    }
    return $todaysMenuArrayByCategory;
  }


  function getData($aCategory, $aSubCategory) {
    $fp = fopen("script/csv/i$aCategory.csv", "r");
    while ($data = fgetcsv($fp, 1024)) {
      if (($data[1])==$aSubCategory) {
        return $data;
      }
    }
    fclose ($fp);
  }

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


  function getTotalData($aGetDataArray, $aWeightArray) {

    $consumedDataArray = array('energy'=>0, 'water'=>0, 'protein'=>0, 'lipid'=>0, 'carbohydrate'=>0, 'ash'=>0, 'salt'=>0,'na'=>0, 'k'=>0, 'ca'=>0, 'mg'=>0, 'p'=>0, 'fe'=>0, 'zn'=>0, 'cu'=>0, 'mn'=>0, 'i'=>0, 'folicacid'=>0, 'dietaryfiber'=>0, 'iodine'=>0,'se'=>0, 'cr'=>0, 'mo'=>0, 'vitaminA'=>0, 'vitaminD'=>0, 'vitaminE'=>0, 'vitaminK'=>0, 'vitaminC'=>0, 'vitaminB1'=>0, 'vitaminB2'=>0, 'vitaminB6'=>0, 'vitaminB12'=>0, 'niacin'=>0, 'pantothenicacid'=>0, 'biotin'=>0);

    include './script/inc/_incArray.php';

    for($cnt=0;$cnt<count($aGetDataArray);++$cnt) {
      //摂取データ取得
      for($cnt2=0;$cnt2<count($nutrientsArray);++$cnt2) {
        if(isset($aGetDataArray[$cnt][$nutrientsIndexArray[$cnt2]]) && is_numeric($aGetDataArray[$cnt][$nutrientsIndexArray[$cnt2]])) {
          $consumedDataArray[$nutrientsArray[$cnt2]] += $aGetDataArray[$cnt][$nutrientsIndexArray[$cnt2]]*(float)$aWeightArray[$cnt]/100;
        }
      }
    }
    return $consumedDataArray;
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
