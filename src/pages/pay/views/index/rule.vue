<template>
  <div class="rule">
    <div class="pic-wrapper"></div>
    <div class="content-wrapper">
      <div class="title">活动规则</div>
      <div class="content"><p>1.每个用户只有一次机会，首次充值任意金额即可随机获得最高999&nbspUG币；</p>
      <p>2.充值本身所得UG币和首充礼包均全额发放，相关记录可从“我的钱包”中的“账单”中查询。</p>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: 'rule'
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../../common/stylus/mixin.styl';
  .rule
    .pic-wrapper
      display :block
      height:500px
      width: 100%
      bg-image('../../../../assets/banner')
      background-size :100% 500px
    .content-wrapper
      width: 78%
      margin-left:11%
      font-weight :bold
      .title
        height: 100%
        margin-top:100px
        font-size :28px
        border-left :10px solid #111111
        padding-left :15px
      .content
        margin-top:50px
        font-size: 24px
        line-height:40px
</style>
