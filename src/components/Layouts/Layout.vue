<template>
  <n-global-style />
  <n-el class="vaw-layout-container">
    <n-space vertical>
      <n-layout has-sider>
        <!--左侧导航-->
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
        >
          <!--logo放这个-->
          <Logo />
          <Menu />

        </n-layout-sider>

        <!--右侧内容-->
        <n-layout>

          <n-layout-header bordered>
            <Header />
          </n-layout-header>

          <n-layout-content>
            <!--标签组件-->
            <Main />
          </n-layout-content>

        </n-layout>
        
      </n-layout>
    </n-space>
  </n-el>
</template>

<script setup lang="ts">

</script>
<style scoped>
.vaw-layout-container {
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
</style>
