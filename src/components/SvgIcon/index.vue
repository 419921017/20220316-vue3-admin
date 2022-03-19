<template>
  <!-- 如果iconClass是带协议的图标链接 则通过style属性方式渲染-->
  <div
    class="svg-icon svg-external-icon"
    v-if="isExt"
    :style="styleExternalIcon"
    v-bind="$attrs"
  ></div>
  <!-- SVG icon 通过名称使用 -->
  <svg v-else :class="svgClass" v-bind="$attrs" aria-hidden="true">
    <!-- 
       SVG中的use元素可以调用其他SVG文件的元素，<use xlink:href="#symbolId"></use>
    -->
    <use :href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { isExternal } from "@/utils/validate";

const props = defineProps<{ iconClass: string; className?: string }>();
const isExt = computed(() => isExternal(props.iconClass || ""));
const iconName = computed(() => `#icon-${props.iconClass}`);
const svgClass = computed(() =>
  props.className ? `svg-icon ${props.className}` : "svg-icon"
);
const styleExternalIcon = computed(() => {
  const mask = `url(${props.iconClass}) no-repeat 50% 50%`;
  return {
    mask,
    "-webkit-mask": mask,
  };
});

console.log('svg-icon');

</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>