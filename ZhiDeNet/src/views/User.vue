<template>
  <div class="user">
    <!-- 用户使用邮箱登录注册提示 -->
    <div style="position:absolute;width:400px;left:50%;top:70px">
      <el-alert type="warning" show-icon>
        <span slot="title">邮箱注册账号后再登录</span>
        <span>
          注册后登陆
        </span>
      </el-alert>
    </div>
    
    <div class="login">
      <ul class="login-tabbar">
        <li
          class="login-tabbar__item"
          :class="{ 'login-tabbar__item--active': loginMode === 'phone' }"
          @click="toggleLoginMode('phone')"
        >
          手机号登录
        </li>
        <li
          class="login-tabbar__item"
          @click="toggleLoginMode('email')"
          :class="{ 'login-tabbar__item--active': loginMode === 'email' }"
        >
          邮箱登录
        </li>
      </ul>

      <ul class="login-form-content">
        <li class="login-form-content__phone" v-if="loginMode === 'phone'">
          <el-form :model="phoneForm" key="phone">
            <el-form-item>
              <el-input
                v-model="phoneForm.phone"
                placeholder="输入手机号"
                class="input-with-select"
              >
                <el-select
                  slot="prepend"
                  v-model="selectedCountry"
                  placeholder="请选择"
                >
                  <el-option value="disabled" disabled
                    >选择国家和地区</el-option
                  >
                  <hr class="input-with-select__divider" />
                  <el-option
                    :value="`+${item.val}`"
                    v-for="item in mobileCode"
                    :key="item.id"
                    >{{ item.country }} +{{ item.val }}</el-option
                  >
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="phoneForm.verifyCode" placeholder="输入验证码">
                <el-button type="primary" slot="append">验证码登录</el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </li>
        <li class="login-form-content__email" v-else-if="loginMode === 'email'">
          <el-form
            key="email"
            :rules="emailFormRules"
            :model="emailForm"
            ref="emailForm"
          >
            <el-form-item ref="emailFormItem" prop="email">
              <el-input
                @blur="onEmailInputBlur"
                @focus="clearEmailValidation"
                v-model="emailForm.email"
                placeholder="请输入邮箱"
                autocomplete="on"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" ref="passFormItem">
              <el-input
                class="input-with-icon"
                placeholder="请输入密码"
                v-model="emailForm.password"
                :type="passwordInputType"
                @focus="$refs.passFormItem.clearValidate('password')"
              >
                <i
                  slot="suffix"
                  :class="
                    passwordInputType === 'password'
                      ? 'el-icon-turn-off'
                      : 'el-icon-open'
                  "
                  style="color:blue;"
                  @click="togglePasswordInputType"
                />
              </el-input>
            </el-form-item>
          </el-form>
        </li>
      </ul>
      <div class="login__button">
        <el-button
          type="primary"
          round
          :loading="loading"
          @click="handlerLogin"
          @keydown.enter.native="handlerLogin"
          size="large"
          tabindex="0"
          style="width: 240px"
          >登录</el-button
        >
        <el-button
          type="primary"
          round
          :loading="loading"
          @click="handlerRegist"
          @keydown.enter.native="handlerLogin"
          size="large"
          tabindex="0"
          style="width: 240px"
          >注册</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import {
  fetchCommonSettings,
} from "@/helper/requestWithToken.js";
import {
  fetchUserRegister,
  fetchUserLogin,
} from "@/helper/requestUserRegister.js";

import store from "@/store/index.js";

