<?php
if(isset($_POST)) {
  extract($_POST);
  $ingredientsData = $_POST['ingredientsData'];

  $ingredientsDataArray = explode('_', $ingredientsData);
  $showIngredients = '';

  include './script/func/_funcCommon.php';

  for($cnt=0;$cnt<count($ingredientsDataArray);++$cnt) {
    $tempIngredientsDataArray = explode('-', $ingredientsDataArray[$cnt]);
    $getData = getData($tempIngredientsDataArray[0], $tempIngredientsDataArray[1]);
    $showIngredients .= '<li>';
    $showIngredients .= $getData[3] . '　' . $tempIngredientsDataArray[2] . 'g';
    $showIngredients .= '<li>';
  }

  print $showIngredients;

}
?>
