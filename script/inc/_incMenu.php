<?php
  $today = date('Y') . date('m') . date('d');
?>
<div class="form js-menu">
  <div class="form__menu">
    <button class="js-settings">初期設定</button>
  </div>

  <h2 class="js-date" data-date ="<?php print $today; ?>"><?php print date("n");?>月<?php print date("j");?>日のメニュー</h2>

  <dl class="form__dl">
    <dt class="form__dt">メニュー</dt>
    <dd><div><input type="text" name="height" size="24" maxlength="30" class="form__input"><br>例）野菜炒め</div><small class="attention"></small></dd>
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
  <button type="submit" class="js-menuBtn condtions__btn">このメニューで設定する</button>
</div>

<?php
  include 'script/func/_funcIngredients.php';
?>

<div class="form js-menu">
  <div class="form__setting">
    <button class="js-settings">初期設定</button>
  </div>

  <dl class="form__dl">
    <dt class="form__dt"><?php print date("n");?>月<?php print date("j");?>日のメニュー</dt>
    <dd>
      <div class="form__select">
        <select name="menu">
          <option value="1">野菜炒め（朝食）</option>
        </select>
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
        <select name="menu"></select>
      </div>
    </dd>
  </dl>
  <button type="submit" class="js-menuBtn condtions__btn">この材料を登録する</button>


  <dl class="menuDetails">
    <dt class="menuDetails__dt">朝食</dt>
    <dd>
      <div class="menuDetails__container">
        <p>野菜炒め</p>
        <ul>
          <li>キャベツ<br>
            <small>（カリウム：10g）</small>
          </li>
          <li>玉ねぎ</li>
          <li>ニンジン</li>
        </ul>
      </div>
      <div class="menuDetails__container">
        <p>ご飯</p>
        <ul>
          <li style="border-top:1px dashed #ddd;">玄米ご飯</li>
        </ul>
      </div>
    </dd>
  </dl>

  <dl class="menuDetails">
    <dt class="menuDetails__dt">ブランチ</dt>
    <dd>
      <div class="menuDetails__container">
        <p>野菜炒め</p>
        <ul>
          <li>キャベツ</li>
          <li>玉ねぎ</li>
          <li>ニンジン</li>
        </ul>
      </div>
      <div class="menuDetails__container">
        <p>ご飯</p>
        <ul>
          <li>玄米ご飯</li>
        </ul>
      </div>
    </dd>
  </dl>

  <div style="background:#fff; margin:20px;">

    <?php
      // 基本設定
      include './script/inc/_incTable.php';
    ?>

  </div>
<script>
let showOptionSubcategoryData = [];
<?php
  for($cnt=0;$cnt<18;++$cnt) {
    print 'showOptionSubcategoryData[' . $cnt . '] = "' . getSelectSubcategory($cnt+1) . '";' . "\n";
  }
?>
</script>

  <?php //print getSelectSubcategory();?>


</div>
