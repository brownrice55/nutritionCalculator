<?php
  $today = date('Y') . '/' . date('n') . '/' . date('j');
?>
<div class="form js-menu">
  <?php
    include './script/inc/_incMenuHeader.php';
  ?>
  <dl class="form__dl">
    <dt class="form__dt">メニューを入力してください。</dt>
    <dd><div><input type="text" name="height" size="24" maxlength="30" class="form__input"><br>例）野菜炒め</div><small class="js-attention"></small></dd>
  </dl>
  <dl class="form__dl">
    <dt class="form__dt">いつ食べましたか？</dt>
    <dd>
      <div class="form__select">
        <select name="formula">
          <option value="1">朝食</option>
          <option value="2">ブランチ</option>
          <option value="3">昼食</option>
          <option value="4">間食</option>
          <option value="5">夕食</option>
          <option value="6">夜食</option>
        </select>
      </div>
    </dd>
  </dl class="form__dl">
  <button type="submit" class="js-menuBtn form__btn">このメニューを追加する</button><br>
  <button type="submit" class="js-backTo2ndMenuBtn form__btn--small">メニューを追加しない</button>
</div>

<?php
  include 'script/func/_funcIngredients.php';
?>

<div class="form js-menu">
  <?php
    include './script/inc/_incMenuHeader.php';
  ?>

  <form>
    <dl class="form__dl">
      <dt class="form__dt">メニューを選択してください。</dt>
      <dd>
        <div class="form__select js-menuSetting">
          <select name="todaysMenu"></select>
        </div>
      </dd>
    </dl>
    <dl class="form__dl">
      <dt class="form__dt">材料を選択してください。</dt>
      <dd>
        <div class="form__select js-category">
          <?php print getSelectCategory();?>
        </div>
        <div class="form__select js-category">
          <select name="subCategory"></select>
        </div>
      </dd>
    </dl>

    <dl class="form__dl">
      <dt class="form__dt">分量を入力してください。</dt>
      <dd>
        <div class="js-ingredientsWeight">
          <input type="text" name="ingredientsWeight" size="10" maxlength="30" class="form__input">　g<br><small class="js-attention"></small>
        </div>
      </dd>
    </dl>

    <button type="submit" class="js-menuRegisterBtn form__btn">この材料を登録する</button>
  </form>


  <div class="js-nutritionDataResult"></div>

<script>
let showOptionSubcategoryData = [];
<?php
  for($cnt=0;$cnt<18;++$cnt) {
    print 'showOptionSubcategoryData[' . $cnt . '] = "' . getSelectSubcategory($cnt+1) . '";' . "\n";
  }
?>
</script>


</div>
