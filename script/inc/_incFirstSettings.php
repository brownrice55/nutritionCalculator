<div class="form js-firstSettings">
  <h2>基本情報</h2>
  <dl class="form__dl">
    <dt>年齢</dt>
    <dd><div><input type="text" name="age" size="10" maxlength="5" class="form__input"> 歳</div><small class="js-attention"></small></dd>
  </dl>
  <dl class="form__dl">
    <dt>性別</dt>
    <dd>
      <label class="form__radio">
        <input type="radio" name="gender" value="1" class="form__radio--input">
        <span class="form__radio--span">
            <span class="form__radio--text">男性</span>
        </span>
      </label>
      <label class="form__radio">
        <input type="radio" name="gender" value="2" class="form__radio--input" checked>
        <span class="form__radio--span">
            <span class="form__radio--text">女性</span>
        </span>
      </label>
    </dd>
  </dl>
  <dl class="form__dl">
    <dt>身長</dt>
    <dd><div><input type="text" name="height" size="10" maxlength="5" class="form__input"> cm</div><small class="js-attention"></small></dd>
  </dl>
  <dl class="form__dl">
    <dt>体重</dt>
    <dd><div><input type="text" name="weight" size="10" maxlength="5" class="form__input"> kg</div><small class="js-attention"></small></dd>
  </dl>
  <dl class="form__dl">
    <dt>運動量</dt>
    <dd>
      <label class="form__radio">
        <input type="radio" name="momentum" value="1.5" class="form__radio--input"checked>
        <span class="form__radio--span">
            <span class="form__radio--text">少ない</span>
        </span>
      </label>
      <label class="form__radio">
        <input type="radio" name="momentum" value="1.75" class="form__radio--input">
        <span class="form__radio--span">
            <span class="form__radio--text">そこそこ</span>
        </span>
      </label>
      <label class="form__radio">
        <input type="radio" name="momentum" value="2" class="form__radio--input">
        <span class="form__radio--span">
            <span class="form__radio--text">多い</span>
        </span>
      </label>
    </dd>
  </dl>
  <dl class="form__dl">
    <dt>基礎代謝量の推定式</dt>
    <dd>
      <div class="form__select">
        <select name="formula">
          <option value="1">国立健康・栄養研究所の式</option>
          <option value="2">Harris-Benedictの式</option>
          <option value="3">Schofieldの式</option>
          <option value="4">FAO/WHO/UNUの式</option>
        </select>
      </div>
    </dd>
  </dl>
  <button type="submit" class="js-firstSettingsBtn form__btn">この条件で計算する</button>
</div>
