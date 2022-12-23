<?php

function getData($aCategory, $aSubCategory) {
  $fp = fopen("script/csv/i$aCategory.csv", "r");
  while ($data = fgetcsv($fp, 1024)) {
    if (($data[1])==$aSubCategory) {
      return $data;
    }
  }
  fclose ($fp);
}

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
      if(isset($todaysMenuArray[$cnt][4][0][1])) {
        $todaysMenuArrayByCategory[($todaysMenuArray[$cnt][1]-1)][] = $todaysMenuArray[$cnt];
      }
    }
  }
  return $todaysMenuArrayByCategory;
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

?>