export default {
  name: "user",
  data() {
    // const self = this;
    const validator = async (rule, val, cb, source, opt) => {
      await new Promise((resolve, reject) => setTimeout(resolve, 100));
      // const triggerType = rule.validator && rule.validator.triggerType;
      // if (triggerType === "submit") return;
      // try {
      //   var result = await fetchEmailRegisterStatus({
      //     email: self.emailForm.email
      //   });
      // } catch (error) {
      //   throw error;
      // }
      // if (result.data.email_status === 0) {
      //   throw new Error("邮箱未注册");
      // }
    };
    const mutipleEmailRules = [
      {
        required: true,
        trigger: "blur",
        message: "邮箱不能为空",
      },
      {
        type: "email",
        trigger: "blur",
        message: "邮箱格式不正确",
      },
      {
        validator,
        trigger: "blur",
      },
    ];
    return {
      state: store.state,
      userRegister: [],
      emailFormRules: {
        email: mutipleEmailRules,
        password: {
          required: true,
          message: "密码不能为空",
        },
      },
      loginMode: "email",
      mobileCode: [],
      phoneForm: {
        verifyCode: "",
        phone: "",
      },
      emailForm: {
        email: "",
        password: "",
      },
      passwordInputType: "password",
      selectedCountry: "",
      loading: false,
    };
  },

  created() {
    fetchCommonSettings().then((response) => {
      this.mobileCode = response.data.mobile_code;
    });
  },

  methods: {
    //登陆事件
    async handlerLogin() {
      if (this.loginMode !== "email") {
        this.$message.warning("功能开发中，请使用邮箱登录");
      }
      // 登陆验证
      this.emailFormRules.email[2].validator.triggerType = "submit";
      try {
        await this.$refs.emailForm.validate();
      } catch (err) {
        return;
      }
      // this.loading = true;
      try {
        let loginResult = await fetchUserLogin(this.emailForm)
      } catch (error) {
        this.loading = false;
        return;
      }
      // this.loading = false;
      this.$nextTick(() => {
          let isLogin = this.state.isLogin;
          if (isLogin) {
            this.$router.push("/");
            this.$message.warning("登陆成功");
          } else {
            this.$message.warning("没有该账号或账号密码错误");
          }
          console.log("store.state", store.state);
      });
      // //传输入的数据给后台
      // try {
      //   await fetchLoginByEmail(this.emailForm);
      // } catch (error) {
      //   return error;
      // }
      // //判断是否登陆
      // try {
      //   await store.requestLoginStatus();
      // } catch (error) {
      //   return;
      // }
      // this.loading = true;
      // try {
      //   await store.requestUserInfo();
      // } catch (error) {
      //   this.loading = false;
      //   return error;
      // }
      // this.loading = false;
      // this.$router.push("/");
    },
    //注册
    async handlerRegist() {
      if (this.loginMode !== "email") {
        this.$message.warning("功能开发中，请使用邮箱登录");
      }
      // 提交按钮验证
      this.emailFormRules.email[2].validator.triggerType = "submit";
      try {
        await this.$refs.emailForm.validate();
      } catch (err) {
        return;
      }
      //注册点击事件
      // fetchUserLogin fetchUserRegister
      try {
        let RegisterResult = await fetchUserRegister(this.emailForm)
          .then((res, req) => {
            //注册信息提示
            console.log("register",res)
            if (!res.success) {
              this.$message.warning("该邮箱已注册,请登陆");
            } else {
              this.$message.warning("注册成功");
            }
          })
          .catch(() => {
            console.log(error);
          });
      } catch (error) {
        return;
      }
    },
    onEmailInputBlur() {
      this.emailFormRules.email[2].validator.triggerType = "blur";
    },
    clearEmailValidation() {
      this.$refs.emailForm.clearValidate("email");
    },

    toggleLoginMode(mode) {
      this.loginMode = mode;
    },
    togglePasswordInputType() {
      this.passwordInputType =
        this.passwordInputType === "password" ? "text" : "password";
    },
  },
};
</script>
<style lang="less">
.input-with-select {
  &__divider {
    border-color: @border-extralight-color;
    border-top-width: 0;
    margin-top: 0;
  }
  .el-select .el-input {
    width: 130px;
  }
  .el-input-group__prepend {
    background-color: #fff;
  }
}
.input-with-icon {
  .el-input__suffix {
    cursor: pointer;
    margin-right: 3px;
  }
}

.el-form-item {
  margin-bottom: 30px;
}
</style>
<style scoped lang="less">
.user {
  height: calc(100vh - 300px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 500px;
  &-tabbar {
    display: flex;

    &__item {
      padding-bottom: 8px;
      margin-right: 30px;
      cursor: pointer;
      font-weight: @font-weight-primary;
      font-size: @font-size-large;
      color: @secondary-text-color;
      &:hover {
        color: @main-color;
      }
      &--active {
        border-bottom: 2px solid @main-color;
        color: @main-color;
      }
    }
  }

  &-form-content {
    margin: 40px 0;
  }
}
</style>
