<section class="conditions js-conditions">
  <h2>基本情報</h2>
  <dl>
  <dt>年齢</dt>
  <dd><div><input type="text" name="age" size="10" maxlength="5" class="conditions__input"> 歳</div><small class="attention"></small></dd>
  </dl>
  <dl>
  <dt>性別</dt>
  <dd>
    <label class="conditions__radio">
      <input type="radio" name="gender" value="1" class="conditions__radio--input">
      <span class="conditions__radio--span">
          <span class="conditions__radio--text">男性</span>
      </span>
    </label>
    <label class="conditions__radio">
      <input type="radio" name="gender" value="2" class="conditions__radio--input" checked>
      <span class="conditions__radio--span">
          <span class="conditions__radio--text">女性</span>
      </span>
    </label>
  </dd>
  </dl>
  <dl>
  <dt>身長</dt>
  <dd><div><input type="text" name="height" size="10" maxlength="5" class="conditions__input"> cm</div><small class="attention"></small></dd>
  </dl>
  <dl>
  <dt>体重</dt>
  <dd><div><input type="text" name="weight" size="10" maxlength="5" class="conditions__input"> kg</div><small class="attention"></small></dd>
  </dl>
  <dl>
  <dt>運動量</dt>
  <dd>
    <label class="conditions__radio">
      <input type="radio" name="momentum" value="1.5" class="conditions__radio--input"checked>
      <span class="conditions__radio--span">
          <span class="conditions__radio--text">少ない</span>
      </span>
    </label>
    <label class="conditions__radio">
      <input type="radio" name="momentum" value="1.75" class="conditions__radio--input">
      <span class="conditions__radio--span">
          <span class="conditions__radio--text">そこそこ</span>
      </span>
    </label>
    <label class="conditions__radio">
      <input type="radio" name="momentum" value="2" class="conditions__radio--input">
      <span class="conditions__radio--span">
          <span class="conditions__radio--text">多い</span>
      </span>
    </label>
  </dd>
  </dl>
  <dl>
  <dt>基礎代謝量の推定式</dt>
  <dd>
    <div class="conditions__select">
      <select name="formula">
        <option value="1">国立健康・栄養研究所の式</option>
        <option value="2">Harris-Benedictの式</option>
        <option value="3">Schofieldの式</option>
        <option value="4">FAO/WHO/UNUの式</option>
      </select>
    </div>
  </dd>
  </dl>
  <button type="submit" class="js-condtionsBtn condtions__btn">この条件で計算する</button>
</section>
