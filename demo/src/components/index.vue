<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="24" class="center" data-ark-exposure>
          <el-link type="primary" href="/#/next">前往 下一页</el-link>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="24">
          <h4>统计页面</h4>
        </el-col>
        <el-col :span="24">
          <el-button type="primary" size="medium" @click="pageview">pageview - 打开页面</el-button>
          <el-button type="primary" size="medium" @click="pageviewAndPageName">pageview - 打开页面并添加别名</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="pageviewAndProperty"
          >pageview - 打开页面并添加页面属性</el-button>
          <!-- <el-link
            type="primary"
            href="/#/?campaign_id=2945008848&utm_campaign=cpc&utm_medium=%C6%B7%C5%C6%B1%A3%BB%A4&utm_source=sem&utm_content=&utm_term="
          >GBK UTM按钮</el-link>-->
        </el-col>
      </el-row>
    </el-card>

    <el-card>
      <el-row>
        <el-col :span="24">
          <h4>统计事件</h4>
        </el-col>
        <el-col :span="24">
          <el-button type="primary" size="medium" @click="track">track - 统计事件</el-button>
          <el-button type="primary" size="medium" @click="trackAndProperty">track - 统计事件并添加事件属性</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="24">
          <h4>通用属性</h4>
        </el-col>
        <el-col :span="24">
          <el-button
            type="primary"
            size="medium"
            @click="registerSuperProperty"
          >registerSuperProperty - 注册单个通用属性</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="registerSuperProperties"
          >registerSuperProperties - 批量注册通用属性</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="unRegisterSuperProperty"
          >unRegisterSuperProperty - 删除单个通用属性</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="clearSuperProperties"
          >clearSuperProperties - 清空通用属性</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="getSuperProperty"
          >getSuperProperty - 获取单个通用属性</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="getSuperProperties"
          >getSuperProperties - 获取单个通用属性</el-button>
        </el-col>

        <el-col :span="12">
          <span>单个通用属性值为：{{property}}</span>
        </el-col>

        <el-col :span="12">
          <span>所有通用属性值为：{{JSON.stringify(properties)}}</span>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="24">
          <h4>匿名ID与用户关联</h4>
        </el-col>
        <el-col :span="24">
          <el-button type="primary" size="medium" @click="alias">alias - 用户ID与匿名ID关联</el-button>
          <el-button type="primary" size="medium" @click="identify">identify - 匿名ID设置</el-button>
          <el-button type="primary" size="medium" @click="getDistinctId">getDistinctId - 匿名ID获取</el-button>
        </el-col>
        <el-col :span="24">
          <span>获取的设备ID:{{distinctId}}</span>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="24">
          <h4>用户属性</h4>
        </el-col>
        <el-col :span="24">
          <el-button
            type="primary"
            size="medium"
            @click="profileSetOnce"
          >profileSetOnce - 设置用户单个固有属性</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="profileSetOnceMore"
          >profileSetOnce - 设置用户多个固有属性</el-button>
          <el-button type="primary" size="medium" @click="profileSet">profileSet - 设置单个用户属性</el-button>
          <el-button type="primary" size="medium" @click="profileSetMore">profileSet - 设置多个用户属性</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="profileIncrement"
          >profileIncrement - 设置用户属性单个相对变化值</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="profileIncrementMore"
          >profileIncrement - 设置用户属性多个相对变化值</el-button>
          <el-button type="primary" size="medium" @click="profileAppend">profileAppend - 增加列表类型的属性</el-button>
          <el-button type="primary" size="medium" @click="profileUnset">profileUnset - 删除单个设置的属性值</el-button>
          <el-button type="primary" size="medium" @click="profileDelete">profileDelete - 删除所有设置的属性值</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card>
      <el-row>
        <el-col :span="24">
          <h4>获取预制属性</h4>
        </el-col>
        <el-col :span="24">
          <el-button
            type="primary"
            size="getPresetProperties"
            @click="getPresetProperties"
          >getPresetProperties - 获取预制属性</el-button>
        </el-col>
        <el-col :span="24">
          <span>获取的预制属性:{{JSON.stringify(presetProperties)}}</span>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="24">
          <h4>清除本地设置</h4>
        </el-col>
        <el-col :span="24">
          <el-button type="primary" size="reset" @click="reset">reset - 清除本地设置</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      property: '',
      properties: {},
      distinctId: '',
      presetProperties: {}
    };
  },
  created: function () { },
  methods: {
    pageview() {
      window.AnalysysAgent.pageView();
    },
    pageviewAndPageName() {
      window.AnalysysAgent.pageView('首页');
    },
    pageviewAndProperty() {
      window.AnalysysAgent.pageView('首页', {
        commodityName: 'iPhone',
        commodityPrice: 8000
      });
    },
    track() {
      window.AnalysysAgent.track('back');
    },
    trackAndProperty() {
      window.AnalysysAgent.track('buy', {
        type: 'Phone',
        name: 'Apple iPhone8',
        money: 4000,
        count: 1
      });
    },
    registerSuperProperty() {
      window.AnalysysAgent.registerSuperProperty('member', 'VIP');
    },
    registerSuperProperties() {
      window.AnalysysAgent.registerSuperProperties({
        platform: 'TX',
        age: '20',
        member: 'VIP',
        user: 'xiaoming'
      });
    },
    unRegisterSuperProperty() {
      window.AnalysysAgent.unRegisterSuperProperty('age');
    },
    clearSuperProperties() {
      window.AnalysysAgent.clearSuperProperties();
    },
    getSuperProperty() {
      let property = window.AnalysysAgent.getSuperProperty('member');
      this.property = property;
    },
    getSuperProperties() {
      let properties = window.AnalysysAgent.getSuperProperties();
      this.properties = properties;
    },
    alias() {
      window.AnalysysAgent.alias('zhangsan');
    },
    identify() {
      window.AnalysysAgent.identify('fangke009901');
    },
    getDistinctId() {
      let distinctId = window.AnalysysAgent.getDistinctId();
      console.log(distinctId)
      this.distinctId = distinctId;
    },
    profileSetOnce() {
      window.AnalysysAgent.profileSetOnce('activationTime', 1521280551929);
    },
    profileSetOnceMore() {
      let setOnceProfile = {
        birth: 548798705000,
        sex: 'male'
      };
      window.AnalysysAgent.profileSetOnce(setOnceProfile);
    },
    profileSet() {
      window.AnalysysAgent.profileSet('Email', 'yonghu@163.com');
    },
    profileSetMore() {
      let property = {
        Email: 'yonghu@163.com',
        WeChatID: 'weixinhao'
      };
      window.AnalysysAgent.profileSet(property);
    },
    profileIncrement() {
      window.AnalysysAgent.profileIncrement('age', 1);
    },
    profileIncrementMore() {
      let incrementProfile = {
        gameAge: 1,
        gameRating: 2
      };
      window.AnalysysAgent.profileIncrement(incrementProfile);
    },
    profileAppend() {
      let list = ['PlayBasketball', 'music'];
      window.AnalysysAgent.profileAppend('hobby', list);
    },
    profileUnset() {
      window.AnalysysAgent.profileUnset('age');
    },
    profileDelete() {
      window.AnalysysAgent.profileDelete();
    },
    getPresetProperties() {
      let presetProperties = window.AnalysysAgent.getPresetProperties();
      this.presetProperties = presetProperties;
      console.log(presetProperties)
    },
    reset() {
      window.AnalysysAgent.reset();
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.center {
  text-align: center;
}
.el-col {
  margin-bottom: 10px;
}
.el-button + .el-button {
  margin-left: 0;
}
.el-button--medium {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
